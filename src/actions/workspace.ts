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

export const getWorkspaceFolders = async (workspaceID: string) => {
	try {
		const user = currentUser();
		if (!user) return { status: 403 };

		const getFolders = await client.folder.findMany({
			where: {
				workspaceId: workspaceID,
			},
			include: {
				_count: {
					select: {
						videos: true,
					},
				},
			},
		});

		if (getFolders && getFolders.length > 0) {
			return { status: 200, data: getFolders };
		}

		return { status: 403, data: [] };
	} catch (error) {
		console.log(error);
		return { status: 403, data: [] };
	}
};

export const getUserVideos = async (workspaceID: string) => {
	try {
		const user = currentUser();
		if (!user) return { status: 403 };

		const getVideos = await client.video.findMany({
			where: {
				OR: [
					{
						workspaceId: workspaceID,
					},
					{
						folderId: workspaceID,
					},
				],
			},

			select: {
				id: true,
				title: true,
				source: true,
				createdAt: true,
				proccessing: true,
				Folder: {
					select: {
						name: true,
						id: true,
					},
				},
				User: {
					select: {
						firstName: true,
						lastName: true,
						image: true,
					},
				},
			},
			orderBy: {
				createdAt: "asc",
			},
		});

		return getVideos ? { status: 200, data: getVideos } : { status: 403, data: [] };
	} catch (error) {
		console.log(error);
		return { status: 403, data: [] };
	}
};

export const getUserWorkspaces = async () => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const workspaces = await client.user.findUnique({
			where: {
				clerkId: user.id,
			},
			select: {
				subscriptions: {
					select: {
						plan: true,
					},
				},
				workspace: {
					select: {
						id: true,
						name: true,
						type: true,
					},
				},
				members: {
					select: {
						Workspace: {
							select: {
								id: true,
								name: true,
								type: true,
							},
						},
					},
				},
			},
		});

		return workspaces ? { status: 200, data: workspaces } : { status: 403, data: [] };
	} catch (error) {
		console.log(error);
		return { status: 403, data: [] };
	}
};

export const CreateWorkspace = async (name: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const isAuthorized = await client.user.findUnique({
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

		if (isAuthorized?.subscriptions?.plan === "PRO") {
			const create = await client.user.update({
				where: {
					clerkId: user.id,
				},
				data: {
					workspace: {
						create: {
							name: name,
							type: "PUBLIC",
						},
					},
				},
			});
			if (create) {
				return { status: 200, data: create };
			}
		}
		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};

export const RenameFolder = async (name: string, folderId: string) => {
	try {
		const user = await currentUser();
		if (!user) return { status: 403 };

		const renamed = await client.folder.update({
			where: {
				id: folderId,
			},
			data: {
				name: name,
			},
		});

		if (renamed) {
			return { status: 200, data: renamed };
		}

		return { status: 403, data: undefined };
	} catch (error) {
		console.log(error);
		return { status: 403, data: undefined };
	}
};
