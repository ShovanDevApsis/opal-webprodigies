import { getFolderInfo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";

type Props = {
	folderId: string;
};

function FolderInfo({ folderId }: Props) {
	const {} = useQueryData(['folder-info'] , () => {
        getFolderInfo(folderId)
    });

	return <div>FolderInfo</div>;
}

export default FolderInfo;
