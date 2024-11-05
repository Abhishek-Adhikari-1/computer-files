import { SearchIcon } from "lucide-react";
import { AnnouncementIcon, MessageIcon } from "./Icons";
import { Input } from "./ui/input";
import { ThemeButton } from "./theme/ThemeButton";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import AnimatedDiv from "./AnimatedDiv";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const Navbar = ({ scrollYPos }: { scrollYPos: number }) => {
	const isScrolled = scrollYPos > 20;

	return (
		<AnimatedDiv
			animation="scaleY"
			className={`sticky top-0 z-50 backdrop-blur-lg ${
				isScrolled
					? "shadow-md dark:shadow-lg dark:shadow-slate-500/25 bg-background/20 dark:bg-background/35"
					: "bg-transparent"
			}`}
		>
			<div className="flex items-center justify-between py-1 pt-2 md:py-2 px-2 md:px-4">
				{/* SEARCH BAR */}
				<div className="hidden md:flex relative flex-1">
					<div className="absolute h-full flex justify-center items-center ml-2 pointer-events-none">
						<SearchIcon className="text-gray-500 dark:text-gray-400 w-5 h-5" />
					</div>
					<Input
						type="search"
						placeholder="Search..."
						className="bg-background pl-8 placeholder:select-none rounded-lg"
					/>
				</div>

				{/* ICONS AND USERS */}
				<div className="flex-1 flex items-center gap-2 md:gap-4 justify-end">
					<div className="bg-background rounded-full p-1 flex items-center justify-center cursor-pointer hover:bg-zinc-400/30">
						<Tooltip>
							<TooltipTrigger asChild>
								<div>
									<MessageIcon className="w-6 h-6" />
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Messages</p>
							</TooltipContent>
						</Tooltip>
					</div>

					<div className="bg-background rounded-full p-1 flex items-center justify-center cursor-pointer hover:bg-zinc-400/30 relative">
						<Tooltip>
							<TooltipTrigger asChild>
								<div>
									<AnnouncementIcon className="w-6 h-6" />
									<span className="absolute select-none -top-1 -right-1 w-4 h-4 bg-purple-500 rounded-full text-white flex justify-center items-center text-[11px]">
										5
									</span>
								</div>
							</TooltipTrigger>
							<TooltipContent>
								<p>Notifications</p>
							</TooltipContent>
						</Tooltip>
					</div>

					<ThemeButton />

					<div className="flex flex-col">
						<span className="text-xs leading-3 font-medium text-gray-600 dark:text-slate-300 max-w-[60px] truncate min-[480px]:max-w-full">
							John Doe
						</span>
						<span className="text-[10px] text-gray-500 dark:text-slate-400 text-right">
							Admin
						</span>
					</div>

					<Tooltip>
						<TooltipTrigger asChild>
							<div className="relative group cursor-pointer transition-all duration-300">
								<Avatar>
									<AvatarImage
										src="/avatar.png"
										alt=""
										className="rounded-full group-hover:ring-4 group-hover:ring-slate-300 dark:group-hover:ring-slate-700 "
									/>
									<AvatarFallback>JD</AvatarFallback>
								</Avatar>
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<p>Profile</p>
						</TooltipContent>
					</Tooltip>
				</div>
			</div>
		</AnimatedDiv>
	);
};

export default Navbar;
