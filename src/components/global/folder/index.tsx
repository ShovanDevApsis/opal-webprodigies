import { cn } from "@/lib/utils";
import { ArrowRight, FolderIcon } from "lucide-react";
import React from "react";

type Props = {
	workspaceId: string;
};

function Folders({ workspaceId }: Props) {
	// Get Folders
	//  Optimistic variable => in new data is there from query variable
	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-centerronded w-full justify-between">
				<div className="flex items-center gap-4">
					<FolderIcon />
					<h2 className="text-gray-300 text-xl">Folders</h2>
				</div>
				<div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-700 transition-colors">
					<p className="text-gray-300">See More</p>
					<ArrowRight />
				</div>
			</div>
			<section
				className={cn("flex items-center gap-4 !overflow-x-auto w-full")}
			></section>
		</div>
	);
}

export default Folders;
