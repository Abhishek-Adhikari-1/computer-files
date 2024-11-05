import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { Separator } from "./ui/separator";

// TEMPORARY
const announcements = [
	{
		id: 1,
		title: "Lorem ipsum dolor",
		date: " 2025-01-01",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 2,
		title: "Lorem ipsum dolorhfgsdjffsajfhjshsdhbfjsdbfhdsbafadsbfjhsdbfsdahfbsdhfbsdhbfsdbfhjsdbfjsdjbfjsdbfshdbfjsdbfjbsdajbfjsbddfjasdfjajdhfjasd",
		date: " 2025-01-01",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
	{
		id: 3,
		title: "Lorem ipsum dolor",
		date: " 2025-01-01",
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
	},
];

const Announcements = () => {
	return (
		<div className="rounded-md shadow bg-card w-full p-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold mb-2">Announcements</h1>
				<Link
					href={"/list/announcements"}
					className="text-xs text-gray-400 cursor-pointer hover:underline select-none"
				>
					View All
				</Link>
			</div>
			<Separator />
			<div className="flex flex-col gap-4 mt-4">
				{announcements.map((announcement) => (
					<Alert
						key={announcement?.id}
						className="hover:shadow-lg dark:hover:shadow-xl dark:hover:shadow-slate-500/15 transition-all duration-300"
					>
						<AlertTitle className="w-full flex justify-between gap-1 md:gap-2">
							<span className="font-semibold leading-none tracking-tight break-all text-zinc-800 dark:text-zinc-200">
								{announcement?.title}
							</span>
							{announcement?.date && (
								<span className="text-[10px] font-[family-name:var(--font-geist-sans)] bg-slate-200/70 dark:bg-zinc-700 px-2 py-1 rounded-full whitespace-nowrap w-max h-max">
									{announcement?.date}
								</span>
							)}
						</AlertTitle>
						<AlertDescription className="text-sm  text-gray-500 dark:text-gray-400 mt-1 text-justify break-all">
							{announcement?.description}
						</AlertDescription>
					</Alert>
				))}
			</div>
		</div>
	);
};

export default Announcements;
