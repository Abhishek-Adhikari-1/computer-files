import { ThemeButton } from "@/components/theme/ThemeButton";
import type { Metadata, NextPage } from "next";

export const metadata: Metadata = {
	title: "Auth | Abhishek | ChatApp",
	description: "Created by Abhishek Adhikari",
};

export default function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<>
			<div className="absolute w-full max-h-full top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] p-2 flex justify-center items-center">
				{children}
			</div>
			<ThemeButton />
		</>
	);
}
