"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const AnimatedDiv = ({
	children,
	className,
	animation,
}: {
	children: React.ReactNode;
	className?: string;
	animation: string;
}) => {
	// const { scrollYProgress } = useScroll();

	// useEffect(() => {
	// 	console.log(scrollYProgress);
	// 	scrollYProgress.on("change", (latest) => {
	// 		console.log("Scroll progress:", latest);
	// 	});
	// }, [scrollYProgress]);
	const [scrollYProgress, setScrollYProgress] = useState<number>(0);

	useEffect(() => {
		setTimeout(() => {
			setScrollYProgress(1);
		}, 100);
	}, []);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true }}
				style={
					animation === "scaleX"
						? { scaleX: scrollYProgress }
						: { scaleY: scrollYProgress }
				}
				className={`transition-all ${className}`}
			>
				{children}
			</motion.div>
		</AnimatePresence>
	);
};

export default AnimatedDiv;
