import { useCreateWorkspace } from "@/hooks/useCreateWorkspace";
import React from "react";

type Props = {};

function WorkspaceForm({}: Props) {
	const { isPending, mutate } = useCreateWorkspace();

	return <div>WorkspaceForm</div>;
}

export default WorkspaceForm;
