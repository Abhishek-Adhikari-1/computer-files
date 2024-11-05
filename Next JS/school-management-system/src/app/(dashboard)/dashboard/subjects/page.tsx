import PaginationComp from "@/components/Pagination";
import TableSearch from "@/components/Table/TableSearch";
import { Button } from "@/components/ui/button";
import SubjectsTableList from "@/components/Table/SubjectsTableList";
import {
	ArrowDownWideNarrowIcon,
	PlusIcon,
	SlidersHorizontalIcon,
} from "lucide-react";
import { role } from "@/lib/data";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const SubjectsListPage = () => {
	return (
		<div className="bg-background p-2 md:p-4 flex-1 mt-1 m-2 md:m-4 rounded-md">
			{/* TOP */}
			<div className="flex items-center justify-between">
				<h1 className="hidden md:block text-lg font-semibold">
					All Subjects
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
							<Tooltip>
								<TooltipTrigger asChild>
									<Button
										variant={"secondary"}
										className="p-2 rounded-full w-max h-max"
									>
										<PlusIcon className="w-4 h-4 text-muted-foreground" />
									</Button>
								</TooltipTrigger>
								<TooltipContent>
									<p>Add subjects</p>
								</TooltipContent>
							</Tooltip>
						)}
					</div>
				</div>
			</div>

			{/* LIST */}
			<div>
				<SubjectsTableList />
			</div>

			{/* PAGINATION */}
			<div className="mt-2">
				<PaginationComp />
			</div>
		</div>
	);
};

export default SubjectsListPage;
