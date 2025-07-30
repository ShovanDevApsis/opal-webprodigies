"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Gamepad, User, Share2, Circle, Eye } from "lucide-react";
import Loader from "../loader";
import CardMenu from "./card-menu";

type Props = {
	User: {
		firstname: string | null;
		lastname: string | null;
		image: string | null;
	} | null;
	id: string;
	Folder: {
		id: string;
		name: string;
	} | null;
	createdAt: Date;
	title: string | null;
	source: string;
	processing: boolean;
	workspaceId: string;
};

function VideoCard(props: Props) {
	return (
		<Card className="w-full max-w-sm !p-0 bg-gray-900/10 h-[350px]  border-gray-700 overflow-hidden">
			<Loader state={false}>
				{/* Top section with white background */}
				<div className="bg-gray-800/20 h-[150px]"></div>
				<div className="flex items-center justify-between p-2">
					<div className="flex items-center gap-1">
						<Gamepad className="cursor-pointer text-gray-400" />
						<CardMenu
							videoId={props.id}
							currentFolder={props.Folder?.id}
							currentFolderName={props.Folder?.name}
							currentWorkspace={props.workspaceId}
						/>
					</div>

					<Badge className=" bg-gray-800 text-white hover:bg-gray-800">
						120 min
					</Badge>
				</div>

				{/* Bottom section with dark background */}
				<CardContent className="p-6 space-y-4">
					<span className="text-white font-medium text-xs leading-relaxed mb-2">
						How to create an offer so good your clients feel
						stupid saying no.
					</span>

					{/* Profile section */}
					<div className="flex items-center space-x-3 mt-3">
						<Avatar className="w-8 h-8">
							<AvatarImage
								src={props.User?.image || ""}
							/>
							<AvatarFallback className="bg-blue-500 text-white text-xs">
								<User />
							</AvatarFallback>
						</Avatar>
						<div className="flex-1">
							<p className="text-white font-medium text-sm">
								{`${props.User?.firstname} ${props.User?.lastname}`}
							</p>
							<p className="text-gray-400 text-xs">
								1 day ago
							</p>
						</div>
					</div>

					{/* Footer info */}
					<div className="flex items-center justify-between mt-3 text-gray-400 text-xs">
						<div className="flex items-center space-x-1">
							<Share2 className="w-3 h-3 " />
							<span>
								{props.User?.firstname} Workplace
							</span>
						</div>
						<div className="flex items-center space-x-2">
							<div className="flex gap-1 items-center">
								<Circle className="h-3 w-3" />
								<span>2</span>
							</div>
							<div className="flex gap-1 items-center">
								<Eye className="h-3 w-3" />
								<span>2</span>
							</div>
							<span>{props.processing}</span>
						</div>
					</div>
				</CardContent>
			</Loader>
		</Card>
	);
}

export default VideoCard;
