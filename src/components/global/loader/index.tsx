import React from "react";
import Spinner from "./spinner";
import { cn } from "@/lib/utils";

type Props = {
	state: boolean;
	className?: string;
	color?: string;
	children?: React.ReactNode;
};

function Loader({ state, className, color, children }: Props) {
	if (state) {
		return (
			<div className={cn(className)}>
				<Spinner color={color} />
			</div>
		);
	}
	return <div>{children}</div>;
}

export default Loader;
