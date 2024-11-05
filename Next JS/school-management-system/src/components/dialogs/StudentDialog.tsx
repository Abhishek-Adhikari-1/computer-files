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
import { areArraysEqual } from "./TeacherDialog";

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

export interface StudentFormState {
	name: string;
	email: string;
	phone: string;
	address: string;
	grade: string;
	class: string;
	photo: string;
	dob: string;
}

export interface StudentState {
	id: number;
	studentId: string;
	name: string;
	photo: string;
	email: string;
	phone: string;
	grade: string;
	class: string;
	address: string;
	dob: string;
}

interface StudentDialogProps {
	preventOutside?: boolean;
	isOpen: IsOpenState;
	formState: StudentFormState;
	setIsOpen: React.Dispatch<React.SetStateAction<IsOpenState>>;
	setFormState: React.Dispatch<React.SetStateAction<StudentFormState>>;
	selectedStudent?: StudentState;
}

const StudentsDialog = ({
	preventOutside = true,
	isOpen,
	setIsOpen,
	formState,
	setFormState,
	selectedStudent,
}: StudentDialogProps) => {
	// const [selectedStudent, setSelectedStudent] = useState({} as StudentState);
	// const [formState, setFormState] = useState<FormState>({
	// 	name: "",
	// 	email: "",
	// 	phone: "",
	// 	address: "",
	// 	grade: "",
	// 	class: "",
	// 	photo: "",
	// 	dob: "",
	// });
	const fileInputRef = useRef<HTMLInputElement>(null);

	console.log(formState);

	const handleFormDataChange =
		(field: keyof typeof formState) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setFormState({ ...formState, [field]: e.target.value });
		};

	useEffect(() => console.log(formState), [formState]);

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
						? "Add New Student"
						: `Student Details : Id (${selectedStudent?.studentId})`}

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
							Use a permanent address where students can receive
							mail.
						</span>
					)}
				</DialogDescription>
			</DialogHeader>
			<div className="mt-3 overflow-auto p-2 max-h-[300px] scrollbar-none hover:scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thumb-rounded">
				<div className="grid gap-2">
					<div className="grid gap-2 grid-cols-1 min-[500px]:grid-cols-2 items-center">
						<div className="flex space-x-3">
							<div className="relative size-14">
								<svg
									className="size-full -rotate-90"
									viewBox="0 0 36 36"
									xmlns="http://www.w3.org/2000/svg"
								>
									<circle
										cx="18"
										cy="18"
										r="16"
										fill="none"
										className="stroke-current text-gray-200/80 dark:text-neutral-800/80"
										strokeWidth="2"
									></circle>
									<circle
										cx="18"
										cy="18"
										r="16"
										fill="none"
										className="stroke-current text-slate-500 dark:text-slate-500 progress-circle"
										strokeWidth="2"
										strokeDasharray="100"
										strokeDashoffset="0"
										strokeLinecap="round"
									></circle>
								</svg>
								<Avatar className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
									<AvatarImage
										src={formState?.photo}
										alt=""
										className="h-10 w-10 rounded-full object-cover select-none"
									/>
									<AvatarFallback className="select-none">
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
							</div>

							<div>
								<Button
									title={
										isOpen.dialog.type === "create"
											? "Add Profile Picture"
											: "Change Profile Picture"
									}
									type="button"
									variant={"outline"}
									{...(isOpen.editMode && {
										onClick: () =>
											fileInputRef?.current?.click(),
									})}
									className="select-none aria-readonly:text-zinc-500 aria-readonly:hover:text-zinc-500 dark:aria-readonly:text-zinc-400"
									aria-readonly={!isOpen.editMode}
								>
									{isOpen.dialog.type === "create"
										? "Add Profile"
										: "Change Avatar"}
								</Button>
								<p className="mt-1 text-xs text-muted-foreground">
									JPG, JPEG, PNG or GIF.
								</p>
								<input
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
												event.target.files?.[0];
											if (file) {
												const reader = new FileReader();
												reader.onloadend = () => {
													setFormState({
														...formState,
														photo: reader.result as string,
													});
												};
												reader.readAsDataURL(file);
											}
										},
									})}
								/>
							</div>
						</div>
						<div>
							<div className="label">Full Name</div>
							<Input
								id="full-name"
								type="text"
								value={formState?.name || ""}
								required
								placeholder={
									isOpen.dialog.type === "update"
										? selectedStudent?.name
										: "Eg: Abhishek Adhikari"
								}
								onChange={handleFormDataChange("name")}
								className="read-only:text-zinc-500 dark:read-only:text-zinc-400"
								readOnly={!isOpen.editMode}
							/>
						</div>
					</div>
					<div className="grid gap-3 grid-cols-1 min-[500px]:grid-cols-2">
						<div className="grid">
							<div className="label">Email</div>
							<Input
								id="email"
								type="email"
								value={formState?.email || ""}
								onChange={handleFormDataChange("email")}
								required
								placeholder={
									isOpen.dialog.type === "update"
										? selectedStudent?.email
										: "example123@gmail.com"
								}
								className="read-only:text-zinc-500 dark:read-only:text-zinc-400"
								readOnly={!isOpen.editMode}
							/>
						</div>
						<div className="grid">
							<div className="label">Phone</div>
							<Input
								id="phone"
								type="number"
								value={formState?.phone || ""}
								onChange={handleFormDataChange("phone")}
								required
								placeholder={
									isOpen.dialog.type === "update"
										? selectedStudent?.phone
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
								{/* {!isOpen.editMode &&
									formState?.classes.length <= 0 && (
										<span className="text-muted-foreground text-sm">
											N/A
										</span>
									)}
								{formState?.classes.map((c, i) => (
									<>
										{c.trim() !== "" && (
											<Badge
												variant={"secondary"}
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
																setFormState({
																	...formState,
																	classes:
																		formState.classes.filter(
																			(
																				cls
																			) =>
																				cls !==
																				c
																		),
																});
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
									onOpenChange={(state: boolean) => {
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
											id="classes-options"
											type="text"
											autoComplete="off"
											className="border-none w-full focus-visible:ring-0 h-full min-h-9 shadow-none"
											placeholder="Add classes..."
											value={""}
											onChange={() => {}}
											readOnly={!isOpen.editMode}
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
															setFormState({
																...formState,
																classes:
																	allClasses,
															})
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
																onSelect={(e) =>
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
																key={`${
																	cls + i
																}`}
																value={cls}
															>
																{cls}
															</CommandItem>
														)
													)}
												</CommandGroup>
											</CommandList>
										</Command>
									</PopoverContent>
								</Popover>
							)} */}
							</div>
						</div>
						<div className="grid gap-3 grid-cols-1 min-[500px]:grid-cols-2 items-start">
							<div className="grid">
								<div className="label">Subjects</div>
								<div className="flex flex-col border space-x-1 px-2 rounded-md min-h-9">
									<div className="flex flex-row items-center space-x-2 max-w-full sm:max-w-[100%] flex-wrap flex-grow">
										{/* {!isOpen.editMode &&
										formState?.subjects.length <= 0 && (
											<span className="text-muted-foreground text-sm">
												N/A
											</span>
										)}
									{formState?.subjects.map((s, i) => (
										<>
											{s.trim() !== "" && (
												<Badge
													variant={"secondary"}
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
															size={14}
														/>
													</span>
												</Badge>
											)}
										</>
									))} */}
									</div>
									{isOpen.editMode && (
										<Popover
											open={isOpen.popoverSubjects}
											onOpenChange={(state: boolean) => {
												setIsOpen((prevState) => ({
													...prevState,
													popoverSubjects: state,
												}));
											}}
											modal={true}
										>
											<PopoverTrigger
												asChild
												className="w-full px-0 h-9 py-1 focus:bg-transparent focus:text-foreground data-[state=open]:bg-transparent data-[state=open]:text-foreground"
											>
												<Input
													id="subjects-options"
													type="text"
													autoComplete="off"
													className="border-none w-full focus-visible:ring-0 h-full min-h-9"
													placeholder="Add subjects..."
													value={""}
													onChange={() => {}}
													readOnly={!isOpen.editMode}
												/>
											</PopoverTrigger>
											{/* <PopoverContent
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
														No class found.
													</CommandEmpty>
													<CommandGroup className="max-h-[250px] h-full overflow-auto scrollbar-none hover:scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 scrollbar-track-transparent scrollbar-thumb-rounded">
														{allSubjects.map(
															(sub, i) => (
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
																	key={`${
																		sub + i
																	}`}
																	value={sub}
																>
																	{sub}
																</CommandItem>
															)
														)}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent> */}
										</Popover>
									)}
								</div>
							</div>
							<div className="grid">
								<div className="label">Address</div>
								<Input
									id="address"
									type="address"
									value={formState?.address || ""}
									onChange={handleFormDataChange("address")}
									required
									placeholder={
										isOpen.dialog.type === "update"
											? selectedStudent?.address
											: "Eg: 123 Main St, Downtown, USA"
									}
									className="read-only:text-zinc-500 dark:read-only:text-zinc-400"
									readOnly={!isOpen.editMode}
								/>
							</div>
						</div>
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
								// formState.classes.length > 0 ||
								// formState.subjects.length > 0 ||
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
											photo: "",
											dob: "",
											class: "",
											grade: "",
										});
									}}
								>
									Cancel
								</Button>
							)}
						<Button
							type="button"
							variant="default"
							className="mb-2 sm:mb-0 select-none"
							disabled={
								formState?.name.trim() === "" ||
								formState?.email.trim() === "" ||
								formState?.phone.trim() === "" ||
								formState?.address === "" ||
								formState.class.trim() === "" ||
								formState.grade.trim() === "" ||
								formState?.photo === ""
							}
						>
							Create Student
						</Button>
					</>
				)}

				{isOpen.dialog.type === "update" && (
					<>
						{isOpen?.editMode &&
							(formState?.name.trim() !== selectedStudent?.name ||
								formState?.email.trim() !==
									selectedStudent?.email ||
								formState?.phone.trim() !==
									selectedStudent?.phone ||
								formState?.address !==
									selectedStudent?.address ||
								formState?.class !== selectedStudent?.class ||
								(formState?.grade !== selectedStudent?.grade &&
									formState?.photo !==
										selectedStudent?.photo)) && (
								<Button
									type="button"
									variant={"secondary"}
									className="bg-red-400/40 hover:bg-red-400/60 text-red-500 dark:hover:bg-red-400/50 select-none"
									onClick={() => {
										setIsOpen((prevState) => ({
											...prevState,
											editMode: false,
										}));
										setFormState({
											name: formState.name,
											email: formState.email,
											phone: formState.phone,
											address: formState.address,
											grade: formState.grade,
											class: formState.class,
											photo: formState.photo,
											dob: formState.dob,
											...selectedStudent,
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
							disabled={
								formState?.name.trim() ===
									selectedStudent?.name &&
								formState?.email.trim() ===
									selectedStudent?.email &&
								formState?.phone.trim() ===
									selectedStudent?.phone &&
								formState?.address ===
									selectedStudent?.address &&
								formState?.class === selectedStudent?.class &&
								formState?.grade === selectedStudent?.grade &&
								formState?.photo === selectedStudent?.photo
							}
						>
							Update Student
						</Button>
					</>
				)}
			</DialogFooter>
		</DialogContent>
	);
};

export default StudentsDialog;
