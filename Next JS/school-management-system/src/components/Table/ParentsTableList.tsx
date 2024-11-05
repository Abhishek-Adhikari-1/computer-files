import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { role, parentsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { EyeIcon, Trash2Icon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const ParentsTableList = () => {
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent border-none">
						<TableHead>Info</TableHead>
						<TableHead className="hidden md:table-cell">
							Student Name
						</TableHead>
						<TableHead className="hidden sm:table-cell">
							Contact
						</TableHead>
						<TableHead className="text-center w-28">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{parentsData.map((parent) => (
						<TableRow
							key={parent?.id}
							className="even:bg-slate-50 dark:even:bg-secondary/40 dark:even:hover:bg-muted/60"
						>
							{/* PARENT INFO */}
							<TableCell>
								<div className="flex flex-col justify-center">
									<span className="font-semibold">
										{parent?.name}
									</span>
									<span className="text-xs text-slate-500 dark:text-slate-400">
										{parent?.relation}
									</span>
								</div>
							</TableCell>

							{/* STUDENT NAME */}
							<TableCell className="hidden md:table-cell">
								{parent?.students?.map((student, index) => (
									<div key={student?.name + index}>
										<a
											href={`/dashboard/students?query=${student?.studentId}`}
										>
											{student?.name}
										</a>
										{index !==
											parent.students.length - 1 && (
											<>, </>
										)}
									</div>
								))}
							</TableCell>

							{/* PARENT CONTACT */}
							<TableCell className="hidden sm:table-cell">
								<div className="flex flex-col">
									<span className="font-semibold">
										{parent?.phone}
									</span>
									<span className="text-xs text-slate-500 dark:text-slate-400">
										{parent?.email}
									</span>
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
				{/* <TableFooter>
					<TableRow>
						<TableCell colSpan={5}>Total</TableCell>
						<TableCell className="text-right">$2,500.00</TableCell>
					</TableRow>
				</TableFooter> */}
			</Table>
		</>
	);
};

export default ParentsTableList;
