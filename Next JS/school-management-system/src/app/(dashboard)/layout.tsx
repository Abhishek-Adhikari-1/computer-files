import Menu from "@/components/Menu";
import { ScrollProvider } from "@/components/ScrollNavbar";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
	title: "Dashboard",
	description: "Created by Abhishek Adhikari",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="h-dvh flex overflow-hidden">
			{/* LEFT SIDE LAYOUT */}
			<div className="w-[14%] sm:w-[10%] md:w-[8%] lg:w-[16%] xl:w-[14%] max-h-full overflow-y-auto border-r-[1px] scrollbar-none hover:scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thumb-rounded">
				<Link
					href={"/"}
					className="flex justify-center items-center gap-2 sticky top-0 py-1 left-0 bg-background z-10"
				>
					<Image
						src="/favicon.ico"
						priority
						alt="logo"
						width={32}
						height={32}
					/>
					<span className="hidden lg:block font-bold">School Works⁺</span>
				</Link>
				<Menu />
			</div>

			{/* RIGHT SIDE LAYOUT */}
			<ScrollProvider>{children}</ScrollProvider>
		</div>
	);
}
