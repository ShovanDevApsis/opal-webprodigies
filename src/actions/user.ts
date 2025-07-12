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

		return { satus: 400 };
	} catch (error) {
		console.log(error);
		return { status: 500 };
	}
};
