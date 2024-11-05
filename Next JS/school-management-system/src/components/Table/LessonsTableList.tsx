import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { role, lessonsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { EyeIcon, Trash2Icon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const LessonsTableList = () => {
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent border-none">
						<TableHead> Subject Name</TableHead>
						<TableHead className="hidden sm:table-cell">
							Class Name
						</TableHead>
						<TableHead className="hidden sm:table-cell">
							Teacher
						</TableHead>
						<TableHead className="text-center w-28">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{lessonsData.map((lesson) => (
						<TableRow
							key={lesson?.id}
							className="even:bg-slate-50 dark:even:bg-secondary/40 dark:even:hover:bg-muted/60"
						>
							{/* SUBJECT INFO */}
							<TableCell>
								<div className="flex flex-col justify-center">
									<span>{lesson?.subject}</span>
								</div>
							</TableCell>

							{/* CLASS NAME */}
							<TableCell className="hidden sm:table-cell">
								<div className="flex flex-col justify-center">
									<span>{lesson?.class}</span>
								</div>
							</TableCell>

							{/* SUPERVISOR NAME */}
							<TableCell className="hidden sm:table-cell">
								<div className="flex flex-row">
									<span>{lesson?.teacher}</span>
								</div>
							</TableCell>

							{/* ACTIONS */}
							<TableCell>
								<div className="flex gap-2 items-center justify-end">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant={"secondary"}
												className="p-2 rounded-full w-max h-max bg-indigo-100 dark:bg-secondary hover:bg-indigo-200"
											>
												<EyeIcon className="w-4 h-4 text-gray-800 dark:text-gray-300" />
											</Button>
										</TooltipTrigger>
										<TooltipContent>
											<p>View</p>
										</TooltipContent>
									</Tooltip>

									{role === "admin" && (
										<Tooltip>
											<TooltipTrigger asChild>
												<Button
													variant={"destructive"}
													className="p-2 rounded-full w-max h-max"
												>
													<Trash2Icon className="w-4 h-4 text-gray-50 dark:text-gray-200" />
												</Button>
											</TooltipTrigger>
											<TooltipContent>
												<p>Delete</p>
											</TooltipContent>
										</Tooltip>
									)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default LessonsTableList;
