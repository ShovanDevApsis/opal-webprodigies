import { CommentRepliesProps } from "@/types/index.types";
import React from "react";

type Props = {
	comment: string;
	author: { image: string; firstname: string; lastname: string };
	videoId: string;
	commentId?: string;
	reply: CommentRepliesProps[];
	isReply?: boolean;
};

function CommentCard({ author, comment, reply, videoId, commentId, isReply }: Props) {
	return <div>CommentCard</div>;
}

export default CommentCard;
