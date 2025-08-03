import { Paperclip } from "lucide-react";
import React from "react";

type Props = {};

function CopyToClipBoard({}: Props) {
	return (
		<>
			<Paperclip className="cursor-pointer text-gray-400" />
		</>
	);
}

export default CopyToClipBoard;
