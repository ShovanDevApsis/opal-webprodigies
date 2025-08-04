/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Loader from "@/components/global/loader";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useMoveVideos } from "@/hooks/useFolders";
import { Box, Folder } from "lucide-react";
import React from "react";

type Props = {
	videoId: string;
	currentWorkspace?: string;
	currentFolder?: string;
	currentFolderName?: string;
};

function ChangeVideoLocation({
	videoId,
	currentFolder,
	currentFolderName,
	currentWorkspace,
}: Props) {
	// To Do wire up the move folder
	const {
		errors,
		folders,
		isFetching,
		isFolders,
		isPending,
		onFormSubmit,
		register,
		workspaces,
	} = useMoveVideos(videoId, currentWorkspace as string);

	const folderInfo = folders.find((f) => f.id === currentFolder);
	const workspaceInfo = workspaces.find((f) => f.id === currentWorkspace);

	return (
		<form className="flex flex-col gap-y-5" onSubmit={onFormSubmit}>
			<div className="flex items-center gap-2">
				<Box />
				<h2 className="text-neutral-300 text-2xl">
					{workspaceInfo && workspaceInfo.name} Workspace
				</h2>
			</div>
			<Separator orientation="horizontal" className="bg-neutral-600" />
			<div className="flex items-center gap-2">
				<Folder />
				<h2 className="text-neutral-300 text-2xl"> {currentFolderName}</h2>
			</div>
			<Separator orientation="horizontal" className="bg-neutral-600" />
			{folderInfo ? (
				<p className="text-neutral-300 text-sm">{folderInfo.name}</p>
			) : (
				<p className="text-neutral-300 text-sm">This video has no folder</p>
			)}
			<Separator orientation="horizontal" className="bg-neutral-600" />
			<span className="text-xl text-neutral-300">Move Folder To:</span>
			<select {...register} className="bg-transparent rounded-xl text-base">
				{workspaces.map((cur: any) => (
					<option key={cur.id} value={cur.id}>
						{cur.name}
					</option>
				))}
			</select>
			<Button
				disabled={isPending}
				type="submit"
				className="bg-white text-black rounded-lg cursor-pointer font-semibold hover:bg-gray-200 transition-colors"
			>
				<Loader state={isPending}>Change Location</Loader>
			</Button>
		</form>
	);
}

export default ChangeVideoLocation;
