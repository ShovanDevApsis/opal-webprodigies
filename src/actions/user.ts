"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import nodemailer from "nodemailer";

const sendEmail = async ({
	email,
	sendTo,
	subject,
	text,
	html,
}: {
	email: string;
	sendTo: string;
	subject: string;
	text: string;
	html?: string;
}) => {
	const SMTP_SERVER_HOST = "smtp.gmail.com";
	const SMTP_SERVER_USERNAME = process.env.MIALER_EMAIL;
	const SMTP_SERVER_PASSWORD = process.env.MAILER_PASSWORD;

	const transporter = nodemailer.createTransport({
		service: "gmail",
		host: SMTP_SERVER_HOST,
		port: 465,
		secure: true,
		auth: {
			user: SMTP_SERVER_USERNAME,
			pass: SMTP_SERVER_PASSWORD,
		},
	});
	try {
		await transporter.verify();
	} catch (error) {
		console.error(
			"Something Went Wrong",
			SMTP_SERVER_USERNAME,
			SMTP_SERVER_PASSWORD,
			error
		);
		return;
	}
	const info = await transporter.sendMail({
		from: email,
		to: sendTo,
		subject: subject,
		text: text,
		html: html ? html : "",
	});

	return info;
};

export const onAuthenticateUser = async () => {
	try {
		const user = await currentUser();

		if (!user) {
			return { status: 403 };
		}

		const userExist = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			include: {
				workspace: {
					where: {
						User: {
							clerkId: user.id,
						},
					},
				},
			},
		});

		if (userExist) {
			return { status: 200, user: userExist };
		}

		const newUser = await client.user.create({
			data: {
				clerkId: user.id,
				email: user.emailAddresses[0].emailAddress,
				firstName: user.firstName,
				lastName: user.lastName,
				image: user.imageUrl,
				studio: {
					create: {},
				},
				subscriptions: {
					create: {},
				},
				workspace: {
					create: {
						name: `${user.firstName}'s Workspace`,
						type: "PERSONAL",
					},
				},
			},
			include: {
				workspace: {
					where: {
						User: {
							clerkId: user.id,
						},
					},
				},
				subscriptions: {
					select: {
						plan: true,
					},
				},
			},
		});

		if (newUser) {
			return { status: 201, user: newUser };
		}

		return { status: 200 };
	} catch (error) {
		console.log(error);
		return { status: 403 };
	}
};

export const getUserNotificatons = async () => {
	try {
		const user = await currentUser();

		if (!user) {
			return { status: 403 };
		}

		const notifications = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				notifications: true,
				_count: {
					select: {
						notifications: true,
					},
				},
			},
		});

		return notifications
			? { status: 200, data: notifications }
			: { status: 403, data: [] };
	} catch (error) {
		console.log(error);
		return { status: 403 };
	}
};

export const searchUsers = async (query: string) => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}

		const users = await client.user.findMany({
			where: {
				OR: [
					{
						firstName: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						lastName: {
							contains: query,
							mode: "insensitive",
						},
					},
					{
						email: {
							contains: query,
							mode: "insensitive",
						},
					},
				],
				NOT: {
					clerkId: user.id,
				},
			},

			select: {
				id: true,
				subscriptions: {
					select: {
						plan: true,
					},
				},
				firstName: true,
				lastName: true,
				email: true,
				image: true,
			},
		});

		return users ? { status: 200, data: users } : { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const getBilingInformation = async () => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}
		const planInfo = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				subscriptions: {
					select: {
						plan: true,
					},
				},
			},
		});

		return planInfo
			? { status: 200, data: planInfo }
			: { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const changeViewFirst = async (isEnable: boolean) => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}

		const enableOrDisable = await client.user.update({
			where: {
				clerkId: user.id,
			},
			data: {
				firstView: isEnable,
			},
		});

		return enableOrDisable
			? { status: 200, data: enableOrDisable }
			: { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const getFirstView = async () => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}

		const data = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				firstView: true,
			},
		});

		return data ? { status: 200, data: data } : { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const createCommentAndReply = async (
	userId: string,
	comment: string,
	videoID: string,
	commentId?: string | undefined
) => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}

		if (commentId) {
			const reply = await client.comment.update({
				where: {
					id: commentId,
				},
				data: {
					reply: {
						create: {
							comment: comment,
							userId: userId,
							videoId: videoID,
						},
					},
				},
			});

			if (reply) {
				return { status: 200, data: reply };
			}
		}

		const newComment = await client.video.update({
			where: {
				id: videoID,
			},
			data: {
				comment: {
					create: {
						comment: comment,
						userId: userId,
					},
				},
			},
		});

		return newComment
			? { status: 200, data: newComment }
			: { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const getUserProfile = async () => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}

		const u = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				id: true,
				image: true,
			},
		});

		return u ? { status: 200, data: u } : { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const getVideoComments = async (id: string) => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}

		const comment = await client.comment.findMany({
			where: {
				OR: [{ videoId: id }, { commentId: id }],
				commentId: null,
			},
			include: {
				reply: {
					include: {
						User: true,
					},
				},
				User: true,
			},
		});

		if (comment && comment.length > 0) {
			return { status: 200, data: comment };
		}
		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const inviteMembers = async (workspaceId: string, receiverId: string, email: string) => {
	try {
		const user = await currentUser();
		if (!user) {
			return { status: 403 };
		}

		const senderInfo = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				id: true,
				firstName: true,
				lastName: true,
			},
		});

		if (senderInfo?.id) {
			const workspace = await client.workspace.findUnique({
				where: {
					id: workspaceId,
				},
				select: {
					id: true,
					name: true,
				},
			});

			if (workspace) {
				const invitation = await client.invite.create({
					data: {
						content: `Hello ${user.firstName}, you have been invited by ${senderInfo.firstName} ${senderInfo.lastName} to ${workspace.name}`,
						senderId: senderInfo.id,
						receiverId: receiverId,
						workspaceId: workspaceId,
					},
					select: {
						id: true,
					},
				});

				await client.user.update({
					where: {
						clerkId: user.id,
					},
					data: {
						notifications: {
							create: {
								content: `${user.firstName}, you have been invited by ${senderInfo.firstName} ${senderInfo.lastName} to ${workspace.name}`,
							},
						},
					},
				});

				if(invitation){
					
				}
			}
		}
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};
