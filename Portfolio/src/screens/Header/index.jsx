import { Link, useLocation } from "react-router-dom";
import {
	UilEstate,
	UilUser,
	UilFileAlt,
	UilEnvelope,
} from "@iconscout/react-unicons";

const navData = [
	{ name: "Home", path: "/home", icon: <UilEstate /> },
	{
		name: "About",
		path: "/about",
		icon: <UilUser />,
	},
	{
		name: "Resume",
		path: "/resume",
		icon: <UilFileAlt />,
	},
	{
		name: "Contact",
		path: "/contact",
		icon: <UilEnvelope />,
	},
];

export const Header = () => {
	const location = useLocation();
	const pathname = location.pathname;

	return (
		<header className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-3 xl:bottom-0 mt-auto xl:right-[1%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen px-8 xl:px-0">
			<nav className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-7 py-8 md:px-40 xl:p-0 xl:py-10 h-[0px] xl:h-max bg-white/10 backdrop-blur-sm text-3xl xl:text-xl rounded-full">
				{navData.map(({ name, path, icon }) => (
					<Link
						to={path}
						key={name}
						className="relative flex items-center group text-slate-200 hover:text-accent"
					>
						<div
							className={`absolute pr-14 right-0 hidden ${
								path !== pathname && "xl:group-hover:flex"
							}`}
						>
							<div className="bg-slate-300 relative flex text-primary items-center p-[6px] rounded-[3px]">
								<span className="text-[12px] capitalize leading-none font-semibold select-none">
									{name}
								</span>
								<span className="border-solid border-l-slate-300 border-l-8 border-y-transparent border-y-[4px] border-r-0 absolute -right-2"></span>
							</div>
						</div>
						<div
							className={`${
								path === pathname && "text-accent"
							} transition-colors duration-300`}
						>
							{icon}
						</div>
					</Link>
				))}
			</nav>
		</header>
	);
};
