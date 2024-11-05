"use client";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import React from "react";

const ClerkTheme = ({ children }: { children: React.ReactNode }) => {
	const { resolvedTheme } = useTheme();
	return (
		<ClerkProvider
			appearance={{
				baseTheme: resolvedTheme === "dark" ? dark : undefined,
				layout: {
					socialButtonsPlacement: "bottom",
				},
			}}
		>
			{children}
		</ClerkProvider>
	);
};

export default ClerkTheme;
