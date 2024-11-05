import { lazy, Suspense, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import FocusTrap from "focus-trap-react";
import "./index.css";
import Logo from "../../components/logo";

const SignIn = lazy(() => import("../SignIn/index"));

const navLinks = [
	{ name: "Home", path: "/home" },
	{ name: "About", path: "/about" },
	{ name: "Projects", path: "/projects" },
];

const Header = () => {
	const [isOpen, setIsOpen] = useState({
		menu: false,
		signIn: false,
	});
	const pathname = useLocation().pathname;

	const toggleMenu = () => {
		setIsOpen({ ...isOpen, menu: !isOpen.menu });
	};

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

	return (
		<>
			<Suspense fallback={<div>Loading...</div>}>
				{isOpen.signIn && (
					<FocusTrap>
						<div
							className="absolute bg-black/30 backdrop-blur-sm 0 w-full h-full top-0-left-0 z-50 flex justify-center items-center overflow-hidden"
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
			</Suspense>
			<header className="text-gray-600 body-font p-0 border-b-1 border-indigo-50 shadow-md z-50">
				<div className="container mx-auto flex flex-wrap px-5 py-3 flex-row items-center justify-between">
					<div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
						<div onClick={toggleMenu}>
							<Logo />
						</div>
						<span className="ml-3 text-base md:text-xl">
							Abhi&apos;s Insights
						</span>
					</div>
					<nav
						className={`md:ml-auto z-40 md:flex md:flex-wrap md:items-center md:text-base md:justify-center select-none ${
							isOpen.menu ? "flex animate-slideDown" : "hidden"
						} tall:flex-col tall:absolute tall:px-10 tall:py-5 tall:left-0 tall:top-20 tall:w-full tall:backdrop-blur-sm tall:border-y tall:border-gray-500`}
					>
						{navLinks.map(({ name, path }) => {
							return (
								<div
									className={`link-container md:mr-5 cursor-pointer ${
										pathname === path ? "active" : ""
									} tall:max-w-fit`}
									key={name + path}
								>
									<Link
										to={path}
										className={`hover:text-indigo-600 ${
											pathname === path &&
											"text-indigo-600"
										}`}
										onClick={toggleMenu}
									>
										{name}
									</Link>
									<div className="underline"></div>
								</div>
							);
						})}
					</nav>
					<button
						onClick={toggleSignIn}
						className="select-none flex items-center border-2 border-indigo-600 rounded-md text-gray-600 py-1 px-3 focus:outline-none hover:bg-indigo-600 hover:text-white text-base mt-0"
					>
						Sign In
						<svg
							fill="none"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							className="w-4 h-4 ml-1"
							viewBox="0 0 24 24"
						>
							<path d="M5 12h14M12 5l7 7-7 7"></path>
						</svg>
					</button>
				</div>
			</header>
		</>
	);
};

export default Header;


