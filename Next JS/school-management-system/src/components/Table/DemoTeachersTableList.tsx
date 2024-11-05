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
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
	EyeIcon,
	Phone,
	SearchIcon,
	SquarePenIcon,
	Trash2Icon,
	XIcon,
} from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "../ui/menubar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Separator } from "../ui/separator";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";

const allClasses = [
	"1A",
	"1B",
	"2A",
	"2B",
	"2C",
	"2D",
	"3A",
	"3B",
	"3C",
	"3D",
	"3E",
	"3F",
	"3G",
	"4A",
	"4B",
	"5A",
	"5B",
	"5C",
	"5D",
	"6A",
	"6B",
	"6C",
	"6D",
	"6E",
	"6F",
	"6G",
	"7A",
	"7B",
	"7C",
	"7D",
	"7E",
	"8A",
	"8B",
	"8C",
	"8D",
	"8E",
	"8F",
	"8G",
	"9A",
	"9B",
	"9C",
	"10A",
	"10B",
	"10C",
	"10D",
];

const TeachersTableList = () => {
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [isPopoverOpen, setIsPopoverOpen] = useState(false);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedTeacher, setSelectedTeacher] = useState(null);
	const [formState, setFormState] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		classes: [""],
		subjects: [""],
		photo: "",
	});

	const handleFormDataChange =
		(field: keyof typeof formState) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormState({ ...formState, [field]: e.target.value });
		};

	useEffect(() => {
		console.log("Updated formState: ", formState);
	}, [formState]);

	const handleViewClick = (teacher: any) => {
		setSelectedTeacher(teacher);
		setIsDialogOpen(true);
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
							key={teacher?.id}
							className="even:bg-slate-50 dark:even:bg-secondary/40 dark:even:hover:bg-muted/60"
						>
							{/* TEACHER INFO */}
							<TableCell>
								<div className="flex flex-row gap-2">
									<Image
										src={teacher.photo}
										alt=""
										width={40}
										height={40}
										className="rounded-full object-cover w10 h-10"
									/>
									<div className="flex flex-col justify-center">
										<span className="font-semibold">
											{teacher?.name}
										</span>
										<span className="text-xs text-slate-500 dark:text-slate-400">
											{teacher?.email}
										</span>
									</div>
								</div>
							</TableCell>

							{/* TEACHER ID */}
							<TableCell className="hidden sm:table-cell">
								{teacher.teacherId}
							</TableCell>

							{/* TEACHER SUBJECTS */}
							<TableCell className="hidden md:table-cell">
								<div className="flex flex-row">
									{teacher?.subjects?.join(", ")}
								</div>
							</TableCell>

							{/* TEACHER CLASSES */}
							<TableCell className="hidden sm:table-cell">
								<div className="flex flex-row">
									{teacher?.classes?.join(", ")}
								</div>
							</TableCell>

							{/* TEACHER PHONE NUMBER */}
							<TableCell className="hidden md:table-cell">
								{teacher.phone}
							</TableCell>

							{/* TEACHER ADDRESS */}
							<TableCell className="hidden md:table-cell">
								<div className="break-all truncate">
									{teacher?.address}
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
													handleViewClick(teacher)
												}
												// onClick={() =>
												// 	setFormState({
												// 		name: teacher?.name,
												// 		email: teacher?.email,
												// 		phone: teacher?.phone,
												// 		address:
												// 			teacher?.address,
												// 		classes:
												// 			teacher?.classes,
												// 		subjects:
												// 			teacher?.subjects,
												// 		photo: teacher?.photo,
												// 	})
												// }
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
			<Dialog
				modal={true}
				onOpenChange={(e) => e === false && setIsEditMode(false)}
			>
				<DialogTrigger asChild>
					<div>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={"secondary"}
									// onClick={() =>
									// 	setFormState({
									// 		name: teacher?.name,
									// 		email: teacher?.email,
									// 		phone: teacher?.phone,
									// 		address: teacher?.address,
									// 		classes: teacher?.classes,
									// 		subjects: teacher?.subjects,
									// 		photo: teacher?.photo,
									// 	})
									// }
									className="p-2 rounded-full w-max h-max bg-indigo-100 dark:bg-secondary hover:bg-indigo-200"
								>
									<EyeIcon className="w-4 h-4 text-gray-800 dark:text-gray-300" />
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>View</p>
							</TooltipContent>
						</Tooltip>
					</div>
				</DialogTrigger>
				<DialogContent className="sm:max-w-lg lg:max-w-2xl 2xl:max-w-4xl px-4">
					<DialogHeader className="px-2">
						<DialogTitle>
							<div className="flex w-[95%] items-center">
								<span className="flex-1">
									{/* {teacher.name}'s Information */}
									Information
								</span>
								<Tooltip>
									<TooltipTrigger asChild>
										<Button
											variant={"secondary"}
											onClick={() =>
												setIsEditMode((prev) => !prev)
											}
											className="p-2 rounded-full w-max h-max bg-indigo-100 dark:bg-secondary hover:bg-indigo-200"
										>
											{isEditMode ? (
												<EyeIcon className="w-4 h-4 text-gray-800 dark:text-gray-300" />
											) : (
												<SquarePenIcon className="w-4 h-4 text-gray-800 dark:text-gray-300" />
											)}
										</Button>
									</TooltipTrigger>
									<TooltipContent>
										<p>
											{isEditMode
												? "Click to View"
												: "Click to Edit"}
										</p>
									</TooltipContent>
								</Tooltip>
							</div>
						</DialogTitle>
						<DialogDescription className="p-0 m-0">
							{isEditMode && (
								<span className="mt-2 text-sm text-muted-foreground">
									Use a permanent address where you can
									receive mail.
								</span>
							)}
						</DialogDescription>
					</DialogHeader>
					<div className="overflow-auto p-2 max-h-[300px] scrollbar-none hover:scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thumb-rounded">
						<div className="grid gap-2">
							<div className="grid gap-2 grid-cols-1 min-[500px]:grid-cols-2">
								<div className="flex space-x-3">
									<Image
										src={formState.photo}
										alt=""
										width={40}
										height={40}
										className="h-10 w-10 rounded-full object-cover select-none ring-[3px] ring-gray-500 dark:ring-gray-600 ring-offset-2 ring-offset-background"
										draggable={false}
									/>
									<div>
										<Button
											type="button"
											// onClick={
											// 	handleButtonClick
											// }
											// disabled={
											// 	formChangeLoading
											// }
											variant={"outline"}
										>
											Change avatar
										</Button>
										<p className="mt-1 text-xs text-muted-foreground">
											JPG, JPEG, PNG or GIF.
										</p>
										<input
											type="file"
											id="avatar-input"
											name="profilePic"
											// ref={
											// 	fileInputRef
											// }
											className="hidden"
											accept="image/*"
											hidden={true}
											// disabled={
											// 	formChangeLoading
											// }
											// onChange={(
											// 	event
											// ) => {
											// 	const file =
											// 		event
											// 			.target
											// 			.files[0];
											// 	if (file) {
											// 		const reader =
											// 			new FileReader();
											// 		reader.onloadend =
											// 			() => {
											// 				setFormData(
											// 					{
											// 						...formData,
											// 						image: file,
											// 						imageUrl:
											// 							reader.result,
											// 					}
											// 				);
											// 			};
											// 		reader.readAsDataURL(
											// 			file
											// 		);
											// 	}
											// }}
										/>
									</div>
								</div>
								<div>
									<div className="label">Full Name</div>
									<Input
										id="full-name"
										type="text"
										// placeholder={teacher?.name}
										value={formState?.name}
										onChange={handleFormDataChange("name")}
										required
										readOnly={isEditMode ? false : true}
									/>
								</div>
							</div>
							<div className="grid gap-3 grid-cols-1 min-[500px]:grid-cols-2">
								<div className="grid">
									<div className="label">Email</div>
									<Input
										id="email"
										type="email"
										// placeholder={teacher?.email}
										value={formState?.email}
										onChange={handleFormDataChange("email")}
										required
										readOnly={isEditMode ? false : true}
									/>
								</div>
								<div className="grid">
									<div className="label">Phone</div>
									<Input
										id="phone"
										type="number"
										// placeholder={teacher?.phone}
										value={formState?.phone}
										onChange={handleFormDataChange("phone")}
										required
										readOnly={isEditMode ? false : true}
									/>
								</div>
							</div>
							<div className="grid">
								<div className="label">Classes</div>
								<div className="flex flex-col border space-x-1 px-2 rounded-md">
									<div className="flex flex-row items-center space-x-2 max-w-full sm:max-w-[100%] flex-wrap flex-grow">
										{formState?.classes.map((c, i) => (
											<Badge
												variant={"secondary"}
												className="h-max w-max relative pr-5 pl-1 select-none my-1"
												key={c + i}
											>
												{c}
												<XIcon
													onClick={() => {
														if (isEditMode) {
															setFormState({
																...formState,
																classes:
																	formState.classes.filter(
																		(cls) =>
																			cls !==
																			c
																	),
															});
														}
													}}
													size={14}
													className="absolute right-[2px] cursor-pointer rounded-full"
												/>
											</Badge>
										))}
									</div>
									<Popover
										open={isPopoverOpen}
										onOpenChange={setIsPopoverOpen}
										modal={true}
									>
										<PopoverTrigger
											asChild
											className="w-full px-0 h-9 py-1 focus:bg-transparent focus:text-foreground data-[state=open]:bg-transparent data-[state=open]:text-foreground"
										>
											<Input
												id="classes"
												type="text"
												autoComplete="off"
												className="border-none w-full focus-visible:ring-0 h-full min-h-9"
												placeholder="Add classes..."
												required
												readOnly={
													isEditMode ? false : true
												}
											/>
										</PopoverTrigger>
										{isEditMode && (
											<PopoverContent
												align="start"
												className="p-2 px-3"
											>
												<Command>
													<CommandInput
														placeholder="Search class..."
														className="h-9"
														tabIndex={1}
													/>
													<CommandList>
														<CommandEmpty>
															No class found.
														</CommandEmpty>
														<CommandGroup className="max-h-[250px] h-full overflow-auto scrollbar-none hover:scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thumb-rounded">
															<CommandItem
																onSelect={() =>
																	setFormState(
																		{
																			...formState,
																			classes:
																				allClasses,
																		}
																	)
																}
																disabled={areArraysEqual(
																	formState.classes,
																	allClasses
																)}
																value="all"
															>
																All
															</CommandItem>
															{allClasses.map(
																(cls, i) => (
																	<CommandItem
																		onSelect={(
																			e
																		) =>
																			setFormState(
																				{
																					...formState,
																					classes:
																						[
																							...formState.classes,
																							e as string,
																						],
																				}
																			)
																		}
																		disabled={formState.classes.includes(
																			cls
																		)}
																		key={
																			cls +
																			i
																		}
																		value={
																			cls
																		}
																	>
																		{cls}
																	</CommandItem>
																)
															)}
														</CommandGroup>
													</CommandList>
												</Command>
											</PopoverContent>
										)}
									</Popover>
								</div>
							</div>

							<Button type="submit" className="w-full">
								Create an account
							</Button>
							<Button variant="outline" className="w-full">
								Sign up with GitHub
							</Button>
						</div>
						<div className="mt-4 text-center text-sm">
							Already have an account?{" "}
							<a href="#" className="underline">
								Sign in
							</a>
						</div>
					</div>
					{isEditMode && (
						// (formState.name !== teacher.name ||
						// 	formState.email !== teacher.email ||
						// 	formState.phone !== teacher.phone ||
						// 	!areArraysEqual(
						// 		formState.classes,
						// 		teacher.classes
						// 	)) && (
						<DialogFooter>
							<Button
								type="button"
								variant={"secondary"}
								className="bg-red-400/40 hover:bg-red-400/60 text-red-500 dark:hover:bg-red-400/50"
								onClick={() => {
									setIsEditMode(false);
									// setFormState({
									// 	name: teacher?.name,
									// 	email: teacher?.email,
									// 	phone: teacher?.phone,
									// 	address: teacher?.address,
									// 	classes: teacher?.classes,
									// 	subjects: teacher?.subjects,
									// 	photo: teacher?.photo,
									// });
								}}
							>
								Cancel
							</Button>
							<Button type="submit">Save changes</Button>
						</DialogFooter>
					)}
				</DialogContent>
			</Dialog>
		</>
	);
};

function areArraysEqual(arr1: string[], arr2: string[]): boolean {
	// If lengths are different, arrays cannot be equal
	if (arr1.length !== arr2.length) return false;

	// Create a Set from arr1
	const set1 = new Set(arr1);

	// Check if every element in arr2 is present in set1
	for (let elem of arr2) {
		if (!set1.has(elem)) return false; // If an element is missing, arrays are not equal
	}

	return true;
}

export default TeachersTableList;
