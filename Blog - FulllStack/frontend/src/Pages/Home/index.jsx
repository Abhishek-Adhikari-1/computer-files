import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
	const [homeContent, setHomeContent] = useState();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("/api/get/home", {
					method: "POST",
					body: "",
					credentials: "include",
				});
				const data = await response.json();

				if (!response.ok) {
					throw new Error(data.error);
				}
				setHomeContent(data.data);
				console.log(data.data);
			} catch (e) {
				console.log(e);
			}
		};

		fetchData();
	}, []);

	return (
		<section className="text-gray-600 body-font">
			<div className="container p-5 mx-auto">
				<div className="flex flex-wrap -m-4">
					{homeContent?.map((item, index) => {
						return (
							<div
								className="p-4 md:w-1/2 lg:w-1/3 2xl:w-1/4 w-full"
								key={index + item?.title}
							>
								<div className="h-full bg-white border-2 border-gray-300/40 border-opacity-60 rounded-lg overflow-hidden flex flex-col group">
									<img
										className="lg:h-48 md:h-36 w-full object-cover object-center select-none group-hover:scale-110 transition-all duration-[400ms]"
										src={item?.image}
										alt="blog"
										draggable="false"
									/>
									<div className="p-6 flex flex-col justify-between flex-1">
										<div>
											<h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
												{item?.category}
											</h2>
											<h1 className="title-font text-lg font-medium text-gray-900 mb-3 truncate">
												{item?.title}
											</h1>
											<p className="leading-relaxed mb-3 line-clamp-4">
												{item?.description}
											</p>
										</div>
										<div className="flex items-center justify-between">
											<Link
												to={`${item?.href || ""}`}
												className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0 cursor-pointer select-none tracking-widest hover:text-indigo-400"
											>
												{item?.hrefText || "See More"}
												<svg
													className="w-4 h-4 ml-2"
													viewBox="0 0 24 24"
													stroke="currentColor"
													strokeWidth="2"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M5 12h14"></path>
													<path d="M12 5l7 7-7 7"></path>
												</svg>
											</Link>
											<span className="text-gray-400 mr-3 flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
												<svg
													className="w-4 h-4 mr-1"
													stroke="currentColor"
													strokeWidth="2"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
													viewBox="0 0 24 24"
												>
													<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
												</svg>
												{item?.totalViews}
											</span>
											<span className="text-gray-400 inline-flex items-center leading-none text-sm">
												<svg
													className="w-4 h-4 mr-1"
													stroke="currentColor"
													strokeWidth="2"
													fill="none"
													strokeLinecap="round"
													strokeLinejoin="round"
													viewBox="0 0 24 24"
												>
													<path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
												</svg>
												{item?.totalComments}
											</span>
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default Home;
