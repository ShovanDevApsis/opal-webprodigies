import CommentForm from "@/components/form/comment-form";
import React from "react";

type Props = {
	author: string;
	videoId: string;
};

function Activity({ author, videoId }: Props) {
	return (
		<main className="min-h-[40vh] text-white p-6 bg-neutral-800/80 shadow-2xl rounded-md">
			<h2 className="mb-6 text-neutral-300 font-semibold">Make canges to your content heres</h2>
			<CommentForm author={author} videoId={videoId} />
		</main>
	);
}

export default Activity;
