"use client";

import React, { useState } from "react";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";
import TeachersDialog, { IsOpenState } from "./dialogs/TeacherDialog";
import StudentsDialog, { StudentFormState } from "./dialogs/StudentDialog";

interface PropsAddNew {
	tooltipContent: string;
	table: string;
}

const AddNew = ({ tooltipContent, table }: PropsAddNew) => {
	const [isOpen, setIsOpen] = useState<IsOpenState>({
		dialog: {
			isOpen: false,
			type: "create",
		},
		editMode: true,
		popoverClasses: false,
		popoverSubjects: false,
	});
	const [teacherformState, setTeacherFormState] = useState({
		name: "",
		email: "",
		phone: "",
		address: "",
		classes: [] as string[],
		subjects: [] as string[],
		photo: "",
		dob: "",
	});
	const [studentFormState, setStudentFormState] = useState<StudentFormState>({
		name: "",
		email: "",
		phone: "",
		address: "",
		grade: "",
		class: "",
		photo: "",
		dob: "",
	});
	return (
		<Dialog>
			<DialogTrigger asChild>
				<div>
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
							<p>{tooltipContent}</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</DialogTrigger>
			{table === "teachers" && (
				<TeachersDialog
					isOpen={isOpen}
					formState={teacherformState}
					setIsOpen={setIsOpen}
					setFormState={setTeacherFormState}
					preventOutside={false}
				/>
			)}

			{table === "students" && (
				<StudentsDialog
					isOpen={isOpen}
					formState={studentFormState}
					setIsOpen={setIsOpen}
					setFormState={setStudentFormState}
					preventOutside={false}
				/>
			)}
		</Dialog>
	);
};

export default AddNew;
