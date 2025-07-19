"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/useMutationData";
import { useSearch } from "@/hooks/useSearch";

import React from "react";

type Props = {
	workspaceId: string;
};

const Search = ({ workspaceId }: Props) => {
	const { onSearchQuery, query, isFetching, onUsers } = useSearch("get-users", "USER");

	// TO Do use mutation for inviting members
	// const {} = useMutationData('invite-member', inviteMember)

	return (
		<div className="flex flex-col gap-y-5">
			<Input
				onChange={onSearchQuery}
				value={query}
				className="bg-transparent border-2 outline-none"
				placeholder="Search for user.."
				type="text"
			/>
			{isFetching ? (
				<div className="flex flex-col gap-y-2">
					<Skeleton className="w-full h-3 rounded-xl bg-neutral-700"></Skeleton>
					<Skeleton className="w-full h-3 rounded-xl bg-neutral-700"></Skeleton>
				</div>
			) : (
				<div>
					{onUsers && onUsers.length > 0 ? (
						<>
							{onUsers.map((user, i) => {
								return (
									<div
										key={i}
									>{`${user.firstName} ${user.lastName}`}</div>
								);
							})}
						</>
					) : (
						<span className="text-xs p-2 text-gray-600">
							No user found!
						</span>
					)}
				</div>
			)}
		</div>
	);
};

export default Search;
