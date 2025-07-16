"use client";

import { Video } from "lucide-react";
import React from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

type Props = {
	actionWorkspaceId: string;
};

const SidebarMain = ({ actionWorkspaceId }: Props) => {
	const router = useRouter()

	const handleChange = (val: string) => {
	router.push(`/dashboard/${val}`)
	};
	
	return (
		<div className="bg-[#111111] flex-none relative p-4 h-full w-[240px] flex flex-col gap-4 items-center overflow-hidden">
			<div className="bg-[#111111] p-4 gap-2 justify-center items-center mb-2 flex">
				<Video />
				<span className="text-white text-xs truncate">
					Shovans Video APP
				</span>
			</div>

			<Select defaultValue={actionWorkspaceId} onValueChange={handleChange}>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a workspace" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectItem value="apple">Apple</SelectItem>
						<SelectItem value="banana">Banana</SelectItem>
						<SelectItem value="blueberry">Blueberry</SelectItem>
						<SelectItem value="grapes">Grapes</SelectItem>
						<SelectItem value="pineapple">Pineapple</SelectItem>
					</SelectGroup>
				</SelectContent>
			</Select>
		</div>
	);
};

export default SidebarMain;
