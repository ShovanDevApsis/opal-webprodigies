import { CreateWorkspace } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateWorkspace = () => {
	const {} = useMutationData(
		["create-workspace"],
		(data: { name: string }) => {
			return CreateWorkspace(data.name);
		},
		"user-workspaces"
	);
};
