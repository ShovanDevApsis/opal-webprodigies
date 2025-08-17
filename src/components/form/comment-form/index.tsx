import FormGenerator from "@/components/global/form-generator";
import { useVideoComment } from "@/hooks/useVideo";
import React from "react";

type Props = {
	videoId: string;
	author: string;
	commentId?: string;
	close?: () => void;
};

function CommentForm({ videoId, author, close, commentId }: Props) {
	const { errors, isPending, onFormSubmit, register } = useVideoComment(videoId, commentId);

	return (
		<form onSubmit={onFormSubmit}>
			<FormGenerator
				inputType="input"
				placeholder={`Place ${author}'s comment...`}
				type="text"
				name="comment"
				errors={errors}
				register={register}
			/>
		</form>
	);
}

export default CommentForm;
