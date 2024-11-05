"use client";

import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export function Input({
	placeholders = [
		"Placeholder 1",
		"Placeholder 2",
		"Placeholder 3",
		"Placeholder 4",
	],
	formSubmit = false,
	type = "text",
	name,
}: {
	placeholders: string[];
	formSubmit: boolean;
	type?: string;
	name?: string;
}) {
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {};
	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};
	return (
		<PlaceholdersAndVanishInput
			placeholders={placeholders}
			onChange={handleChange}
			onSubmit={onSubmit}
			formSubmit={formSubmit}
			type={type}
			name={name}
		/>
	);
}
