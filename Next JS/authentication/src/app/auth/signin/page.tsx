"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import SignInPage from "./SignIn";

const AuthSignIn = () => {
	const { data: session } = useSession();

	if (session) return redirect("/");

	const isAuthenticated = false;
	if (isAuthenticated) {
		redirect("/dashboard");
	}

	return <SignInPage />;
};

export default AuthSignIn;
