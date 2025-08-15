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
