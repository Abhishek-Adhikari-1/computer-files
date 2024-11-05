"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	FolderKanbanIcon,
	HomeIcon,
	PhoneIcon,
	UserRoundIcon,
} from "lucide-react";
import { ThemeButton } from "../theme/ThemeButton";
import { AnimatePresence, motion } from "framer-motion";

const menuItems = [
	{ name: "Home", href: "/", icon: <HomeIcon /> },
	{ name: "About", href: "/about", icon: <UserRoundIcon /> },
	{ name: "Projects", href: "/projects", icon: <FolderKanbanIcon /> },
	{ name: "Contact", href: "/contact", icon: <PhoneIcon /> },
];

export default function Header() {
	const pathname = usePathname();

	return (
		<AnimatePresence>
			<header className="flex flex-col items-center lg:justify-center gap-y-4 fixed h-max bottom-3 lg:bottom-0 mt-auto lg:right-[1%] z-50 w-full lg:w-16 lg:max-w-md lg:h-screen px-3 lg:px-0">
				<motion.nav
					className="flex w-full lg:flex-col items-center justify-between lg:justify-center gap-y-10 px-7 py-8 md:px-40 lg:p-0 lg:py-10 h-[0px] lg:h-max bg-[#e1e7fa61] dark:bg-white/10 backdrop-blur-md text-3xl lg:text-lg rounded-full border-black/5 border-[1px]"
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -20 }}
					transition={{
						type: "spring",
						duration: 1,
						ease: "easeInOut",
						delay: 0,
					}}
				>
					{menuItems.map((menuItem, index) => (
						<Link
							key={index + menuItem?.name}
							href={menuItem?.href}
							className="relative flex items-center group text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-100"
						>
							<div
								className={`absolute pr-14 right-0 hidden ${
									pathname !== menuItem?.href &&
									"lg:group-hover:flex"
								}`}
							>
								<div className="bg-gray-100 dark:bg-gray-800 relative flex items-center p-[6px] rounded-[3px]">
									<span className="text-[12px] capitalize leading-none font-semibold select-none">
										{menuItem?.name}
									</span>
									<span className="border-solid border-l-gray-100 dark:border-l-gray-800 border-l-8 border-y-transparent border-y-[4px] border-r-0 absolute -right-2"></span>
								</div>
							</div>
							<div
								className={`${
									pathname === menuItem?.href &&
									"text-blue-600 dark:text-blue-400"
								} transition-colors duration-300`}
							>
								{menuItem?.icon}
							</div>
						</Link>
					))}
				</motion.nav>
				<ThemeButton
					className={
						"top-2 right-2 md:top-3 md:right-3 lg:top-3 lg:right-4 z-50"
					}
					style={{
						position: "fixed",
					}}
				/>
			</header>
		</AnimatePresence>
	);
}
