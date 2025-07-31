import { Folder } from "lucide-react";
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
	return (
		<form className="flex flex-col gap-y-5">
			<div className="flex items-center gap-2">
				<Folder />
				<h2 className="text-neutral-300 text-2xl">{currentFolderName}</h2>
			</div>
			<span className="text-xl text-neutral-300">Move Folder To:</span>
			<select name="" id="">
				<option value="workspace">workspace</option>
			</select>
		</form>
	);
}

export default ChangeVideoLocation;
