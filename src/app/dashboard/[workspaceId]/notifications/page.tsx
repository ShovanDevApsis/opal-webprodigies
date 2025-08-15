"use client";
import { getUserNotificatons } from "@/actions/user";
import SkeletonLoader from "@/components/global/skeleton";
import { useQueryData } from "@/hooks/useQueryData";
import React from "react";

function NotificationsPage() {
	const { data: response, isPending } = useQueryData(
		["user-notifications"],
		getUserNotificatons
	);

	const { data: notifications, status } = response as {
		status: number;
		data: {
			notification: {
				id: string;
				userId: string | null;
				contnet: string;
			}[];
		};
	};

	if (isPending) {
		return <SkeletonLoader rows={12} />;
	}

	if (status !== 200) {
		return (
			<div className="flex justify-center items-center h-full w-full">
				<p>No Notification</p>
			</div>
		);
	}

	return <div>NotificationsPage</div>;
}

export default NotificationsPage;
