import CommentForm from "@/components/form/comment-form";
import React from "react";

type Props = {
	author: string;
	videoId: string;
};

function Activity({ author, videoId }: Props) {
	return (
		<main className="min-h-[40vh] text-white p-6 bg-neutral-800/80 shadow-2xl rounded-md">
			Make canges to your content heres
			<CommentForm />
		</main>
	);
}

export default Activity;
