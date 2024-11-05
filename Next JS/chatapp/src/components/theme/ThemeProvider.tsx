"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
// import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
	// const { resolvedTheme } = useTheme();
	return (
		<NextThemesProvider {...props}>
			{/* <ClerkProvider
				appearance={{
					baseTheme: resolvedTheme === "dark" ? dark : undefined,
					layout: {
						socialButtonsPlacement: "bottom",
					},
				}}
			> */}
				{children}
			{/* </ClerkProvider> */}
		</NextThemesProvider>
	);
}
