import { useEffect, useState } from "react";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import "./index.css";
import SignIn from "../SignIn/index";
import useLogout from "../../hooks/useLogout";

const navLinks = [
	{ name: "Home", path: "/home" },
	{ name: "Projects", path: "/projects" },
	{ name: "About", path: "/about" },
	{ name: "Team", path: "/team" },
];

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

export default function Header() {
	const { logout } = useLogout();

	const { currentUser } = useSelector((state) => state.user);
	const current = useLocation().pathname;

	const defaultMenuItems = [
		{ name: "Profile", path: "/profile", badge: currentUser?.role },
		{ name: "Settings", path: "/settings" },
		{ name: "Sign out", path: "#" },
	];

	const enhancedMenuItems = [
		{ name: "Dashboard", path: "/dashboard?tab=dash" },
		{ name: "Profile", path: "/profile", badge: currentUser?.role },
		{ name: "Settings", path: "/settings" },
		{ name: "Sign out", path: "#" },
	];

	const [isOpen, setIsOpen] = useState({
		menuItems: defaultMenuItems,
		signIn: false,
	});

	const isSignIn = !!currentUser;

	const toggleSignIn = () => {
		setIsOpen({ ...isOpen, signIn: !isOpen.signIn });
	};

	useEffect(() => {
		if (isOpen.signIn) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpen.signIn]);

	useEffect(() => {
		if (isSignIn && currentUser?.role !== "user") {
			setIsOpen((prevState) => ({
				...prevState,
				menuItems: enhancedMenuItems,
			}));
		} else {
			setIsOpen((prevState) => ({
				...prevState,
				menuItems: defaultMenuItems,
			}));
		}
	}, [isSignIn, currentUser?.role]);

	const handleMenuClick = async (name) => {
		if (name === "Sign out") await logout();
	};

	return (
		<>
			<Disclosure as="nav" className="bg-white shadow-md">
				{({ open }) => (
					<>
						<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
							<div className="relative flex h-16 items-center justify-between">
								<div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
									<DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-indigo-600 hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
										<span className="absolute -inset-0.5" />
										<span className="sr-only">
											Open main menu
										</span>
										{open ? (
											<XMarkIcon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										) : (
											<Bars3Icon
												className="block h-6 w-6"
												aria-hidden="true"
											/>
										)}
									</DisclosureButton>
								</div>
								<div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-between">
									<div className="flex flex-shrink-0 items-center xs:scale-75 xs:-ml-14">
										<img
											className="inline-block h-7 w-auto rounded-full ring-8 ring-indigo-500 bg-indigo-500 select-none"
											src="./logo.svg"
											alt="Logo"
											draggable={false}
										/>
										<span className="ml-3 text-base md:text-xl xs:text-xl">
											Abhi&apos;s Insights
										</span>
									</div>
									<div className="hidden sm:ml-6 sm:block">
										<div className="flex space-x-6">
											{navLinks.map((item) => (
												<div
													key={item.path}
													className={`link-container cursor-pointer ${
														current === item.path &&
														"active"
													}`}
												>
													<Link
														to={item.path}
														className={classNames(
															current ===
																item.path
																? "text-indigo-500"
																: "text-indigo-500 hover:text-indigo-600 ",
															"rounded-md text-sm font-medium"
														)}
														aria-current={
															current ===
															item.path
																? "page"
																: undefined
														}
													>
														{item.name}
													</Link>
													<div className="underline"></div>
												</div>
											))}
										</div>
									</div>
								</div>
								<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
									{isSignIn ? (
										<Menu
											as="div"
											className="relative ml-3"
										>
											<div>
												<MenuButton className="select-none relative flex rounded-full bg-indigo-100 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2">
													<span className="absolute -inset-1.5" />
													<span className="sr-only">
														Open user menu
													</span>
													<img
														className="h-8 w-8 rounded-full"
														src={
															currentUser?.photoUrl
														}
														alt="Profile Photo"
														draggable={false}
													/>
												</MenuButton>
											</div>
											<Transition
												enter="transition ease-out duration-100"
												enterFrom="transform opacity-0 scale-95"
												enterTo="transform opacity-100 scale-100"
												leave="transition ease-in duration-75"
												leaveFrom="transform opacity-100 scale-100"
												leaveTo="transform opacity-0 scale-95"
											>
												<MenuItems className="absolute right-0 z-40 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
													{isOpen.menuItems.map(
														(menuItem) => (
															<MenuItem
																key={
																	menuItem.name
																}
																onClick={() =>
																	handleMenuClick(
																		menuItem.name
																	)
																}
															>
																{({
																	active,
																}) => (
																	<Link
																		to={
																			menuItem.path
																		}
																		className={classNames(
																			active
																				? "bg-gray-100"
																				: "",
																			"block px-4 py-2 text-sm text-gray-700 relative group select-none"
																		)}
																	>
																		{
																			menuItem.name
																		}
																		{menuItem.badge && (
																			<span className="select-none absolute right-0 capitalize bg-indigo-50 group-hover:bg-indigo-100 text-indigo-500 text-xs font-medium me-2 px-2 py-0.5 rounded">
																				{
																					menuItem.badge
																				}
																			</span>
																		)}
																	</Link>
																)}
															</MenuItem>
														)
													)}
												</MenuItems>
											</Transition>
										</Menu>
									) : (
										<>
											<button
												onClick={toggleSignIn}
												className="select-none flex items-center border-2 border-indigo-600 rounded-md text-gray-600 py-1 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white text-base mt-0"
											>
												Sign In
											</button>
										</>
									)}
								</div>
							</div>
						</div>

						<Transition
							enter="transition ease-out duration-200"
							enterFrom="transform opacity-0 scale-90"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-150"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-90"
						>
							<DisclosurePanel className="sm:hidden">
								<div className="space-y-1 px-2 pb-3 pt-2 shadow-md">
									{navLinks.map((item) => (
										<DisclosureButton
											key={item.path}
											as={Link}
											to={item.path}
											className={classNames(
												current === item.path
													? "bg-indigo-500 text-white"
													: "text-gray-600 hover:bg-indigo-300/50 hover:text-gray-500",
												"block rounded-md px-3 py-2 text-base font-medium cursor-pointer"
											)}
											aria-current={
												current === item.path
													? "page"
													: undefined
											}
										>
											{item.name}
										</DisclosureButton>
									))}
								</div>
							</DisclosurePanel>
						</Transition>
						{isOpen.signIn && (
							<FocusTrap>
								<div
									className={`absolute bg-black/30 w-full h-full top-0 left-0 z-50 flex justify-center items-center overflow-hidden ${
										isSignIn
											? "backdrop-blur-none"
											: "backdrop-blur-sm"
									}`}
									onClick={toggleSignIn}
								>
									<div
										className={`bg-white max-w-xs sm:max-w-sm md:max-w-md w-full h-fit rounded-lg relative ${
											isOpen.signIn
												? "flex animate-slideUp"
												: "hidden"
										}`}
										onClick={(e) => e.stopPropagation()}
									>
										<div
											className="md:hidden absolute top-3 right-4 bg-indigo-50 px-2 rounded-md text-xl cursor-pointer hover:bg-indigo-100"
											onClick={toggleSignIn}
										>
											x
										</div>
										<SignIn toggleSignIn={toggleSignIn} />
									</div>
								</div>
							</FocusTrap>
						)}
					</>
				)}
			</Disclosure>
		</>
	);
}
