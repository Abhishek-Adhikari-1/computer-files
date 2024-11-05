"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import toast from "react-hot-toast";
import Link from "next/link";

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleSignIn = async (provider: any) => {
		setIsLoading(true);
		try {
			// await signIn(provider, { callbackUrl: "/" });
			// toast.success(`Successfully signed in with ${provider}`);
		} catch (err: any) {
			toast.error(err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="absolute w-full max-h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-2">
			<div className="mx-auto max-w-md w-full space-y-6 py-5 px-4 md:px-5 border box-border rounded-xl">
				<div className="space-y-2 text-center">
					<h1 className="text-3xl font-bold">Forgot Password</h1>
					<p className="text-muted-foreground text-sm">
						Enter your email to reset your password.
					</p>
				</div>
				<div>
					<div className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								name="email"
								className="placeholder:select-none"
								placeholder="johndoe12@example.com"
								required
							/>
						</div>

						<Button type="submit" className="w-full select-none">
							Sign In
						</Button>
					</div>
					<div className="mt-5">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="my-8 mb-10" />
							</div>
						</div>

						<p className="mt-2 text-center text-sm text-gray-500">
							Remembered password?{" "}
							<Link
								href="/auth/signin"
								className="font-semibold leading-5 text-slate-500 dark:text-slate-400 hover:text-slate-700 hover:dark:text-slate-300"
							>
								Sign In
							</Link>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
