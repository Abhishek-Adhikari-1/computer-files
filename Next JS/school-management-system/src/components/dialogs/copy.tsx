"use client";

import { allClasses, allSubjects } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { EyeIcon, SquarePenIcon, XIcon } from "lucide-react";
import {
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "../ui/command";
import { useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "../ui/form";

export interface IsOpenState {
	dialog: {
		isOpen: boolean;
		type: "update" | "create";
	};
	dialogContent?: string | undefined;
	editMode?: boolean;
	popoverClasses: boolean;
	popoverSubjects: boolean;
}

export interface FormState {
	name: string;
	email: string;
	phone: string;
	address: string;
	classes: string[];
	subjects: string[];
	photo: string;
	dob: string;
}

export interface TeacherState {
	id: number;
	teacherId: string;
	name: string;
	email: string;
	photo: string;
	phone: string;
	subjects: string[];
	classes: string[];
	address: string;
	dob: string;
}

interface TeacherDialogProps {
	preventOutside?: boolean;
	isOpen: IsOpenState;
	formState: FormState;
	setIsOpen: React.Dispatch<React.SetStateAction<IsOpenState>>;
	setFormState: React.Dispatch<React.SetStateAction<FormState>>;
	selectedTeacher?: TeacherState;
}

const formSchema = z.object({
	fullName: z
		.string()
		.min(3, { message: "Name must be at least 3 characters" }),
	email: z.string().email({ message: "Invalid email address!" }),
	phone: z.string().min(10, { message: "Invalid phone number!" }),
	address: z.string().min(3, { message: "Enter correct address." }),
	dob: z.string().min(3, { message: "Enter correct date of birth." }),
	// dob: z.date({ message: "Enter correct date of birth." }),
	photo: z.string().url({ message: "Invalid photo URL." }),
	subjects: z
		.array(z.string())
		.min(1, { message: "Select at least one subject." }),
	classes: z
		.array(z.string())
		.min(1, { message: "Select at least one class." }),
});

const TeacherDialog = ({
	preventOutside = true,
	isOpen,
	formState,
	setIsOpen,
	setFormState,
	selectedTeacher,
}: TeacherDialogProps) => {
	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors },
	// } = useForm({
	// 	resolver: zodResolver(schema),
	// });

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			fullName: formState.name,
			email: formState.email,
			phone: formState.phone,
			dob: formState.dob,
			photo: formState.photo,
			subjects: formState.subjects,
			address: formState.address,
		},
	});
	useEffect(() => {
		if (isOpen.dialog.isOpen) {
			form.reset({
				fullName: formState.name,
				email: formState.email,
				phone: formState.phone,
				dob: formState.dob,
				photo: formState.photo,
				subjects: formState.subjects,
				address: formState.address,
			});
		}
	}, [formState, isOpen.dialog.isOpen, form]);

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
	}
	const { getValues } = form;
	const fullNameValue = getValues("fullName");
	useEffect(() => {
		if (fullNameValue) {
			setFormState({
				...formState,
				name: fullNameValue,
			});
		}
	}, [fullNameValue]);
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFormDataChange =
		(field: keyof typeof formState) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormState({ ...formState, [field]: e.target.value });
		};

	return (
		<DialogContent
			className="max-w-[95%] sm:max-w-lg lg:max-w-2xl 2xl:max-w-4xl p-3 py-4 gap-0"
			{...(preventOutside && {
				onInteractOutside: (e) => e.preventDefault(),
			})}
		>
			<DialogHeader className="px-2">
				<DialogTitle className="flex flex-1 items-center justify-between">
					{isOpen.dialog.type === "create"
						? "Add New Teacher"
						: `Teacher Details : Id (${selectedTeacher?.teacherId})`}

					{isOpen.dialog.type === "update" && (
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={"secondary"}
									onClick={() =>
										setIsOpen((prevState) => ({
											...prevState,
											editMode: !prevState.editMode,
										}))
									}
									className="p-2 mr-6 rounded-full w-max h-max bg-indigo-100 dark:bg-secondary hover:bg-indigo-200"
								>
									{isOpen.editMode ? (
										<EyeIcon className="w-4 h-4 text-gray-800 dark:text-gray-300" />
									) : (
										<SquarePenIcon className="w-4 h-4 text-gray-800 dark:text-gray-300" />
									)}
								</Button>
							</TooltipTrigger>
							<TooltipContent>
								<p>
									{isOpen.editMode
										? "Click to View"
										: "Click to Edit"}
								</p>
							</TooltipContent>
						</Tooltip>
					)}
				</DialogTitle>
				<DialogDescription>
					{isOpen.editMode && (
						<span className="text-sm leading-none text-muted-foreground">
							Use a permanent address where you can receive mail.
						</span>
					)}
				</DialogDescription>
			</DialogHeader>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div>
						<div className="mt-3 overflow-auto p-2 max-h-[300px] scrollbar-none hover:scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thumb-rounded">
							<div className="grid gap-2">
								<div className="grid gap-2 grid-cols-1 min-[500px]:grid-cols-2 items-center">
									<div className="flex space-x-3">
										<Avatar>
											<AvatarImage
												src={formState?.photo}
												alt=""
												className="h-10 w-10 rounded-full object-cover select-none ring-[3px] ring-gray-500 dark:ring-gray-600 ring-offset-2 ring-offset-background"
											/>
											<AvatarFallback>
												{formState?.name
													.split(" ")
													.filter((name) => name)
													.slice(0, 3)
													.map((name) =>
														name[0]?.toUpperCase()
													)
													.join("") || "N/A"}
											</AvatarFallback>
										</Avatar>
										<div>
											<Button
												title={
													isOpen.dialog.type ===
													"create"
														? "Add Profile Picture"
														: "Change Profile Picture"
												}
												type="button"
												variant={"outline"}
												{...(isOpen.editMode && {
													onClick: () =>
														fileInputRef?.current?.click(),
												})}
												className="aria-readonly:text-zinc-500 aria-readonly:hover:text-zinc-500 dark:aria-readonly:text-zinc-400 select-none"
												aria-readonly={!isOpen.editMode}
											>
												{isOpen.dialog.type === "create"
													? "Add Profile"
													: "Change Avatar"}
											</Button>
											<p className="mt-1 text-xs text-muted-foreground">
												JPG, JPEG, PNG or GIF.
											</p>
											<Input
												type="file"
												id="avatar-input"
												name="profilePic"
												className="hidden"
												ref={fileInputRef}
												accept="image/*"
												hidden={true}
												{...(isOpen.editMode && {
													onChange: (
														event: React.ChangeEvent<HTMLInputElement>
													) => {
														const file =
															event.target
																.files?.[0];
														if (file) {
															const reader =
																new FileReader();
															reader.onloadend =
																() => {
																	setFormState(
																		{
																			...formState,
																			photo: reader.result as string,
																		}
																	);
																};
															reader.readAsDataURL(
																file
															);
														}
													},
												})}
											/>
										</div>
									</div>
									<FormField
										control={form.control}
										name="fullName"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="label m-0">
													Full Name
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id="fullName"
														placeholder={
															isOpen.dialog
																.type ===
															"update"
																? selectedTeacher?.name
																: "Eg: Abhishek Adhikari"
														}
														className="read-only:text-zinc-500 dark:read-only:text-zinc-400 placeholder:select-none"
														readOnly={
															!isOpen.editMode
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3 grid-cols-1 min-[500px]:grid-cols-2">
									<FormField
										control={form.control}
										name="email"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="label m-0">
													Email
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id="email"
														placeholder={
															isOpen.dialog
																.type ===
															"update"
																? selectedTeacher?.email
																: "example123@gmail.com"
														}
														className="read-only:text-zinc-500 dark:read-only:text-zinc-400 placeholder:select-none"
														readOnly={
															!isOpen.editMode
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="label m-0">
													Phone
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id="phone"
														type="number"
														placeholder={
															isOpen.dialog
																.type ===
															"update"
																? selectedTeacher?.phone
																: "9812345678"
														}
														className="read-only:text-zinc-500 dark:read-only:text-zinc-400 placeholder:select-none"
														readOnly={
															!isOpen.editMode
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
								<div className="grid gap-3 grid-cols-1 min-[500px]:grid-cols-2">
									<div className="grid">
										<div className="label">
											Date of Birth
										</div>
										<Input
											id="dob"
											type="date"
											value={formState?.dob || ""}
											onChange={handleFormDataChange(
												"dob"
											)}
											placeholder={
												isOpen.dialog.type === "update"
													? `${selectedTeacher?.dob}`
													: ""
											}
											className="read-only:text-zinc-500 dark:read-only:text-zinc-400 min-w-full"
											readOnly={!isOpen.editMode}
										/>
									</div>
									<div className="grid">
										<div className="label">Phone</div>
										<Input
											id="phone2"
											type="number"
											value={formState?.phone || ""}
											onChange={handleFormDataChange(
												"phone"
											)}
											placeholder={
												isOpen.dialog.type === "update"
													? selectedTeacher?.phone
													: "9812345678"
											}
											className="read-only:text-zinc-500 dark:read-only:text-zinc-400"
											readOnly={!isOpen.editMode}
										/>
									</div>
								</div>
								<div className="grid">
									<div className="label">Classes</div>
									<div className="flex flex-col border space-x-1 px-2 rounded-md min-h-9">
										<div className="flex flex-row items-center space-x-2 max-w-full sm:max-w-[100%] flex-wrap flex-grow">
											{!isOpen.editMode &&
												formState?.classes.length <=
													0 && (
													<span className="text-muted-foreground text-sm">
														N/A
													</span>
												)}
											{formState?.classes.map((c, i) => (
												<>
													{c.trim() !== "" && (
														<Badge
															variant={
																"secondary"
															}
															className="h-max w-max relative pr-5 pl-1 select-none my-1 text-zinc-600 dark:text-zinc-300"
															key={c + i}
														>
															{c}
															<span
																title={
																	isOpen.editMode
																		? "Delete"
																		: ""
																}
																className={`absolute right-[2px] rounded-full ${
																	isOpen.editMode &&
																	"cursor-pointer"
																}`}
															>
																<XIcon
																	onClick={() => {
																		if (
																			isOpen.editMode
																		) {
																			setFormState(
																				{
																					...formState,
																					classes:
																						formState.classes.filter(
																							(
																								cls
																							) =>
																								cls !==
																								c
																						),
																				}
																			);
																		}
																	}}
																	size={14}
																/>
															</span>
														</Badge>
													)}
												</>
											))}
										</div>
										{isOpen.editMode && (
											<Popover
												open={isOpen.popoverClasses}
												onOpenChange={(
													state: boolean
												) => {
													setIsOpen((prevState) => ({
														...prevState,
														popoverClasses: state,
													}));
												}}
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
														className="border-none w-full focus-visible:ring-0 h-full min-h-9 shadow-none"
														placeholder="Add classes..."
														value={""}
														onChange={() => {}}
														readOnly={
															!isOpen.editMode
														}
													/>
												</PopoverTrigger>
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
																	(
																		cls,
																		i
																	) => (
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
																			{
																				cls
																			}
																		</CommandItem>
																	)
																)}
															</CommandGroup>
														</CommandList>
													</Command>
												</PopoverContent>
											</Popover>
										)}
									</div>
								</div>
								<div className="grid gap-3 grid-cols-1 min-[500px]:grid-cols-2 items-start">
									<div className="grid">
										<div className="label">Subjects</div>
										<div className="flex flex-col border space-x-1 px-2 rounded-md min-h-9">
											<div className="flex flex-row items-center space-x-2 max-w-full sm:max-w-[100%] flex-wrap flex-grow">
												{!isOpen.editMode &&
													formState?.subjects
														.length <= 0 && (
														<span className="text-muted-foreground text-sm">
															N/A
														</span>
													)}
												{formState?.subjects.map(
													(s, i) => (
														<>
															{s.trim() !==
																"" && (
																<Badge
																	variant={
																		"secondary"
																	}
																	className="h-max w-max relative pr-5 pl-1 select-none my-1 text-zinc-600 dark:text-zinc-300"
																	key={s + i}
																>
																	{s}
																	<span
																		title={
																			isOpen.editMode
																				? "Delete"
																				: ""
																		}
																		className={`absolute right-[2px] rounded-full ${
																			isOpen.editMode &&
																			"cursor-pointer"
																		}`}
																	>
																		<XIcon
																			onClick={() => {
																				if (
																					isOpen.editMode
																				) {
																					setFormState(
																						{
																							...formState,
																							subjects:
																								formState.subjects.filter(
																									(
																										sub
																									) =>
																										sub !==
																										s
																								),
																						}
																					);
																				}
																			}}
																			size={
																				14
																			}
																		/>
																	</span>
																</Badge>
															)}
														</>
													)
												)}
											</div>
											{isOpen.editMode && (
												<Popover
													open={
														isOpen.popoverSubjects
													}
													onOpenChange={(
														state: boolean
													) => {
														setIsOpen(
															(prevState) => ({
																...prevState,
																popoverSubjects:
																	state,
															})
														);
													}}
													modal={true}
												>
													<PopoverTrigger
														asChild
														className="w-full px-0 h-9 py-1 focus:bg-transparent focus:text-foreground data-[state=open]:bg-transparent data-[state=open]:text-foreground"
													>
														<Input
															id="subjects"
															type="text"
															autoComplete="off"
															className="border-none w-full focus-visible:ring-0 h-full min-h-9"
															placeholder="Add subjects..."
															value={""}
															onChange={() => {}}
															readOnly={
																!isOpen.editMode
															}
														/>
													</PopoverTrigger>
													<PopoverContent
														align="start"
														className="p-2 px-3"
													>
														<Command>
															<CommandInput
																placeholder="Search subject..."
																className="h-9"
																tabIndex={1}
															/>
															<CommandList>
																<CommandEmpty>
																	No class
																	found.
																</CommandEmpty>
																<CommandGroup className="max-h-[250px] h-full overflow-auto scrollbar-none hover:scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thumb-rounded">
																	{allSubjects.map(
																		(
																			sub,
																			i
																		) => (
																			<CommandItem
																				onSelect={(
																					e
																				) =>
																					setFormState(
																						{
																							...formState,
																							subjects:
																								[
																									...formState.subjects,
																									e as string,
																								],
																						}
																					)
																				}
																				disabled={formState.subjects.includes(
																					sub
																				)}
																				key={
																					sub +
																					i
																				}
																				value={
																					sub
																				}
																			>
																				{
																					sub
																				}
																			</CommandItem>
																		)
																	)}
																</CommandGroup>
															</CommandList>
														</Command>
													</PopoverContent>
												</Popover>
											)}
										</div>
									</div>
									<FormField
										control={form.control}
										name="address"
										render={({ field }) => (
											<FormItem className="space-y-1">
												<FormLabel className="label m-0">
													Address
												</FormLabel>
												<FormControl>
													<Input
														{...field}
														id="address"
														placeholder={
															isOpen.dialog
																.type ===
															"update"
																? selectedTeacher?.address
																: "Eg: 123 Main St, Downtown, USA"
														}
														className="read-only:text-zinc-500 dark:read-only:text-zinc-400 placeholder:select-none"
														readOnly={
															!isOpen.editMode
														}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</div>
						</div>
						<DialogFooter className="mt-4">
							{isOpen.dialog.type === "create" && (
								<>
									{isOpen.editMode &&
										(formState?.name.trim() !== "" ||
											formState?.email.trim() !== "" ||
											formState?.phone.trim() !== "" ||
											formState?.address !== "" ||
											formState.classes.length > 0 ||
											formState.subjects.length > 0 ||
											formState?.photo !== "") && (
											<Button
												type="button"
												variant={"secondary"}
												className="bg-red-400/40 hover:bg-red-400/60 text-red-500 dark:hover:bg-red-400/50 select-none"
												onClick={() => {
													setFormState({
														name: "",
														email: "",
														phone: "",
														address: "",
														classes: [] as string[],
														subjects:
															[] as string[],
														photo: "",
														dob: "",
													});
												}}
											>
												Cancel
											</Button>
										)}
									<Button
										type="submit"
										variant="default"
										className="mb-2 sm:mb-0 select-none"
										// disabled={
										// 	formState?.name.trim() === "" ||
										// 	formState?.email.trim() === "" ||
										// 	formState?.phone.trim() === "" ||
										// 	formState?.address === "" ||
										// 	formState.classes.length <= 0 ||
										// 	formState.subjects.length <= 0 ||
										// 	formState?.photo === ""
										// }
									>
										Create User
									</Button>
								</>
							)}

							{isOpen.dialog.type === "update" && (
								<>
									{isOpen?.editMode &&
										(formState?.name.trim() !==
											selectedTeacher?.name ||
											formState?.email.trim() !==
												selectedTeacher?.email ||
											formState?.phone.trim() !==
												selectedTeacher?.phone ||
											formState?.address !==
												selectedTeacher?.address ||
											!areArraysEqual(
												formState?.classes,
												selectedTeacher?.classes
											) ||
											!areArraysEqual(
												formState?.subjects,
												selectedTeacher?.subjects
											) ||
											formState?.photo !==
												selectedTeacher?.photo) && (
											<Button
												type="button"
												variant={"secondary"}
												className="bg-red-400/40 hover:bg-red-400/60 text-red-500 dark:hover:bg-red-400/50 select-none"
												onClick={() => {
													setIsOpen((prevState) => ({
														...prevState,
														editMode: false,
													}));
													setFormState(
														selectedTeacher
													);
												}}
											>
												Cancel
											</Button>
										)}
									<Button
										type="submit"
										variant="default"
										className="mb-2 sm:mb-0 select-none"
										// disabled={
										// 	formState?.name.trim() ===
										// 		selectedTeacher?.name &&
										// 	formState?.email.trim() ===
										// 		selectedTeacher?.email &&
										// 	formState?.phone.trim() ===
										// 		selectedTeacher?.phone &&
										// 	formState?.address ===
										// 		selectedTeacher?.address &&
										// 	areArraysEqual(
										// 		formState?.classes,
										// 		selectedTeacher?.classes
										// 	) &&
										// 	areArraysEqual(
										// 		formState?.subjects,
										// 		selectedTeacher?.subjects
										// 	) &&
										// 	formState?.photo ===
										// 		selectedTeacher?.photo
										// }
									>
										Update User
									</Button>
								</>
							)}
						</DialogFooter>
					</div>
				</form>
			</Form>
		</DialogContent>
	);
};

export default TeacherDialog;

export function areArraysEqual(arr1: string[], arr2: string[]): boolean {
	if (arr1.length !== arr2.length) return false;
	const set1 = new Set(arr1);

	for (const elem of arr2) {
		if (!set1.has(elem)) return false;
	}
	return true;
}
