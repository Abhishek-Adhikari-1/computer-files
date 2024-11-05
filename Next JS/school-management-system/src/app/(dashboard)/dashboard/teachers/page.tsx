import PaginationComp from "@/components/Pagination";
import TableSearch from "@/components/Table/TableSearch";
import { Button } from "@/components/ui/button";
import TeachersTableList from "@/components/Table/TeachersTableList";
import { ArrowDownWideNarrowIcon, SlidersHorizontalIcon } from "lucide-react";
import React from "react";
import { role } from "@/lib/data";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import AddNew from "@/components/AddNew";

const TeachersListPage = () => {
	return (
		<div className="bg-background p-2 md:p-4 flex-1 mt-1 m-2 md:m-4 rounded-md">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					All Teachers
				</h1>
				<div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto">
					<TableSearch />
					<div className="flex items-center justify-center gap-3">
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={"secondary"}
									className="p-2 rounded-full w-max h-max"
								>
									<SlidersHorizontalIcon className="w-4 h-4 text-muted-foreground" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Filter</p>
							</TooltipContent>
						</Tooltip>

						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={"secondary"}
									className="p-2 rounded-full w-max h-max"
								>
									<ArrowDownWideNarrowIcon className="w-4 h-4 text-muted-foreground" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>Sort table</p>
							</TooltipContent>
						</Tooltip>

						{role === "admin" && (
							<AddNew
								tooltipContent="Add Teachers"
								table="teachers"
							/>
						)}
					</div>
				</div>
			</div>

			{/* LIST */}
			<div>
				<TeachersTableList />
			</div>

			{/* PAGINATION */}
			<div className="mt-2">
				<PaginationComp />
			</div>
		</div>
	);
};

export default TeachersListPage;
