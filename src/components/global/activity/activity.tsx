import CommentForm from "@/components/form/comment-form";
import React from "react";
import CommentCard from "../comment-card/CommentCard";
import { useQueryData } from "@/hooks/useQueryData";
import { getVideoComments } from "@/actions/user";
import SkeletonLoader from "../skeleton";
import { VideoCommentsProps } from "@/types/index.types";

type Props = {
	author: string;
	videoId: string;
};

function Activity({ author, videoId }: Props) {
	const { data, isFetching } = useQueryData(["video-comments"], () =>
		getVideoComments(videoId)
	);

	const { data: comments } = data as VideoCommentsProps;

	return (
		<main className="min-h-[40vh] text-white p-6 bg-neutral-800/80 shadow-2xl rounded-md">
			<h2 className="mb-6 text-neutral-300 font-semibold">
				Make canges to your content heres
			</h2>
			<CommentForm author={author} videoId={videoId} />
			{isFetching ? (
				<>
					<SkeletonLoader />
				</>
			) : (
				<>
					{comments?.map((comment) => (
						<>
							<CommentCard
								author={{
									firstname:
										comment.User
											.firstname ??
										"",
									image:
										comment.User
											.image ??
										"",
									lastname:
										comment.User
											.lastname ??
										"",
								}}
								comment={comment.comment}
								reply={comment.reply}
								videoId={comment.videoId ?? ""}
								commentId={comment.id}
								key={comment.id}
							/>
						</>
					))}
				</>
			)}
		</main>
	);
}

export default Activity;
