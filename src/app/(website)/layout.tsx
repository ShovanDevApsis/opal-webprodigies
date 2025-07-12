import React from "react";
import LandingPageNavbar from "./_components/navbar";
import AuthCallbackPage from "../auth/callback/page";

type Props = {
	children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
	return (
		<AuthCallbackPage>
			<div className="flex flex-col py-2 xl:px-0 container">
				<LandingPageNavbar />
				{children}
			</div>
		</AuthCallbackPage>
	);
};

export default Layout;
