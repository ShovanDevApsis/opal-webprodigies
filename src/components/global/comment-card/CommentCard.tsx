import { CommentRepliesProps } from "@/types/index.types";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

type Props = {
	comment: string;
	author: { image: string; firstname: string; lastname: string };
	videoId: string;
	commentId?: string;
	reply: CommentRepliesProps[];
	isReply?: boolean;
};

function CommentCard({ author, comment, reply, videoId, commentId, isReply }: Props) {
	return (
		<Card
			className={cn(
				isReply
					? "bg-[#1D1D1D] border-none pl-10"
					: "border-[1px] bg-[#1D1D1D] p-5"
			)}
		>
			<CardContent>
				<div className="flex gap-x-2 items-center">
					<Avatar>
						<AvatarImage
							src={author.image || ""}
							alt="author"
						/>
						<AvatarFallback>
							<User />
						</AvatarFallback>
					</Avatar>
					<p className="capitalize text-sm text-neutral-400">
						{author.firstname} {author.lastname}
					</p>
				</div>
			</CardContent>
		</Card>
	);
}

export default CommentCard;
