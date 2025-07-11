import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";
import React from "react";

const DashboardPage = async () => {
	// Authenticate
	const auth = await onAuthenticateUser()
	if(auth.status === 200 || auth.status === 200){
		return redirect(`/dashboard/${auth.user?.firstName}${auth?.user?.lastName}`)
	}

	if(auth.status === 400 || auth.status === 500 || auth.status === 404){
		return redirect('/auth/sign-in')
	}

	// if user already exists redirect them to right DashboardPage

	// if user does not exist create account
	return <div>DashboardPage</div>;
};

export default DashboardPage;
