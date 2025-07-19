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
import { useQueryData } from "@/hooks/useQueryData";
import { getUserWorkspaces } from "@/actions/workspace";
import { UserProps } from "@/types/index.types";
import { Separator } from "@radix-ui/react-select";
import Modal from "../modal";
import { PlusCircle } from "lucide-react";
import Tooltip from "@/components/ui/customtooltip";
import Search from "../search";

type Props = {
	actionWorkspaceId: string;
};

const SidebarMain = ({ actionWorkspaceId }: Props) => {
	const router = useRouter();

	const { data } = useQueryData(["user-workspaces"], getUserWorkspaces);

	const { data: user } = data as UserProps;

	const currentWorkspace = user.workspace.find(
		(curWorkspace) => curWorkspace.id === actionWorkspaceId
	);

	const handleChange = (val: string) => {
		router.push(`/dashboard/${val}`);
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
				<SelectTrigger className="w-[180px] bg-transparent outline-none focus:outline-none ring-0 focus:ring-0">
					<SelectValue placeholder="Select a workspace" />
				</SelectTrigger>
				<SelectContent className="ring-0 border-0 focus-visible:ring-offset-0 focus-visible:ring-0">
					<SelectGroup>
						{user?.workspace.map((wSpace) => (
							<SelectItem
								value={wSpace.id}
								key={wSpace.id}
							>
								{wSpace.name}
							</SelectItem>
						))}
						{user?.members?.length > 0 && (
							<div>
								{user.members.map((member) => (
									<SelectItem
										value={
											member
												.workspace
												.id
										}
										key={
											member
												.workspace
												.id
										}
									>
										{
											member
												.workspace
												.name
										}
									</SelectItem>
								))}
							</div>
						)}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Separator className="mb-4" />
			{currentWorkspace?.type === "PUBLIC" &&
				user.subscriptions?.plan === "PRO" && (
					<Modal
						title="Add Workspace"
						trigger={
							<Tooltip content="Invite to workspace">
								<div className="p-1 border group border-neutral-800/90 flex items-center rounded-lg justify-center gap-2 cursor-pointer hover:text-gray-200">
									<PlusCircle
										size={30}
										className="text-neutral-300/90 text-sm cursor-pointer transition-colors group-hover:text-gray-200"
									/>
									<span className="text-sm text-neutral-300/90 transition-colors group-hover:text-gray-200">
										Invite to workspace
									</span>
								</div>
							</Tooltip>
						}
						description="Create new workspace"
					>
						<Search workspaceId={actionWorkspaceId} />
					</Modal>
				)}
		</div>
	);
};

export default SidebarMain;
