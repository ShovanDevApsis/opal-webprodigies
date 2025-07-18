import React from "react";

type Props = {
	content: string;
};

const Search = ({ content }: Props) => {
	return <div>{content}</div>;
};

export default Search;
