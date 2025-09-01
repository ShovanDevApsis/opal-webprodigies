import FormGenerator from "@/components/global/form-generator";
import { Button } from "@/components/ui/button";
import { useVideoComment } from "@/hooks/useVideo";
import { CrossIcon, Loader, Send } from "lucide-react";
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
		<form onSubmit={onFormSubmit} className="relative w-full">
			<div className="flex-1">
				<FormGenerator
					inputType="input"
					placeholder={`Place ${author}'s comment...`}
					type="text"
					name="comment"
					errors={errors}
					register={register}
				/>
			</div>

			<Button
				disabled={isPending}
				className="cursor-pointer flex items-center justify-center absolute top-[1px] right-3 bg-transparent hover:bg-transparent"
				variant="ghost"
				type="submit"
			>
				{isPending ? (
					<>
						<Loader
							size={18}
							className="text-white/50 animate-spin"
						/>
					</>
				) : (
					<>
						<Send
							className="text-white/50 cursor-pointer hover:text-white/50"
							size={18}
						/>
					</>
				)}
			</Button>
			{close && (
				<>
					<Button
						className="cursor-pointer flex items-center justify-center absolute top-[1px] right-1 bg-transparent hover:bg-transparent"
						variant="ghost"
						type="submit"
						onClick={close}
					>
						<>
							<CrossIcon
								className="text-white/50 cursor-pointer hover:text-white/50"
								size={18}
							/>
						</>
					</Button>
				</>
			)}
		</form>
	);
}

export default CommentForm;
