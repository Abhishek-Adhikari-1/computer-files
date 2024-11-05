// "use client";

// import { useUser, useClerk } from "@clerk/nextjs";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import React from "react";
// import { Skeleton } from "../ui/skeleton";
// import {
// 	DropdownMenu,
// 	DropdownMenuContent,
// 	DropdownMenuGroup,
// 	DropdownMenuItem,
// 	DropdownMenuLabel,
// 	DropdownMenuSeparator,
// 	DropdownMenuShortcut,
// 	DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { LogOut, SettingsIcon, UserIcon } from "lucide-react";

// const UserMenu = () => {
// 	const { user } = useUser();
// 	const { signOut } = useClerk();

// 	return (
// 		<>
// 			<DropdownMenu>
// 				<DropdownMenuTrigger asChild>
// 					<Avatar className="cursor-pointer">
// 						<AvatarImage
// 							src={user?.hasImage ? user?.imageUrl : ""}
// 							alt={user?.firstName?.toString()}
// 							loading="lazy"
// 						/>
// 						<AvatarFallback className="relative">
// 							{!user && (
// 								<Skeleton className="h-12 w-12 rounded-full absolute bg-black/15 dark:bg-white/20 duration-1000" />
// 							)}
// 							{user && user?.firstName?.charAt(0)}
// 							{user && user?.lastName?.charAt(0)}
// 						</AvatarFallback>
// 					</Avatar>
// 				</DropdownMenuTrigger>
// 				<DropdownMenuContent className="w-44">
// 					<DropdownMenuLabel>My Account</DropdownMenuLabel>
// 					<DropdownMenuGroup>
// 						<DropdownMenuItem>
// 							<UserIcon className="mr-2 h-4 w-4" />
// 							<span>Profile</span>
// 							<DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
// 						</DropdownMenuItem>
// 						<DropdownMenuItem>
// 							<SettingsIcon className="mr-2 h-4 w-4" />
// 							<span>SettingsIcon</span>
// 							<DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
// 						</DropdownMenuItem>
// 						<DropdownMenu>
// 							<DropdownMenuTrigger asChild>
// 								<DropdownMenuItem>
// 									<SettingsIcon className="mr-2 h-4 w-4" />
// 									<span>Appearance</span>
// 									<DropdownMenuShortcut>
// 										⌘A
// 									</DropdownMenuShortcut>
// 								</DropdownMenuItem>
// 							</DropdownMenuTrigger>
// 							<DropdownMenuContent className="w-44" align="end">
// 								<DropdownMenuLabel>
// 									Appearance SettingsIcon
// 								</DropdownMenuLabel>
// 								<DropdownMenuGroup>
// 									<DropdownMenuItem>
// 										<UserIcon className="mr-2 h-4 w-4" />
// 										<span>Light Mode</span>
// 										<DropdownMenuShortcut>
// 											⇧⌘P
// 										</DropdownMenuShortcut>
// 									</DropdownMenuItem>
// 									<DropdownMenuItem>
// 										<SettingsIcon className="mr-2 h-4 w-4" />
// 										<span>Dark Mode</span>
// 										<DropdownMenuShortcut>
// 											⌘S
// 										</DropdownMenuShortcut>
// 									</DropdownMenuItem>
// 									<DropdownMenuItem>
// 										<SettingsIcon className="mr-2 h-4 w-4" />
// 										<span>System Auto</span>
// 										<DropdownMenuShortcut>
// 											⌘S
// 										</DropdownMenuShortcut>
// 									</DropdownMenuItem>
// 								</DropdownMenuGroup>
// 							</DropdownMenuContent>
// 						</DropdownMenu>
// 					</DropdownMenuGroup>
// 					<DropdownMenuSeparator />
// 					<DropdownMenuItem onClick={() => signOut()}>
// 						<LogOut className="mr-2 h-4 w-4" />
// 						<span>Log out</span>
// 						<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
// 					</DropdownMenuItem>
// 				</DropdownMenuContent>
// 			</DropdownMenu>
// 		</>
// 	);
// };

// export default UserMenu;

"use client";

import { useUser, useClerk } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";
import { Skeleton } from "../ui/skeleton";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	LogOutIcon,
	MoonIcon,
	SettingsIcon,
	SunIcon,
	SunMoonIcon,
	SunSnowIcon,
	UserIcon,
} from "lucide-react";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordionMenu";
import { useTheme } from "next-themes";

const UserMenu = () => {
	const { user } = useUser();
	const { signOut, openUserProfile } = useClerk();
	const { setTheme, theme } = useTheme();
	const [selectedTheme, setSelectedTheme] = React.useState(theme);

	const handleThemeChange = (theme: string) => {
		setTheme(theme);
		setSelectedTheme(theme);
	};

	return (
		<>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="cursor-pointer select-none w-8 h-8">
						<AvatarImage
							src={user?.hasImage ? user?.imageUrl : ""}
							alt={user?.firstName?.toString()}
							loading="lazy"
							draggable={false}
						/>
						<AvatarFallback className="relative">
							{!user && (
								<Skeleton className="h-12 w-12 rounded-full absolute bg-black/15 dark:bg-white/20 duration-1000" />
							)}
							{user && user?.firstName?.charAt(0)}
							{user && user?.lastName?.charAt(0)}
						</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				{user && (
					<DropdownMenuContent className="w-44">
						<DropdownMenuLabel>My Account</DropdownMenuLabel>
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={() => openUserProfile()}>
								<SettingsIcon className="mr-2 h-4 w-4" />
								<span>Settings</span>
								<DropdownMenuShortcut>⇧⌘S</DropdownMenuShortcut>
							</DropdownMenuItem>
							<Accordion
								type="single"
								collapsible
								className="w-full"
							>
								<AccordionItem
									value="item-1"
									className="border-0"
								>
									<DropdownMenuItem
										className="p-0"
										onClick={(e) => e.preventDefault()}
									>
										<AccordionTrigger className="p-0 px-2 h-8 hover:no-underline rounded-sm w-[166px]">
											<div>
												<SunMoonIcon className="mr-2 h-4 w-4" />
											</div>
											<span>Appearance</span>
											<DropdownMenuShortcut></DropdownMenuShortcut>
										</AccordionTrigger>
									</DropdownMenuItem>
									<AccordionContent className="p-0">
										<DropdownMenuSeparator />
										<DropdownMenuItem
											onClick={(e) => {
												e.preventDefault();
												handleThemeChange("light");
											}}
											className={`py-1 ${
												selectedTheme === "light"
													? "bg-accent text-accent-foreground"
													: ""
											}`}
										>
											<SunIcon className="mr-2 h-4 w-4" />
											<span>Light Mode</span>
											<DropdownMenuShortcut>
												⇧⌘P
											</DropdownMenuShortcut>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={(e) => {
												e.preventDefault();
												handleThemeChange("dark");
											}}
											className={`py-1 ${
												selectedTheme === "dark"
													? "bg-accent text-accent-foreground"
													: ""
											}`}
										>
											<MoonIcon className="mr-2 h-4 w-4" />
											<span>Dark Mode</span>
											<DropdownMenuShortcut>
												⇧⌘P
											</DropdownMenuShortcut>
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={(e) => {
												e.preventDefault();
												handleThemeChange("system");
											}}
											className={`py-1 ${
												selectedTheme === "system"
													? "bg-accent text-accent-foreground"
													: ""
											}`}
										>
											<SunSnowIcon className="mr-2 h-4 w-4" />
											<span>Auto System</span>
											<DropdownMenuShortcut>
												⇧⌘P
											</DropdownMenuShortcut>
										</DropdownMenuItem>
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuItem onClick={() => signOut()}>
							<LogOutIcon className="mr-2 h-4 w-4" />
							<span>Log out</span>
							<DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuContent>
				)}
			</DropdownMenu>
		</>
	);
};

export default UserMenu;
