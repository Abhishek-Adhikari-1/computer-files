import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { role, subjectsData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { EyeIcon, Trash2Icon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const SubjectsTableList = () => {
	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent border-none">
						<TableHead> Subjects Name</TableHead>
						<TableHead className="hidden sm:table-cell">
							Teachers
						</TableHead>
						<TableHead className="text-center w-28">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{subjectsData.map((subject) => (
						<TableRow
							key={subject?.id}
							className="even:bg-slate-50 dark:even:bg-secondary/40 dark:even:hover:bg-muted/60"
						>
							{/* SUBJECT INFO */}
							<TableCell>
								<div className="flex flex-col justify-center">
									<span>{subject?.name}</span>
								</div>
							</TableCell>

							{/* TEACHER NAME */}
							<TableCell className="hidden sm:table-cell">
								<div className="flex flex-row">
									{subject?.teachers?.map(
										(teacher, index) => (
											<div key={teacher?.name + index}>
												<a
													
													href={`/dashboard/teachers?query=${teacher?.teacherId}`}
												>
													{teacher?.name}
												</a>
												{index !==
													subject.teachers.length -
														1 && <>,&nbsp;</>}
											</div>
										)
									)}
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

export default SubjectsTableList;
