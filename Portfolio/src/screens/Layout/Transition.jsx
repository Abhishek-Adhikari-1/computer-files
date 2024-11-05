import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const transitionVariants = {
	open: {
		clipPath: `circle(150% at 0% 0%)`,
		transition: {
			type: "spring",
			stiffness: 40,
			restDelta: 20,
		},
	},
	closed: {
		clipPath: "circle(0% at 0% 0%)",
		transition: {
			delay: 0.15,
			type: "spring",
			stiffness: 400,
			damping: 40,
		},
	},
};

const Transition = () => {
	const location = useLocation();
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		setIsOpen(true);
		const timeoutId = setTimeout(() => setIsOpen(false), 700);
		return () => clearTimeout(timeoutId);
	}, [location.key]);

	return (
		<AnimatePresence mode="popLayout">
			<motion.div
				key={location.key}
				className="h-full bg-[#2e2257] absolute z-50 top-0 left-0 w-full"
				variants={transitionVariants}
				initial={false}
				animate={isOpen ? "open" : "closed"}
			></motion.div>
		</AnimatePresence>
	);
};

export default Transition;
