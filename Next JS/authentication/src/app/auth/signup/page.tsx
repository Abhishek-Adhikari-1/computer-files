"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { OAuth, GAuth } from "@/components/main/OAuth";
import toast from "react-hot-toast";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

export default function SignInPage() {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

	const togglePasswordVisibility = () => {
		setIsPasswordVisible(!isPasswordVisible);
	};

	const handleSignIn = async (provider: any) => {
		setIsLoading(true);
		try {
			// await signIn(provider, { callbackUrl: "/" });
			// toast.success(`Successfully registered with ${provider}`);

			toast.promise(signIn(provider, { callbackUrl: "/" }), {
				loading: "Please wait...",
				error: "Error occurs in data",
				success: `Successfully signed in with ${provider}`,
			});
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
					<h1 className="text-3xl font-bold">Register</h1>
					<p className="text-muted-foreground text-sm">
						Enter your information to create an account.
					</p>
				</div>
				<div>
					<div className="space-y-4">
						<div className="space-y-0 flex flex-col xs:flex-row gap-3 min-[430px]:gap-4">
							<div className="space-y-2">
								<Label htmlFor="firstName">First Name</Label>
								<Input
									id="firstName"
									type="text"
									name="name"
									className="placeholder:select-none"
									placeholder="John"
									required
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="lastName">Last Name</Label>
								<Input
									id="lastName"
									type="text"
									name="name"
									className="placeholder:select-none"
									placeholder="Smith"
									required
								/>
							</div>
						</div>
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
						<div className="space-y-2">
							<div className="flex justify-between mb-1">
								<Label htmlFor="password">Password</Label>
							</div>
							<div className="relative flex">
								<Input
									id="password"
									type={
										isPasswordVisible ? "text" : "password"
									}
									name="password"
									className="placeholder:select-none pr-10"
									placeholder="********"
									required
								/>
								<div
									className="absolute right-2 top-[50%] translate-y-[-50%] text-slate-500 cursor-pointer hover:text-slate-700"
									onClick={togglePasswordVisibility}
								>
									{isPasswordVisible ? (
										<EyeOffIcon className="w-6 h-6" />
									) : (
										<EyeIcon className="w-6 h-6" />
									)}
								</div>
							</div>
						</div>
						<Button type="submit" className="w-full select-none">
							Sign Up
						</Button>
					</div>
					<div className="mt-3">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<Separator className="my-8" />
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-background text-gray-400 dark:text-gray-500">
									or continue with
								</span>
							</div>
						</div>

						<div className="mt-3 grid grid-cols-2 gap-3">
							<Button
								disabled={isLoading}
								type="button"
								variant={"outline"}
								className={`${
									isLoading && "cursor-wait"
								} w-full inline-flex justify-center py-2 px-4 border border-slate-200 dark:border-slate-700`}
								onClick={() => handleSignIn("google")}
							>
								<span className="sr-only">
									Sign in with Google
								</span>
								<OAuth />
							</Button>
							<Button
								disabled={isLoading}
								type="button"
								variant={"outline"}
								className={`${
									isLoading && "cursor-wait"
								} w-full inline-flex justify-center py-2 px-4 border border-slate-200 dark:border-slate-700`}
								onClick={() => handleSignIn("github")}
							>
								<span className="sr-only">
									Sign up with GitHub
								</span>
								<GAuth />
							</Button>
						</div>
						<p className="mt-2 text-center text-sm text-gray-500">
							Already have an account?{" "}
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
