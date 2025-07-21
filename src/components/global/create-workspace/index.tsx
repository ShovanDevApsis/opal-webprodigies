"use client";
import { getUserWorkspaces } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { UserWorkspaceResponse } from "@/types/index.types";
import React from "react";
import Modal from "../modal";

type Props = {};

function CreateWorkspace({}: Props) {
	const { data } = useQueryData(["user-workspaces"], getUserWorkspaces);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const { data: workspace } = data as any;

	if (workspace.subscriptions.plan === "FREE") {
		return <div>CreateWorkspace</div>;
	}
	if (workspace.subscriptions.plan === "PRO") {
		return (
			<Modal
				title="Create a Workspace"
				description="Create to add member and shae video in private"
			>
				CreateWorkspace
			</Modal>
		);
	}
}

export default CreateWorkspace;
