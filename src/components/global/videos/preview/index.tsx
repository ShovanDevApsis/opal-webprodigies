"use client";

import { getPreviewVideo } from "@/actions/workspace";
import { useQueryData } from "@/hooks/useQueryData";
import { GetPreviewVideoResponse } from "@/types/index.types";
import { useRouter } from "next/navigation";
import React from "react";
import SkeletonLoader from "../../skeleton";

type Props = {
	videoId: string;
};

const getTimeAgo = (createdAt: string | Date): string => {
	const now = new Date();
	const past = new Date(createdAt);
	const diff = now.getTime() - past.getTime();

	const minutes = Math.floor(diff / (1000 * 60));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (days > 0) return `${days} day(s) ago`;
	if (hours > 0) return `${hours} hour(s) ago`;
	if (minutes > 0) return `${minutes} minute(s) ago`;

	return "just now";
};

function VideoPreview({ videoId }: Props) {
	// Setup notify first view
	const router = useRouter();
	const { data, isFetching } = useQueryData(["preview-video"], () =>
		getPreviewVideo(videoId)
	);

	if (isFetching) {
		return <SkeletonLoader rows={12} />;
	}

	const { data: responseData, status, author } = data as GetPreviewVideoResponse;

	if (status !== 200) {
		return router.push(`/`);
	}

	const daysAgo = getTimeAgo(responseData.createdAt);

	return (
		<div className="grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5">
			<div className="flex flex-col lg:col-span-2 gap-y-10">
				<div>
					<div className="flex gap-x-5 items-center justify-between">
						<h5 className="text-white text-4xl font-bold">
							{responseData.title}
						</h5>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VideoPreview;
