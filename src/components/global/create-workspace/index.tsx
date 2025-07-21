"use client";

import { getUserWorkspaces } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import Modal from "../modal";
import { Button } from "@/components/ui/button";

type Props = {};

function CreateWorkspace({}: Props) {
	const { data } = useQueryData(["user-workspaces"], getUserWorkspaces);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { data: workspace } = data as any;

	if (workspace.subscriptions.plan === "FREE") {
		return (
			<Modal
				title="Create a Workspace"
				trigger={<Button variant={"ghost"}>Open</Button>}
				description="Create to add member and shae video in private"
			>
				CreateWorkspace
			</Modal>
		);
	}
	if (workspace.subscriptions.plan === "PRO") {
		return (
			<Modal
				title="Create a Workspace"
				trigger={ 
					<Button variant={"outline"} className="!bg-white !text-black rounded !hover:bg-gray-100 transition-colors cursor-pointer">
						Open
					</Button>
				}
				description="Create to add member and shae video in private"
			>
				CreateWorkspace
			</Modal>
		);
	}
}

export default CreateWorkspace;
