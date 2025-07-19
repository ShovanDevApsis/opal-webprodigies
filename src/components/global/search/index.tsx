"use client";
import { useSearch } from "@/hooks/useSearch";

import React from "react";

type Props = {
	workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
	const {} = useSearch("get-users", "USER");

	return <div>{workspaceId}</div>;
};

export default Search;
