import { Button } from "@/components/ui/button";
import { FolderIcon } from "lucide-react";
import React from "react";

type Props = {
	workspaceId: string;
};

function CreateFolders({ workspaceId }: Props) {
	
	return (
		<Button className="cursor-pointer bg-white rounded hover:bg-neutral-300 transition-colors text-black font-bold px-2 py-1">
			<FolderIcon />
			Create Folder
		</Button>
	);
}

export default CreateFolders;
