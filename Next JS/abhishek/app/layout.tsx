import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionWrapper from "@/components/main/SessionWrapper";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Header from "@/components/main/Header";
import { cn } from "@/lib/utils";
import Blur from "@/hooks/blur";
import { Particle } from "@/components/main/particles";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Abhishek || Portfolio",
	description: "Created by Abhishek Adhikari",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<SessionWrapper>
				<body
					className={cn(
						"h-dvh max-h-dvh min-h-dvh bg-background font-sans antialiased relative text-gray-700 dark:text-gray-300",
						inter.className
					)}
				>
					<ThemeProvider attribute="class" enableSystem>
						<Particle className={""} />
						<Header />
						<Blur />
						{children}
						<Toaster />
					</ThemeProvider>
				</body>
			</SessionWrapper>
		</html>
	);
}
