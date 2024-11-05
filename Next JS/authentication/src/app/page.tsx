"use client";
import { useEffect } from "react";
import Home from "@/components/main/Home";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LoginButton() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === "loading") return;
		if (!session) router.push("/auth/signin");
	}, [session, status, router]);

	if (status === "loading") {
		return <div>Loading...</div>;
	}

	return (
		console.log(session),
		(
			<>
				{session ? (
					<>
						Signed in as <br />
						Name: {session?.user?.name} <br />
						Email: {session?.user?.email} <br />
						<Image
							src={session?.user?.image || ""}
							alt="Profile"
							quality={100}
							width={200}
							height={200}
						/>
						<button onClick={() => signOut()}>Sign out</button>
						<Home />
					</>
				) : (
					<p>Redirecting...</p>
				)}
			</>
		)
	);
}
