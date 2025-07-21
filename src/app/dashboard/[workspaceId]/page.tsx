import CreateWorkspace from "@/components/global/create-workspace";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
	params: { workspaceId: string };
};

function WrokspacePage({ params }: Props) {
	return (
		<div className="px-5">
			<Tabs defaultValue="account">
				<TabsList>
					<TabsTrigger value="videos">Videos</TabsTrigger>
					<TabsTrigger value="archive">Archive</TabsTrigger>
				</TabsList>
				<div className="flex gap-x-2">
					<CreateWorkspace  />
				</div>
				<TabsContent value="video"></TabsContent>
			</Tabs>
		</div>
	);
}

export default WrokspacePage;
