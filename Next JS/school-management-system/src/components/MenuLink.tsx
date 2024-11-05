"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuLink = ({ subItem }: { subItem?: any }) => {
	const currentPath = usePathname();

	const isActive = (path: string) => {
		return currentPath === path;
	};

	return (
		<Link
			href={subItem?.href}
			key={subItem?.label}
			className={`flex justify-center items-center lg:justify-start gap-4 text-gray-500 dark:text-gray-400 py-2 rounded-md select-none ${
				isActive(subItem?.href)
					? "bg-indigo-100 dark:bg-gray-700/70"
					: "hover:bg-indigo-50 dark:hover:bg-gray-700/40"
			}`}
		>
			<div className="w-5 h-5 lg:ml-2">{subItem?.icon}</div>
			<span className="hidden lg:block">{subItem?.label}</span>
		</Link>
	);
};

export default MenuLink;
