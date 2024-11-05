"use client";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";

const TableSearch = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const [searchQuery, setSearchQuery] = useState<string>("");

	useEffect(() => {
		const queryValue = searchParams.get("query");
		if (queryValue) {
			setSearchQuery(queryValue);
		}
	}, [searchParams]);

	const handleSearch = (searchValue: string) => {
		setSearchQuery(searchValue);
		router.replace(
			`${window?.location?.pathname}${
				searchValue.trim() && `?search=${searchValue.trim()}`
			}`
		);
	};

	return (
		<div className="hidden md:flex relative flex-1">
			<div className="absolute h-full flex justify-center items-center ml-2 pointer-events-none">
				<SearchIcon className="text-gray-500 dark:text-gray-400 w-5 h-5" />
			</div>
			<Input
				type="search"
				value={searchQuery}
				placeholder="Search..."
				onInput={(event) =>
					handleSearch((event.target as HTMLInputElement).value)
				}
				className="bg-background pl-8 placeholder:select-none rounded-full"
				autoFocus
			/>
		</div>
	);
};

export default TableSearch;
