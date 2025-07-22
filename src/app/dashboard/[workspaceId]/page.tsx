import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
	params: { workspaceId: string };
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function WrokspacePage({ params }: Props) {
	return (
		<div className="px-5 flex items-center justify-between">
			<Tabs defaultValue="videos" className="mt-6">
				<TabsList className="bg-transparent gap-2 pl-0">
					<TabsTrigger
						value="videos"
						className="cursor-pointer p-[13px] px-6 rounded-full font-bold border border-gray-400 data-[state=active]:bg-gray-800"
					>
						Videos
					</TabsTrigger>
					<TabsTrigger
						value="archive"
						className="p-[13px] px-6 cursor-pointer rounded-full font-bold border border-gray-400 data-[state=active]:bg-gray-800"
					>
						Archive
					</TabsTrigger>
				</TabsList>

				<TabsContent value="video"></TabsContent>
			</Tabs>

			<div className="flex gap-x-2">
				<CreateWorkspace />
			</div>
		</div>
	);
}

export default WrokspacePage;
