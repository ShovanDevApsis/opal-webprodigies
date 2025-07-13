"use server";

import { client } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const verifyAccessToWorkspace = async (workspaceID: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const isUserInWorkspace = await client.workspace.findUnique({
			where: {
				id: workspaceID,
				OR: [
					{
						User: {
							clerkId: user.id,
						},
						members: {
							every: {
								User: {
									clerkId: user.id,
								},
							},
						},
					},
				],
			},
		});

		return isUserInWorkspace
			? { status: 200, data: isUserInWorkspace }
			: { status: 403, data: null };
	} catch (error) {
		console.log(error);
		return { status: 403, data: null };
	}
};
