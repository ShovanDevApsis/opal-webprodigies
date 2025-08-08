import { getUserVideos } from "@/actions/workspace";
import { QueryClient } from "@tanstack/react-query";
import React from "react";

type Props = {
	params: { videoId: string };
};

async function VideoPage({ params: { videoId } }: Props) {
	const queryClinet = new QueryClient();

	await queryClinet.prefetchQuery({ queryKey: ["preview-video"], queryFn: () => {
        getPreviewVideo(videoId)
    } });

	return <div>VideoPage</div>;
}

export default VideoPage;
