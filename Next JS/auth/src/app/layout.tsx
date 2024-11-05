import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeButton } from "@/components/theme/ThemeButton";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Abhishek | ChatApp",
	description: "Created by Abhishek Adhikari",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning={true}>
			<body
				className={cn(
					"min-h-dvh h-full max-h-dvh bg-background font-sans antialiased relative",
					inter.className
				)}
			>
				<ClerkProvider
					appearance={{
						variables: { colorPrimary: "#000000" },
						elements: {
							formButtonPrimary:
								"bg-black border border-black border-solid hover:bg-white hover:text-black",
							socialButtonsBlockButton:
								"bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
							socialButtonsBlockButtonText: "font-semibold",
							formButtonReset:
								"bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
							membersPageInviteButton:
								"bg-black border border-black border-solid hover:bg-white hover:text-black",
							card: "bg-red",
						},
					}}
				>
					<ThemeProvider
						attribute="class"
						enableSystem
						defaultTheme="light"
					>
						<ThemeButton />
						{children}
					</ThemeProvider>
				</ClerkProvider>
			</body>
		</html>
	);
}
