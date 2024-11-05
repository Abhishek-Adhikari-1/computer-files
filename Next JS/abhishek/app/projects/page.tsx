import { Card } from "@/components/main/Card";
import Calculator from "@/videos/calculator.mp4";
import MernChat from "@/videos/mernchat.mp4";
import BlogApp from "@/videos/blogapp.mp4";
import Balmeeki from "@/videos/balmeeki.mp4";
import WeatherNew from "@/videos/weathernew.mp4";
import WeatherOld from "@/videos/weatherold.mp4";
import ChatPy from "@/videos/chatappPy.mp4";

const projects = [
	{
		type: "video",
		src: MernChat,
		title: "MERN Chatapp",
		tag: "App",
	},
	{
		type: "image",
		src: "/userver.PNG",
		title: "User verify (Python)",
		tag: "Website",
	},
	{
		type: "video",
		src: BlogApp,
		title: "BlogWebsite (Next Js)",
		tag: "App",
	},
	{
		type: "video",
		src: ChatPy,
		title: "Chatapp (Python)",
		tag: "Website",
	},
	{
		type: "video",
		src: Balmeeki,
		title: "School Website",
		tag: "Website",
	},
	{
		type: "video",
		src: WeatherNew,
		title: "Weather App (React Native)",
		tag: "App",
	},
	{
		type: "video",
		src: Calculator,
		title: "Simple Calculator",
		tag: "App",
	},
	{
		type: "video",
		src: WeatherOld,
		title: "Weather App",
		tag: "Website",
	},
];

export default async function Projects() {
	return (
		<>
			<main className="flex h-auto min-h-full flex-col items-center justify-center lg:ps-10 lg:pr-28 sm:py-5 p-3">
				<section className="w-full h-full relative lg:flex lg:justify-center lg:items-center flex-col">
					<div className="mx-auto transition-all duration-500 max-w-max text-center mb-4 lg:mb-0">
						<h1 className="text-3xl font-bold title-main font-serif">
							Portfolio
						</h1>
						<span className="text-sm text-[#5C85D6] font-medium">
							My works
						</span>
					</div>
					<div className="flex flex-col lg:flex-row h-full lg:flex lg:justify-center max-w-screen-xl relative">
						<div className="sticky top-10 h-max min-w-44">
							<div className="select-none">
								<div className="skills-main w-max cursor-pointer">All</div>
								<div className="w-max cursor-pointer">Apps</div>
								<div className="w-max cursor-pointer">Websites</div>
							</div>
						</div>
						<div className="transition-all duration-500 flex-1 flex flex-col justify-center items-center">
							<div className="lg:w-[94%] text-justify text-base md:text-lg pb-24 lg:pb-0">
								<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									{projects.map((project) => {
										return (
											<Card
												type={project?.type}
												src={project?.src}
												title={project?.title}
												tag={project?.tag}
												key={
													project?.title +
													project?.type +
													project?.tag
												}
											/>
										);
									})}
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
