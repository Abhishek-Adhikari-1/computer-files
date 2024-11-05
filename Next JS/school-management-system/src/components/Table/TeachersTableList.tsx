"use client";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { role, teachersData } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { AlertCircleIcon, EyeIcon, Trash2Icon } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import TeacherDialog, {
	FormState,
	IsOpenState,
	TeacherState,
} from "../dialogs/TeacherDialog";

const TeachersTableList = () => {
	// const fileInputRef = useRef<HTMLInputElement>(null);
	const [isOpen, setIsOpen] = useState<IsOpenState>({
		dialog: {
			isOpen: false,
			type: "update",
		},
		dialogContent: "",
		editMode: false,
		popoverClasses: false,
		popoverSubjects: false,
	});
	const [selectedTeacher, setSelectedTeacher] = useState({} as TeacherState);
	const [formState, setFormState] = useState<FormState>({
		name: "",
		email: "",
		phone: "",
		address: "",
		classes: [] as string[],
		subjects: [] as string[],
		photo: "",
		dob: "",
	});

	const handleViewClick = (teacher: TeacherState, mode: string) => {
		setSelectedTeacher(teacher);
		if (mode === "view") {
			setFormState({
				name: teacher.name,
				email: teacher.email,
				phone: teacher.phone,
				address: teacher.address,
				classes: teacher.classes,
				subjects: teacher.subjects,
				photo: teacher.photo,
				dob: teacher.dob,
			});
		}
		setIsOpen((prevState) => ({
			...prevState,
			dialog: {
				...prevState.dialog,
				isOpen: true,
			},
			dialogContent: mode,
		}));
	};

	return (
		<>
			<Table>
				<TableHeader>
					<TableRow className="hover:bg-transparent border-none">
						<TableHead>Info</TableHead>
						<TableHead className="hidden sm:table-cell">
							Teacher Id
						</TableHead>
						<TableHead className="hidden md:table-cell">
							Subjects
						</TableHead>
						<TableHead className="hidden sm:table-cell">
							Classes
						</TableHead>
						<TableHead className="hidden md:table-cell">
							Phone
						</TableHead>
						<TableHead className="hidden md:table-cell w-0">
							Address
						</TableHead>
						<TableHead className="text-center w-28">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{teachersData.map((teacher) => (
						<TableRow
							key={`${teacher.id}-${teacher.teacherId}`}
							className="even:bg-slate-50 dark:even:bg-secondary/40 dark:even:hover:bg-muted/60"
						>
							{/* TEACHER INFO */}
							<TableCell>
								<div className="flex flex-row gap-2">
									<Avatar>
										<AvatarImage
											src={teacher?.photo}
											alt=""
											className="rounded-full object-cover w10 h-10"
										/>
										<AvatarFallback>
											{teacher?.name
												.split(" ")
												.filter((name) => name)
												.slice(0, 3)
												.map((name) =>
													name[0]?.toUpperCase()
												)
												.join("") || "N/A"}
										</AvatarFallback>
									</Avatar>
									<div className="flex flex-col justify-center">
										<span className="font-semibold">
											{teacher?.name || "N/A"}
										</span>
										<span className="text-xs text-slate-500 dark:text-slate-400">
											{teacher?.email || "N/A"}
										</span>
									</div>
								</div>
							</TableCell>

							{/* TEACHER ID */}
							<TableCell className="hidden sm:table-cell">
								{teacher?.teacherId || "N/A"}
							</TableCell>

							{/* TEACHER SUBJECTS */}
							<TableCell className="hidden md:table-cell">
								<div className="flex flex-row">
									{teacher?.subjects?.join(", ") || "N/A"}
								</div>
							</TableCell>

							{/* TEACHER CLASSES */}
							<TableCell className="hidden sm:table-cell">
								<div className="flex flex-row">
									{teacher?.classes?.join(", ") || "N/A"}
								</div>
							</TableCell>

							{/* TEACHER PHONE NUMBER */}
							<TableCell className="hidden md:table-cell">
								{teacher?.phone || "N/A"}
							</TableCell>

							{/* TEACHER ADDRESS */}
							<TableCell className="hidden md:table-cell">
								<div className="break-all truncate">
									{teacher?.address || "N/A"}
								</div>
							</TableCell>

							{/* ACTIONS */}
							<TableCell>
								<div className="flex gap-2 items-center justify-end">
									<Tooltip>
										<TooltipTrigger asChild>
											<Button
												variant={"secondary"}
												onClick={() =>
													handleViewClick(
														teacher,
														"view"
													)
												}
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
													onClick={() =>
														handleViewClick(
															teacher,
															"delete"
														)
													}
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
			<Dialog
				open={isOpen.dialog.isOpen}
				onOpenChange={(state: boolean) => {
					setIsOpen((prevState) => ({
						...prevState,
						dialog: {
							...prevState.dialog,
							isOpen: state,
						},
						editMode: false,
					}));
				}}
			>
				{isOpen.dialogContent === "delete" && (
					<DialogContent className="max-w-[95%] sm:max-w-lg gap-0">
						<DialogHeader className="px-2">
							<DialogTitle>
								<div className="flex flex-row items-center text-destructive dark:text-red-500">
									<AlertCircleIcon className="mr-2 h-5 w-5" />
									Delete User: {selectedTeacher?.name}
								</div>
							</DialogTitle>
							<DialogDescription className="text-base text-justify">
								Are you sure you want to delete this user? This
								action cannot be undone and will result in the
								permanent removal of the user&apos;s account and
								all associated data.
							</DialogDescription>
						</DialogHeader>
						<div className="mt-4 rounded-md bg-red-200/70 dark:bg-red-700/25 pl-4 pr-3 pt-2 pb-3 text-gray-700 dark:text-gray-200">
							<h3 className="mb-0 font-semibold text-destructive dark:text-red-600">
								Warning:
							</h3>
							<ul className="list-inside list-disc text-[13px] break-all">
								<li>
									Teacher ID: {selectedTeacher?.teacherId}
								</li>
								<li>User Email: {selectedTeacher?.email}</li>
								<li>
									All user data will be permanently erased
								</li>
								<li>
									User&apos;s posts, comments, and
									interactions will be remove
								</li>
								<li>
									Any subscriptions or paid features will be
									cancelled
								</li>
								<li>This action is irreversible</li>
							</ul>
						</div>
						<DialogFooter className="mt-4">
							<DialogClose asChild>
								<Button type="button" variant="outline">
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="button"
								variant="destructive"
								className="mb-2 sm:mb-0"
								// onClick={handleDelete}
							>
								Delete User
							</Button>
						</DialogFooter>
					</DialogContent>
				)}
				{isOpen.dialogContent === "view" && (
					<TeacherDialog
						formState={formState}
						isOpen={isOpen}
						setFormState={setFormState}
						setIsOpen={setIsOpen}
						selectedTeacher={selectedTeacher}
					/>
				)}
			</Dialog>
		</>
	);
};

export default TeachersTableList;
