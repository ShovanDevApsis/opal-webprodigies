import { commentSchema } from "@/components/form/comment-form/schema";
import { useMutationData } from "./useMutationData";
import { useQueryData } from "./useQueryData";
import { useZodForm } from "./useZodForm";

export const useVideoComment = (videoId: string, comment?: string) => {
	const { data } = useQueryData(["user-profile"], () => {});

	const { data: user, status } = data as {
		status: number;
		data: { id: string; image: string };
	};

    const {mutate,isPending} = useMutationData(
		["new-comment"],
		(data: { comment: string }) =>
			createCommentAndReply(user.id, data.comment, videoId),
		"video-comments",
		() => reset()
	);

	const { register, onFormSubmit, errors, reset } = useZodForm(mutate, commentSchema);

	
};
