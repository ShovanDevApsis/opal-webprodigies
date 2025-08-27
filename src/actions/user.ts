"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

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
						},
						lastName: { contains: query },
						email: { contains: query },
					},
				],
				NOT: [
					{
						clerkId: user.id,
					},
				],
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
