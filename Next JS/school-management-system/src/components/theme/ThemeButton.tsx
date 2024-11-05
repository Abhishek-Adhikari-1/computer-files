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
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const themeMap = [
	{
		name: "light",
		icon: (
			<>
				<Sun width={"1rem"} className="mr-1" />
				Light
			</>
		),
		cmd: "Ctrl + Alt + L",
	},
	{
		name: "dark",
		icon: (
			<>
				<Moon width={"1rem"} className="mr-1" />
				Dark
			</>
		),
		cmd: "Ctrl + Alt + D",
	},
	{
		name: "system",
		icon: (
			<>
				<SunSnow width={"1rem"} className="mr-1" />
				System
			</>
		),
		cmd: "Ctrl + Alt + S",
	},
];

export function ThemeButton() {
	const { setTheme, resolvedTheme, theme } = useTheme();
	const [key, setKey] = React.useState(0);
	const [selectedTheme, setSelectedTheme] = React.useState(theme);

	React.useEffect(() => {
		setKey((prevKey) => prevKey + 1);
	}, [resolvedTheme]);

	// Add keyboard shortcuts for theme switching
	React.useEffect(() => {
		// Handle theme changes
		const handleThemeChange = (theme: string) => {
			setTheme(theme);
			setSelectedTheme(theme);
		};

		const handleKeyDown = (event: KeyboardEvent) => {
			// Check for Ctrl + Alt + I (Light mode)
			if (event.ctrlKey && event.altKey && event.key === "l") {
				handleThemeChange("light");
			}
			// Check for Ctrl + Alt + D (Dark mode)
			else if (event.ctrlKey && event.altKey && event.key === "d") {
				handleThemeChange("dark");
			}
			// Check for Ctrl + Alt + S (System mode)
			else if (event.ctrlKey && event.altKey && event.key === "s") {
				handleThemeChange("system");
			}
		};

		// Attach event listener for keydown
		window.addEventListener("keydown", handleKeyDown);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [setTheme]);

	const handleThemeChange = (theme: string) => {
		setTheme(theme);
		setSelectedTheme(theme);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="outline"
					size="icon"
					className="relative w-auto h-auto p-4 rounded-full"
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
			<DropdownMenuContent align="end">
				<>
					{themeMap.map((theme) => (
						<div key={theme?.name}>
							<Tooltip>
								<TooltipTrigger asChild>
									<DropdownMenuItem
										onClick={() =>
											handleThemeChange(theme?.name)
										}
										className={`item ${
											theme.name !== "system"
												? "mb-1"
												: ""
										} ${
											selectedTheme === theme?.name
												? "bg-accent dark:bg-accent/70"
												: ""
										}`}
									>
										{theme?.icon}
									</DropdownMenuItem>
								</TooltipTrigger>
								<TooltipContent side="left">
									<p>{theme?.cmd}</p>
								</TooltipContent>
							</Tooltip>
						</div>
					))}
				</>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
