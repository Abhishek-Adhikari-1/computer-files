"use client";

import * as React from "react";
import { useScroll, motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import { ChevronUpIcon } from "lucide-react";

export const ScrollProvider = ({ children }: { children: React.ReactNode }) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const { scrollY } = useScroll({
		container: carouselRef,
	});
	const [scrollYPos, setScrollYPos] = React.useState<number>(0);

	React.useEffect(() => {
		scrollY.on("change", (latest) => {
			setScrollYPos(latest);
		});
		return () => {
			scrollY.stop();
		};
	}, [scrollY]);

	// Scroll to top function
	const scrollToTop = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollTo({
				top: 0,
				behavior: "smooth",
			});
		}
	};

	return (
		<div
			ref={carouselRef}
			className="flex flex-col w-[86%] sm:w-[90%] md:w-[92%] lg:w-[84%] xl:w-[86%] hobve bg-[#EFF2F5] dark:bg-zinc-900 overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-slate-400 scrollbar-track-slate-300 dark:scrollbar-thumb-neutral-700 dark:scrollbar-track-neutral-800"
		>
			<Navbar scrollYPos={scrollYPos} />
			{children}
			<AnimatePresence mode="wait">
				{scrollYPos >= 130 && (
					<motion.div
						initial={{ opacity: 0, y: 300 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 300 }}
						transition={{ duration: 0.4, ease: "easeOut" }}
						onClick={scrollToTop}
						className="fixed bottom-3 right-3 sm:right-5 lg:right-7 text-white cursor-pointer bg-foreground/15 dark:bg-foreground/20 p-2 backdrop-blur-md rounded-full"
					>
						<ChevronUpIcon />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
