/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutationData } from "@/hooks/useMutationData";
import { useSearch } from "@/hooks/useSearch";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader, User } from "lucide-react";

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
							{onUsers.map((user) => {
								return (
									<div
										key={user.id}
										className="flex p-2 justify-between items-center bg-gray-900/80 rounded-md gap-y-2 border-gray-700"
									>
										<div className="flex flex-col">
											<div className="flex gap-2 items-center">
												<Avatar>
													<AvatarImage
														src={
															user.image ||
															""
														}
														alt="avatar"
													/>
													<AvatarFallback>
														<User />
													</AvatarFallback>
												</Avatar>
												<span className="text-xs font-semibold">{`${user.firstName} ${user.lastName}`}</span>
											</div>
											<p className="text-xs font-semibold ml-10 mt-2">
												{
													user
														.subscriptions
														.plan
												}
											</p>
										</div>

										<div className="bg-white px-3 py-1 rounded flex gap-2 cursor-pointer hover:bg-gray-200 transition-colors">
											<Loader className="animate-spin text-black h-4 w-4"></Loader>
											<span className="text-black text-xs font-semibold">
												Invite
											</span>
										</div>
									</div>
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
