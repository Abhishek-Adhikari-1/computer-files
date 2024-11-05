"use client";
import Image from "next/image";
import TypingText from "../components/main/TypingText";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
	return (
		<AnimatePresence mode="wait">
			<main className="flex h-full flex-col items-center justify-center sm:px-24 sm:py-5 p-3">
				<section className="w-full h-full relative lg:flex lg:justify-center lg:items-center">
					<div className="flex flex-col lg:flex-row h-full lg:flex lg:justify-center lg:items-center  max-w-screen-xl">
						<div className="transition-all duration-500 flex-1 flex flex-col justify-center">
							<div>
								<motion.div
									className="text-5xl font-bold"
									initial={{ opacity: 0, y: 25 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 25 }}
									transition={{
										type: "spring",
										duration: 1.5,
										ease: "easeInOut",
										delay: 0.7,
									}}
								>
									Hi,
									<span className="text-blue-600 dark:text-blue-500">
										I&apos;am
									</span>
								</motion.div>
								<motion.div
									initial={{ opacity: 0, x: -40 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -40 }}
									transition={{
										type: "spring",
										duration: 1,
										ease: "easeInOut",
										delay: 0.1,
									}}
								>
									<TypingText
										text={[
											"Abhishek Adhikari.",
											"a Junior Developer.",
										]}
									/>
								</motion.div>
							</div>
							<motion.div
								className="lg:w-[65%] text-justify text-base md:text-lg"
								initial={{ opacity: 0, y: -25 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -25 }}
								transition={{
									type: "spring",
									duration: 1.5,
									ease: "easeInOut",
									delay: 1,
								}}
							>
								Dedicated to producing web designs that not only
								look stunning but also reflect the depth of
								experience I bring to every project. Welcome to
								the world I have crafted to this digital walls.
							</motion.div>
						</div>
						<motion.div
							className="lg:absolute lg:-bottom-5 lg:right-0 xl:right-[3%] drop-shadow-2xl flex justify-center relative"
							initial={{ opacity: 0, y: 40 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: 40 }}
							transition={{
								type: "spring",
								duration: 1,
								ease: "easeInOut",
								delay: 0.5,
							}}
						>
							<Image
								alt=""
								width="700"
								height="200"
								src={"/splash.png"}
								loading="eager"
								quality={100}
								draggable={false}
								className="absolute w-auto h-full object-cover -z-10 bg-no-repeat select-none"
							/>

							<Image
								alt="Profile Photo"
								width="700"
								height="200"
								loading="eager"
								src={"/pic.png"}
								quality={100}
								draggable={false}
								className="max-w-[80%] lg:max-w-96 xs:max-w-64 md:max-w-72 z-0 select-none"
							/>
						</motion.div>
					</div>
				</section>
			</main>
		</AnimatePresence>
	);
}
