"use client";

import { getAllVideos } from "@/actions/workspace";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";
import VideoCard from "../videos/video-card";
import { cn } from "@/lib/utils";


function DashboardVideos() {
	const {
		data: response,
		isFetching,
		isPending,
	} = useQueryData(["user-all-videos"], getAllVideos);

	console.log(response);

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const isEmptyObject = (obj: any) => {
		return Object.keys(obj).length === 0 && obj.constructor === Object;
	};

	if (isFetching || isPending || isEmptyObject(response)) {
		return (
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		);
	}

	return (
		<div className="py-3 border border-gray-800 rounded-md px-2">
			<section
				className={cn(
					response && response?.status !== 200
						? "p-5"
						: "grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"
				)}
			>
				{response && response?.status === 200 ? (
					<>
						{response?.data?.map((video) => (
							<VideoCard
								key={video.id}
								Folder={video.Folder}
								User={video.User}
								createdAt={
									new Date(video.createdAt)
								}
								id={video.id}
								processing={video.processing}
								workspaceId={""}
								source={video.source}
								title={video.title}
							/>
						))}
					</>
				) : (
					<p className="text-neutral-300">No videos Created Yet</p>
				)}
			</section>
		</div>
	);
}

export default DashboardVideos;
