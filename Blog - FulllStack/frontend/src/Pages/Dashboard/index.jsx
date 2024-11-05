import { useState, lazy, Suspense } from "react";
import {
	Dialog,
	DialogPanel,
	Menu,
	MenuButton,
	MenuItems,
	Transition,
	TransitionChild,
} from "@headlessui/react";
import {
	XMarkIcon,
	ChartPieIcon,
	UserGroupIcon,
	UserCircleIcon,
	DocumentTextIcon,
} from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	FunnelIcon,
	Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Dash = lazy(() => import("./Dash/Dash"));
const Profile = lazy(() => import("../Profile"));
const Posts = lazy(() => import("./Posts/Posts"));
const Users = lazy(() => import("./Users/Users"));

const subCategories = [
	{
		name: "Dashboard",
		path: "/dashboard?tab=dash",
		current: "dash",
		icon: <ChartPieIcon />,
		component: <Dash />,
	},
	{
		name: "Profile",
		path: "/dashboard?tab=profile",
		current: "profile",
		badge: true,
		icon: <UserCircleIcon />,
		component: <Profile />,
	},
	{
		name: "Users",
		path: "/dashboard?tab=users",
		current: "users",
		icon: <UserGroupIcon />,
		component: <Users />,
	},
	{
		name: "Posts",
		path: "/dashboard?tab=posts",
		current: "posts",
		icon: <DocumentTextIcon />,
		component: <Posts />,
	},
];

export default function Example() {
	const { currentUser } = useSelector((state) => state.user);

	const current = useLocation().search.split("=").pop();
	const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

	return (
		<div>
			<div>
				{/* Mobile filter dialog */}
				<Transition show={mobileFiltersOpen}>
					<Dialog
						className="relative z-40 lg:hidden"
						onClose={setMobileFiltersOpen}
					>
						<TransitionChild
							enter="transition-opacity ease-linear duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity ease-linear duration-300"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<div className="fixed inset-0 bg-black bg-opacity-25" />
						</TransitionChild>

						<div className="fixed inset-0 z-40 flex">
							<TransitionChild
								enter="transition ease-in-out duration-300 transform"
								enterFrom="-translate-x-full"
								enterTo="translate-x-0"
								leave="transition ease-in-out duration-300 transform"
								leaveFrom="translate-x-0"
								leaveTo="-translate-x-full"
							>
								<DialogPanel className="relative mr-auto flex h-full w-full max-w-64 flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
									<div className="flex items-center justify-between px-4">
										<h2 className="text-lg font-medium text-gray-900">
											Menu
										</h2>
										<button
											type="button"
											className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
											onClick={() =>
												setMobileFiltersOpen(false)
											}
										>
											<span className="sr-only">
												Close menu
											</span>
											<XMarkIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</div>

									{/* Filters */}
									<form className="mt-4 border-t border-gray-200">
										<h3 className="sr-only">Categories</h3>
										<ul
											role="list"
											className="space-y-2 pb-2 text-sm font-medium text-gray-900 flex flex-col"
										>
											{subCategories.map((category) => (
												<Link
													key={
														category.name +
														Math.random()
													}
													to={category.path}
													onClick={() =>
														setMobileFiltersOpen(
															false
														)
													}
													className={`${
														current ===
														category.current
															? "bg-indigo-100/80 text-indigo-500"
															: "hover:bg-gray-100 hover:text-gray-600"
													} p-3 rounded flex flex-row items-center`}
												>
													<span className="w-7 h-7 absolute left-2">
														{category.icon}
													</span>
													<div className="pl-7">
														{category.name}
													</div>
													{category.badge && (
														<span className="select-none absolute right-0 capitalize bg-indigo-50 text-indigo-500/70 text-xs font-medium me-2 px-2 py-0.5 rounded">
															{currentUser.role}
														</span>
													)}
												</Link>
											))}
										</ul>
									</form>
								</DialogPanel>
							</TransitionChild>
						</div>
					</Dialog>
				</Transition>

				<main className="mx-auto px-0 sm:px-4 lg:px-0">
					<div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24 px-8">
						<h1 className="text-2xl lg:text-4xl font-bold tracking-tight text-gray-900">
							Analytics
						</h1>
						<div className="flex items-center">
							<Menu
								as="div"
								className="relative inline-block text-left"
							>
								<div>
									<MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
										Sort
										<ChevronDownIcon
											className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
											aria-hidden="true"
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
									<MenuItems className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
										{/* <div className="py-1">
											{sortOptions.map((option) => (
												<MenuItem key={option.name}>
													{({ focus }) => (
														<a
															href={option.href}
															className={classNames(
																option.current
																	? "font-medium text-gray-900"
																	: "text-gray-500",
																focus
																	? "bg-gray-100"
																	: "",
																"block px-4 py-2 text-sm"
															)}
														>
															{option.name}
														</a>
													)}
												</MenuItem>
											))}
										</div> */}
									</MenuItems>
								</Transition>
							</Menu>

							<button
								type="button"
								className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
							>
								<span className="sr-only">View grid</span>
								<Squares2X2Icon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</button>
							<button
								type="button"
								className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
								onClick={() => setMobileFiltersOpen(true)}
							>
								<span className="sr-only">Filters</span>
								<FunnelIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</button>
						</div>
					</div>

					<section aria-labelledby="products-heading">
						<h2 id="products-heading" className="sr-only">
							Products
						</h2>

						<div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 relative">
							{/* Filters */}
							<div className="hidden lg:block border-r-2 border-gray-200 pr-4 bg-white px-5">
								<div className="sticky top-0 py-4">
									<h3 className="sr-only">Side Bar</h3>
									<ul
										role="list"
										className="space-y-2 pb-2 text-sm font-medium text-gray-900 flex flex-col select-none"
									>
										{subCategories.map((category) => (
											<Link
												key={
													category.name +
													Math.random()
												}
												to={category.path}
												className={`${
													current === category.current
														? "bg-indigo-100/80 text-indigo-500"
														: "hover:bg-gray-100 hover:text-gray-600"
												} p-3 rounded flex flex-row items-center`}
											>
												<span className="w-7 h-7 absolute left-2">
													{category.icon}
												</span>
												<div className="pl-7">
													{category.name}
												</div>
												{category.badge && (
													<span className="select-none absolute right-0 capitalize bg-indigo-50 text-indigo-500/70 text-xs font-medium me-2 px-2 py-0.5 rounded">
														{currentUser.role}
													</span>
												)}
											</Link>
										))}
									</ul>

									{/* {filters.map((section) => (
										<Disclosure
											as="div"
											key={section.id}
											className="border-b border-gray-200 py-6"
										>
											{({ open }) => (
												<>
													<h3 className="-my-3 flow-root">
														<DisclosureButton className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
															<span className="font-medium text-gray-900">
																{section.name}
															</span>
															<span className="ml-6 flex items-center">
																{open ? (
																	<MinusIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																) : (
																	<PlusIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																)}
															</span>
														</DisclosureButton>
													</h3>
													<DisclosurePanel className="pt-6">
														<div className="space-y-4">
															{section.options.map(
																(
																	option,
																	optionIdx
																) => (
																	<div
																		key={
																			option.value
																		}
																		className="flex items-center"
																	>
																		<input
																			id={`filter-${section.id}-${optionIdx}`}
																			name={`${section.id}[]`}
																			defaultValue={
																				option.value
																			}
																			type="checkbox"
																			defaultChecked={
																				option.checked
																			}
																			className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
																		/>
																		<label
																			htmlFor={`filter-${section.id}-${optionIdx}`}
																			className="ml-3 text-sm text-gray-600"
																		>
																			{
																				option.label
																			}
																		</label>
																	</div>
																)
															)}
														</div>
													</DisclosurePanel>
												</>
											)}
										</Disclosure>
									))} */}
								</div>
							</div>

							{/* Product grid */}
							<div className="lg:col-span-3 p-0 lg:pr-8">
								{subCategories.map(
									(item) =>
										current == item.current && (
											<Suspense
												key={item.name + Math.random()}
												fallback={
													<div className="relative backdrop-blur-[2px] w-full h-full flex items-center justify-center">
														<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
														<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
														<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
														<span className="text-indigo-500 select-none">
															Loading...
														</span>
													</div>
												}
											>
												{item.component}
											</Suspense>
										)
								)}
							</div>
						</div>
					</section>
				</main>
			</div>
		</div>
	);
}
