import { EllipsisIcon } from "lucide-react";

const UserCard = async ({ type = "N/A" }: { type?: string }) => {
	return (
		<div className="odd:text-green-500 dark:odd:text-green-100 even:text-blue-500 dark:even:text-blue-100 rounded-2xl odd:bg-[#b8f6d5] dark:odd:bg-[#77cd9d] even:bg-[#b1c7ff] dark:even:bg-[#6486db] px-4 py-3 flex-1 min-w-[130px]">
			<div className="flex justify-between items-center">
				<span className="text-[10px] bg-slate-50 dark:bg-slate-700 px-2 py-1 rounded-full">
					2024/25
				</span>
				{/* <Image src="/more.png" alt="" width={20} height={20} draggable={false} className="select-none rounded-lg cursor-pointer"/> */}
				<EllipsisIcon className="cursor-pointer text-neutral-50" />
			</div>
			<h1 className="text-2xl font-semibold my-4">1,234</h1>
			<h2 className="capitalize text-sm font-medium text-zinc-600 dark:text-gray-100">
				{type}
			</h2>
		</div>
	);
};

export default UserCard;
