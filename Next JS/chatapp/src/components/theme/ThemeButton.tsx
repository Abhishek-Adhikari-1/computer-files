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

export function ThemeButton() {
	const { setTheme, resolvedTheme, theme } = useTheme();
	const [key, setKey] = React.useState(0);
	const [selectedTheme, setSelectedTheme] = React.useState(theme);

	React.useEffect(() => {
		setKey((prevKey) => prevKey + 1);
	}, [resolvedTheme]);

	const handleThemeChange = (theme: string) => {
		setTheme(theme);
		setSelectedTheme(theme);
	};

	return (
		<div className="absolute top-2 sm:top-3 xl:top-4 right-2 sm:right-3 xl:right-4">
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
				<DropdownMenuContent
					align="end"
					// onCloseAutoFocus={(e) => e.preventDefault()}
				>
					<>
						{["light", "dark", "system"].map((theme, index) => (
							<div key={theme}>
								<DropdownMenuItem
									onClick={() => handleThemeChange(theme)}
									className={`item ${
										selectedTheme === theme
											? "bg-accent dark:bg-accent/70"
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
							</div>
						))}
					</>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
