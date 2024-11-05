import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import ClerkTheme from "@/components/theme/ClerkTheme";

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
				<ThemeProvider
					attribute="class"
					enableSystem
					defaultTheme="light"
				>
					<ClerkTheme>
						{children}
					</ClerkTheme>
				</ThemeProvider>
			</body>
		</html>
	);
}
