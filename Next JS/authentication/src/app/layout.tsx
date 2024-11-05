import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeButton } from "@/components/theme/ThemeButton";
import SessionWrapper from "@/components/main/SessionWrapper";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

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
		<SessionWrapper>
			<html lang="en">
				<body
					className={cn(
						"min-h-dvh h-full max-h-dvh bg-background font-sans antialiased relative",
						inter.className
					)}
				>
					<ThemeProvider
						attribute="class"
						enableSystem
						defaultTheme="light"
					>
						<ThemeButton />
						{children}
						<div className="select-none">
							<Toaster />
						</div>
					</ThemeProvider>
				</body>
			</html>
		</SessionWrapper>
	);
}
