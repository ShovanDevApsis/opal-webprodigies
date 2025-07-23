import React from "react";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

type Props = {
	state: boolean;
	className?: string;
	color?: string;
	children?: React.ReactNode;
};

function LoaderItem({ state, className, color, children }: Props) {
	if (state) {
		return (
			<div className={cn(className)}>
				<Loader className="animate-spin"/>
			</div>
		);
	}
	return <div>{children}</div>;
}

export default LoaderItem;
