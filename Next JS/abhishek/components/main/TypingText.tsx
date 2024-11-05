"use client";
import React from "react";
import Typed from "typed.js";

interface TypingTextProps {
	text: string[];
}

const TypingText: React.FC<TypingTextProps> = ({ text }) => {
	const el = React.useRef(null);
	React.useEffect(() => {
		const typed = new Typed(el.current, {
			strings: text,
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
	}, [text]);
	return (
		<div className="flex flex-row items-center leading-[48px]">
			<div
				className="text-blue-500 dark:text-blue-400 text-2xl font-medium mt-1 mb-3"
				ref={el}
			></div>
		</div>
	);
};

export default TypingText;
