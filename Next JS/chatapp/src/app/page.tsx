import Header from "@/components/stack/Header";
import UserMenu from "@/components/stack/UserMenu";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
	const user = await currentUser();

	return (
		<>
			<SignedOut>
				<SignInButton />
			</SignedOut>
			<SignedIn>
				<Header />

				<div>Welcome, !</div>
				<div className="overflow-hidden">
					{JSON.stringify(user, null, 2)}
				</div>
			</SignedIn>
		</>
	);
}
