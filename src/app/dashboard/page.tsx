import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
	const auth = await onAuthenticateUser();
	if (auth.status === 200 || auth.status === 200) {
		return redirect(`/dashboard/${auth.user?.firstName}${auth?.user?.lastName}`);
	}

	if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
		return redirect("/auth/sign-in");
	}

	return <div>DashboardPage</div>;
};

export default DashboardPage;
