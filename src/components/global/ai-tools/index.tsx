import React from "react";

type Props = {
	plan: "PRO" | "FREE";
	trial: boolean;
	videoId: string;
};

function AiTools({ plan, trial, videoId }: Props) {
	return <div>AiTools</div>;
}

export default AiTools;
