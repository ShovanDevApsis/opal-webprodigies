import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
	const auth = await onAuthenticateUser();
	if (auth.status === 200 || auth.status === 200) {
		return redirect(`/dashboard/${auth.user?.firstName}${auth?.user?.lastName}`);
	}

	if (auth.status === 400 || auth.status === 500 || auth.status === 404) {
		return redirect("/auth/sign-in");
	}
};

export default AuthCallbackPage;
