import React from "react";

type Props = {
	workspaceId: string;
};

function CreateFolders({workspaceId}: Props) {
	return <div>{workspaceId}</div>;
}

export default CreateFolders;
