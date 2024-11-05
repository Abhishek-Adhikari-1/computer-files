"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import { EllipsisIcon, RocketIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from "./ui/separator";

// TEMPORARY
const events = [
	{
		id: 1,
		icon: <RocketIcon className="h-4 w-4" />,
		title: "Lorem ipsum dolor",
		time: "12:00 PM - 2:00 PM",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 2,
		icon: "",
		title: "Lorem ipsum dolorhfgsdjffsajfhjshdfjasdfjajdhfjasd",
		time: "12:00 PM - 2:00 PM",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 3,
		title: "Lorem ipsum dolor",
		time: "12:00 PM - 2:00 PM",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
];

const EventCalendar = () => {
	const [date, setDate] = React.useState<Date | undefined>(new Date());

	return (
		<div className="rounded-md shadow bg-card w-full">
			<Calendar
				mode="single"
				selected={date}
				onSelect={setDate}
				disabled={{ dayOfWeek: [6] }}
				modifiers={{
					holidays: [
						new Date(2024, 8, 8),
						new Date(2024, 8, 9),
						new Date(2024, 8, 14),
						{
							from: new Date(2024, 8, 23),
							to: new Date(2024, 8, 26),
						},
					],
				}}
			/>
			<div className="px-4 pb-4 overflow-hidden">
				<Separator />
				<div className="flex items-center justify-between">
					<h1 className="text-xl font-semibold my-4">Events</h1>
					<EllipsisIcon className="cursor-pointer text-card-foreground" />
				</div>
				<div className="flex flex-col gap-4">
					{events.map((event) => (
						<Alert
							key={event?.id}
							className="hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-slate-500/15 transition-all duration-300"
						>
							{event?.icon || ""}
							<AlertTitle className="w-full flex flex-col leading-none tracking-tight break-all">
								<span className="text-[10px] font-[family-name:var(--font-geist-sans)] text-neutral-600 dark:text-neutral-200 mb-1 whitespace-nowrap overflow-hidden">
									{event?.time}
								</span>
								<span className="font-semibold text-zinc-800 dark:text-zinc-200">
									{event?.title}
								</span>
							</AlertTitle>
							<AlertDescription className="mt-2 text-justify  break-all text-gray-500 dark:text-gray-400">
								{event?.description}
							</AlertDescription>
						</Alert>
					))}
				</div>
			</div>
		</div>
	);
};

export default EventCalendar;
