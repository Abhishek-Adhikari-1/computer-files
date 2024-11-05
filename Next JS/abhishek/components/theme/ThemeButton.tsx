"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { SunToMoon, MoonToSun } from "./ThemeSvg";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, SunSnow } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export function ThemeButton(props: any) {
	const { setTheme, resolvedTheme } = useTheme();
	const [key, setKey] = React.useState(0);
	const [selectedTheme, setSelectedTheme] = React.useState(resolvedTheme);

	React.useEffect(() => {
		setKey((prevKey) => prevKey + 1);
	}, [resolvedTheme]);

	const handleThemeChange = (theme: string) => {
		setTheme(theme);
		setSelectedTheme(theme);
	};

	return (
		<AnimatePresence>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						size="icon"
						className={`${props?.className} relative w-auto h-auto p-4 rounded-full`}
						style={props?.style}
					>
						<div className="absolute flex justify-center items-center h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-none dark:-rotate-90 dark:scale-0">
							<SunToMoon key={`moon-${key}`} width={"2rem"} />
						</div>
						<div className="absolute flex justify-center items-center h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-none dark:rotate-0 dark:scale-100">
							<MoonToSun key={`sun-${key}`} width={"2rem"} />
						</div>
						<span className="sr-only">Toggle theme</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="end"
					// onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<AnimatePresence>
						{["light", "dark", "system"].map((theme, index) => (
							<motion.div
								key={theme}
								initial={{
									opacity: 0,
									scale: 0.3,
									x: -20,
									filter: "blur(20px)",
								}}
								animate={{
									opacity: 1,
									scale: 1,
									x: 0,
									filter: "blur(0px)",
								}}
								exit={{
									opacity: 0,
									scale: 0.3,
									x: -20,
									filter: "blur(20px)",
								}}
								transition={{
									type: "spring",
									duration: 0.5,
									delay: index * 0.12,
								}}
							>
								<DropdownMenuItem
									onClick={() => handleThemeChange(theme)}
									className={`item ${
										selectedTheme === theme
											? "bg-slate-200/60 dark:bg-slate-700/30"
											: ""
									}`}
								>
									{theme === "light" && (
										<>
											<Sun
												width={"1rem"}
												className="mr-1"
											/>
											Light
										</>
									)}
									{theme === "dark" && (
										<>
											<Moon
												width={"1rem"}
												className="mr-1"
											/>
											Dark
										</>
									)}
									{theme === "system" && (
										<>
											<SunSnow
												width={"1rem"}
												className="mr-1"
											/>
											System
										</>
									)}
								</DropdownMenuItem>
							</motion.div>
						))}
					</AnimatePresence>
				</DropdownMenuContent>
			</DropdownMenu>
		</AnimatePresence>
	);
}
