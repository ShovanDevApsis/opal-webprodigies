"use client";

import { FolderIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import LoaderItem from "../loader";

type Props = {
	name: string;
	id: string;
	optimistic?: boolean;
	count?: number;
};

function Folder({ name, id, count, optimistic }: Props) {
	const pathname = usePathname();
	const router = useRouter();

	// TO Do loading states

	return (
		<div
			className="min-w-[240px] cursor-pointer bg-gray-900/5 hover:bg-gray-500/20 transition-colors rounded 
        border-[1px] flex py-6 px-4 items-center justify-between"
		>
			<LoaderItem state={false}>
				<div className="flex flex-col gap-2">
					<p className="text-sm">{name}</p>
					<p className="text-xs">{count || 0} videos</p>
				</div>
			</LoaderItem>

			<FolderIcon />
		</div>
	);
}

export default Folder;
