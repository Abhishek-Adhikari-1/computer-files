import {
	UsersIcon,
	ArrowUpIcon,
	DocumentTextIcon,
    ChatBubbleBottomCenterTextIcon
} from "@heroicons/react/24/outline";

const data = [
	{
		title: "Total users",
		value: "3.456K",
		icon: (
			<UsersIcon className="text-indigo-500 w-6 h-6 rounded-full bg-indigo-50 ring-8 ring-indigo-50" />
		),
		change: {
			value: "0.43%",
			icon: <ArrowUpIcon className="w-3 h-3" />,
			color: "text-emerald-400",
		},
	},
	{
		title: "Total posts",
		value: "14",
		icon: (
			<DocumentTextIcon className="text-indigo-500 w-6 h-6 rounded-full bg-indigo-50 ring-8 ring-indigo-50" />
		),
		change: {
			value: "3%",
			icon: <ArrowUpIcon className="w-3 h-3" />,
			color: "text-emerald-400",
		},
	},
	{
		title: "Total comments",
		value: "235",
		icon: (
			<ChatBubbleBottomCenterTextIcon className="text-indigo-500 w-6 h-6 rounded-full bg-indigo-50 ring-8 ring-indigo-50" />
		),
		change: {
			value: "64%",
			icon: <ArrowUpIcon className="w-3 h-3" />,
			color: "text-emerald-400",
		},
	},
];

const Dash = () => {
	return (
		<>
			<div className="mx-auto max-w-screen-2xl p-4 md:p-6">
				<div className="grid grid-cols-2 xs:grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:gap-7">
					{data.map((item) => (
						<div
							key={item.title + Math.random()}
							className="border bg-white px-5 py-3 rounded-lg"
						>
							<div className="flex items-end justify-between">
								<div>
									<span className="text-sm font-medium ">
										{item.title}
									</span>
									<h4 className="text-title-md font-bold text-black">
										{item.value}
									</h4>
								</div>
								<div className="flex h-11.5 w-11.5 items-center justify-center rounded-full bg-meta-2">
									{item.icon}
								</div>
							</div>
							<span
								className={`flex items-center gap-1 text-xs font-medium ${item.change.color}`}
							>
								{item.change.value}
								{item.change.icon}
							</span>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default Dash;
