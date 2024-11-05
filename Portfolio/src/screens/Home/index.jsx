import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Typed from "typed.js";
import { Particle } from "../Layout/Particles";
import { ProjectsBtn } from "../Layout/ProjectsBtn";
import Image from "../Layout/Image";

const transitionVariants = {
	initial: {
		opacity: 0,
	},
	animate: {
		opacity: 1,
	},
	exit: {
		opacity: [1, 0],
	},
};

const fadeVariants = {
	initial: {
		opacity: 0,
		marginTop: "70px",
	},
	animate: {
		opacity: 1,
		marginTop: "0px",
	},
	exit: {
		opacity: [1, 0],
		marginTop: ["0px", "70px"],
	},
};

const TypedTitle = () => {
	const el = useRef(null);
	useEffect(() => {
		const typed = new Typed(el.current, {
			strings: ["Abhishek Adhikari.", "a Junior Developer."],
			typeSpeed: 70,
			backSpeed: 45,
			startDelay: 0,
			backDelay: 1200,
			loop: true,
			showCursor: true,
			cursorChar: "|",
		});

		return () => {
			typed.destroy();
		};
	}, []);
	return (
		<h1 className="h1 text-5xl font-semibold text-slate-200 mx-auto xl:mx-0 mb-1">
			Hi, <span className="text-accent">I&apos;am </span> <br />
			<span className="text-accent font-semibold text-3xl" ref={el}></span>
		</h1>
	);
};

export const Home = () => {
	return (
		<>
				<motion.div
					variants={transitionVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ delay: 1.1, duration: 0.5, ease: "easeInOut" }}
					className="opacity-0 font-poppins"
				>
					<div className="bg-primary/60 h-screen">
						<div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30 to-black/10">
							<div className="text-justify flex flex-col justify-center xl:pt-40 xl:text-left h-full container mx-auto">
								<TypedTitle />
								<motion.p className="max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-48 xl:mb-16 text-slate-200">
									Dedicated to producing web designs that not only look stunning
									but also reflect the depth of experience I bring to every
									project. Welcome to the world I have crafted to this digital
									walls.
								</motion.p>
								<motion.div
									className="flex justify-center xl:hidden relative"
									variants={fadeVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									transition={{ delay: 1.3, duration: 0.4, ease: "easeInOut" }}
								>
									<Image
										Particle={Particle}
										motion={motion}
										fadeVariants={fadeVariants}
									/>
								</motion.div>
								<motion.div
									className="hidden xl:flex"
									variants={fadeVariants}
									initial="initial"
									animate="animate"
									exit="exit"
									transition={{ delay: 1.3, duration: 0.4, ease: "easeInOut" }}
								>
									<ProjectsBtn />
								</motion.div>
							</div>
						</div>
						<Image
							Particle={Particle}
							motion={motion}
							fadeVariants={fadeVariants}
						/>
					</div>
				</motion.div>
			
		</>
	);
};
