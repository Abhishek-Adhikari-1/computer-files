import { Link } from "react-router-dom";

const footerOptions = [
	{
		title: "CATEGORIES",
		links: [
			"First Link",
			"Second Link",
			"Third Link",
			"Fourth Link",
			"Last Link",
		],
	},
	{
		title: "CATEGORIES",
		links: [
			"First Link",
			"Second Link",
			"Third Link",
			"Fourth Link",
			"Last Link",
		],
	},
];

const Footer = () => {
	return (
		<>
			<footer className="text-gray-600 body-font shadow-inner bg-white">
				<div className="container p-5 mx-auto flex sm:items-center lg:items-start sm:flex-row sm:flex-nowrap flex-wrap flex-col">
					<div className="w-64 flex-shrink-0 sm:mx-0 mx-auto text-center sm:text-left">
						<Link
							to={""}
							className="flex title-font font-medium items-center sm:justify-start justify-center text-gray-900"
						>
							<img
								className="inline-block h-7 w-auto rounded-full ring-8 ring-indigo-500 bg-indigo-500 select-none"
								src="./logo.svg"
								alt="Logo"
								draggable={false}
							/>
							<span className="ml-3 text-xl">
								Abhi&apos;s Insights
							</span>
						</Link>
						<p className="mt-2 text-sm text-gray-500">
							Air plant banjo lyft occupy retro adaptogen indego
						</p>
					</div>
					<div className="flex-grow flex flex-wrap sm:pl-20 -mb-10 sm:mt-0 mt-10 sm:text-left text-center sm:justify-end">
						{footerOptions.map((item) => {
							return (
								<>
									<div
										key={item + Math.random()}
										className="lg:w-1/4 sm:w-1/2 w-full px-4"
									>
										<h2 className="title-font font-medium text-gray-900 tracking-widest text-lg mb-3">
											{item?.title}
										</h2>
										<nav className="list-none mb-10">
											{item?.links.map((link) => {
												return (
													<>
														<li
															key={
																link +
																Math.random()
															}
														>
															<Link
																to={""}
																className="text-gray-600 hover:text-indigo-600 cursor-pointer hover:underline"
															>
																{link}
															</Link>
														</li>
													</>
												);
											})}
										</nav>
									</div>
								</>
							);
						})}
					</div>
				</div>
				<div className=" bg-indigo-100/50">
					<div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
						<p className="text-gray-500 text-sm text-center sm:text-left">
							© 2024 Abhishek —
							<Link
								to="https://abhishek-adhikari.com.np"
								rel="noopener noreferrer"
								className="text-gray-600 ml-1"
								target="_blank"
							>
								@abhishek.adhikari
							</Link>
						</p>
						<span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
							<Link to={""} className="text-gray-500">
								<svg
									fill="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-5 h-5"
									viewBox="0 0 24 24"
								>
									<path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
								</svg>
							</Link>
							<Link to={""} className="ml-3 text-gray-500">
								<svg
									fill="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-5 h-5"
									viewBox="0 0 24 24"
								>
									<path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
								</svg>
							</Link>
							<Link to={""} className="ml-3 text-gray-500">
								<svg
									fill="none"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									className="w-5 h-5"
									viewBox="0 0 24 24"
								>
									<rect
										width="20"
										height="20"
										x="2"
										y="2"
										rx="5"
										ry="5"
									></rect>
									<path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
								</svg>
							</Link>
							<Link to={""} className="ml-3 text-gray-500">
								<svg
									fill="currentColor"
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="0"
									className="w-5 h-5"
									viewBox="0 0 24 24"
								>
									<path
										stroke="none"
										d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
									></path>
									<circle
										cx="4"
										cy="4"
										r="2"
										stroke="none"
									></circle>
								</svg>
							</Link>
						</span>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
