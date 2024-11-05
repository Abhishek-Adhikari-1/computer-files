"use client";
import AnimatedSVG from "./AnimatedSvg";
import "../globals.css";
import useAbout from "@/hooks/useAbout";
import { AnimatePresence, motion } from "framer-motion";

const About = () => {
	const { age } = useAbout();

	return (
		<AnimatePresence>
			<main className="flex h-full flex-col items-center justify-center lg:ps-10 lg:pr-28 sm:py-5 p-3">
				<section className="w-full h-full relative lg:flex lg:justify-center lg:items-center flex-col">
					<div className="mx-auto transition-all duration-500 max-w-max text-center">
						<motion.h1
							className="text-3xl font-bold title-main font-serif"
							initial={{ opacity: 0, y: 15 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 15 }}
							transition={{
								type: "spring",
								duration: 1,
								ease: "easeInOut",
								delay: 0.5,
							}}
						>
							About Me
						</motion.h1>
						<motion.span
							className="text-sm text-[#5C85D6] font-medium"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							transition={{
								type: "spring",
								duration: 1,
								ease: "easeInOut",
								delay: 0.5,
							}}
						>
							My Introduction
						</motion.span>
					</div>
					<div className="flex flex-col lg:flex-row h-full lg:flex lg:justify-center lg:items-center  max-w-screen-xl">
						<motion.div
							className="drop-shadow-2xl flex justify-center"
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: -20 }}
							transition={{
								type: "spring",
								duration: 1,
								ease: "easeInOut",
								delay: 0.7,
							}}
							whileHover={{
								scale: 1.1,
							}}
						>
							<AnimatedSVG
								color="#426ceb"
								duration="15s"
								image="./pic.png"
							/>
						</motion.div>
						<div className="transition-all duration-500 flex-1 flex flex-col justify-center items-end">
							<div className="lg:w-[94%] text-justify text-base md:text-lg pb-24 lg:pb-0">
								<motion.p
									initial={{ opacity: 0, x: 20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: 20 }}
									transition={{
										type: "spring",
										duration: 1,
										ease: "easeInOut",
										delay: 1,
									}}
								>
									My name is Abhishek Adhikari, a {age.years}
									-year-old developer passionately exploring
									both frontend and backend development to
									shape my future prospects. My expertise lies
									in creating beautifully simple interfaces
									through a combination of thoughtful
									interactions and clean design patterns. I
									take pride in my ability to code and bring
									ideas to life in the browser. I value
									simplicity in content structure and believe
									in the power of clean, elegant design.
									Coding is not just a skill for me; it&apos;s
									a source of joy, and I am dedicated to
									honing my craft to deliver high-quality and
									aesthetically pleasing digital experiences.
								</motion.p>
								<div className="flex justify-between flex-row mt-7 max-w-screen-sm mx-auto gap-x-3">
									<motion.div
										className="text-center"
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{
											type: "spring",
											duration: 1,
											ease: "easeInOut",
											delay: 1.3,
										}}
									>
										<span className="font-bold text-2xl md:text-[2rem] text-zinc-700 dark:text-slate-200 transition-all duration-100">
											{age.expYears}+
										</span>
										<div className="text-sm text-zinc-500 dark:text-zinc-400">
											Years experience
										</div>
									</motion.div>

									<motion.div
										className="text-center"
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{
											type: "spring",
											duration: 1,
											ease: "easeInOut",
											delay: 1.5,
										}}
									>
										<span className="font-bold text-2xl md:text-[2rem] text-zinc-700 dark:text-slate-200 transition-all duration-100">
											10+
										</span>
										<div className="text-sm text-zinc-500 dark:text-zinc-400">
											Languages learned
										</div>
									</motion.div>

									<motion.div
										className="text-center"
										initial={{ opacity: 0, y: -20 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -20 }}
										transition={{
											type: "spring",
											duration: 1,
											ease: "easeInOut",
											delay: 1.7,
										}}
									>
										<span className="font-bold text-2xl md:text-[2rem] text-zinc-700 dark:text-slate-200 transition-all duration-100">
											4+
										</span>
										<div className="text-sm text-zinc-500 dark:text-zinc-400">
											Programs winned
										</div>
									</motion.div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</main>
		</AnimatePresence>
	);
};

export default About;
