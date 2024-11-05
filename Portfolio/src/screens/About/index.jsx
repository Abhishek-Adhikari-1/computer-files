import { motion, AnimatePresence } from "framer-motion";

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

export const About = () => {
	return (
		<>
			<AnimatePresence mode="wait">
				<motion.div
					variants={transitionVariants}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ delay: 1.1, duration: 0.5, ease: "easeInOut" }}
					className="opacity-0"
				>
					About
				</motion.div>
			</AnimatePresence>
		</>
	);
};
