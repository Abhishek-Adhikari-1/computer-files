import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function PlaceholdersAndVanishInput({
	placeholders,
	onChange,
	onSubmit,
	formSubmit,
	type,
	name,
}: {
	placeholders: string[];
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	formSubmit: boolean;
	type?: string;
	name?: string;
}) {
	const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
	const [isFocus, setIsFocus] = useState(false);
	const [canvasWidth, setCanvasWidth] = useState(800);
	const [canvasHeight, setCanvasHeight] = useState(800);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const newDataRef = useRef<any[]>([]);
	const inputRef = useRef<HTMLInputElement>(null);
	const [value, setValue] = useState("");
	const [animating, setAnimating] = useState(false);
	const divRef = useRef<HTMLDivElement>(null); // Ref for the div

	// Start animation for placeholder cycling
	const startAnimation = () => {
		intervalRef.current = setInterval(() => {
			setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
		}, 5000);
	};

	const handleVisibilityChange = () => {
		if (document.visibilityState !== "visible" && intervalRef.current) {
			clearInterval(intervalRef.current); // Clear the interval when the tab is not visible
			intervalRef.current = null;
		} else if (document.visibilityState === "visible") {
			startAnimation(); // Restart the interval when the tab becomes visible
		}
	};

	useEffect(() => {
		startAnimation();
		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange
			);
		};
	}, [placeholders]);

	// Set canvas width to match div width
	useEffect(() => {
		if (divRef.current) {
			setCanvasWidth(divRef.current.offsetWidth - 35);
			setCanvasHeight(divRef.current.offsetHeight - 15);
		}
	}, []);

	const draw = useCallback(() => {
		if (!inputRef.current) return;
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
		ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		const computedStyles = getComputedStyle(inputRef.current);

		const fontSize = parseFloat(
			computedStyles.getPropertyValue("font-size")
		);
		ctx.font = `${fontSize}px ${computedStyles.fontFamily}`;
		ctx.fillStyle = "#FFF";
		ctx.fillText(value, 8, 20);

		const imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
		const pixelData = imageData.data;
		const newData: any[] = [];

		for (let t = 0; t < canvasHeight; t++) {
			let i = 4 * t * canvasWidth;
			for (let n = 0; n < canvasWidth; n++) {
				let e = i + 4 * n;
				if (
					pixelData[e] !== 0 &&
					pixelData[e + 1] !== 0 &&
					pixelData[e + 2] !== 0
				) {
					newData.push({
						x: n,
						y: t,
						color: [
							pixelData[e],
							pixelData[e + 1],
							pixelData[e + 2],
							pixelData[e + 3],
						],
					});
				}
			}
		}

		newDataRef.current = newData.map(({ x, y, color }) => ({
			x,
			y,
			r: 1,
			color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3]})`,
		}));
	}, [value, canvasWidth, canvasHeight]);

	useEffect(() => {
		draw();
	}, [value, draw]);

	const animate = (start: number) => {
		const animateFrame = (pos: number = 0) => {
			requestAnimationFrame(() => {
				const newArr = [];
				for (let i = 0; i < newDataRef.current.length; i++) {
					const current = newDataRef.current[i];
					if (current.x < pos) {
						newArr.push(current);
					} else {
						if (current.r <= 0) {
							current.r = 0;
							continue;
						}
						current.x += Math.random() > 0.5 ? 1 : -1;
						current.y += Math.random() > 0.5 ? 1 : -1;
						current.r -= 0.05 * Math.random();
						newArr.push(current);
					}
				}
				newDataRef.current = newArr;
				const ctx = canvasRef.current?.getContext("2d");
				if (ctx) {
					ctx.clearRect(pos, 0, canvasWidth, canvasHeight);
					newDataRef.current.forEach((t) => {
						const { x: n, y: i, r: s, color: color } = t;
						if (n > pos) {
							ctx.beginPath();
							ctx.rect(n, i, s, s);
							ctx.fillStyle = color;
							ctx.strokeStyle = color;
							ctx.stroke();
						}
					});
				}
				if (newDataRef.current.length > 0) {
					animateFrame(pos - 8);
				} else {
					setValue("");
					setAnimating(false);
				}
			});
		};
		animateFrame(start);
	};

	const vanishAndSubmit = () => {
		setAnimating(true);
		draw();

		const value = inputRef.current?.value || "";
		if (value && inputRef.current) {
			const maxX = newDataRef.current.reduce(
				(prev, current) => (current.x > prev ? current.x : prev),
				0
			);
			animate(maxX);
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		vanishAndSubmit();
		if (onSubmit) onSubmit(e);
	};

	useEffect(() => {
		if (formSubmit) {
			vanishAndSubmit();
		}
	}, [formSubmit]);

	return (
		<div
			ref={divRef}
			className={cn(
				isFocus
					? "outline-none ring-2 ring-blue-500"
					: "outline-none ring-0 ring-transparent",
				"w-full relative bg-[#e1e7fa] dark:bg-gray-800 rounded-md mx-auto min-h-12 h-full overflow-hidden shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),_0px_1px_0px_0px_rgba(25,28,33,0.02),_0px_0px_0px_1px_rgba(25,28,33,0.08)] transition duration-200"
			)}
		>
			<canvas
				className={cn(
					"absolute pointer-events-none text-base transform scale-100 top-[20%] left-2 origin-top-left pr-5",
					!animating ? "opacity-0 -z-10" : "opacity-100 z-50"
				)}
				ref={canvasRef}
			/>

			<input
				onChange={(e) => {
					if (!animating) {
						setValue(e.target.value);
						onChange && onChange(e);
					}
				}}
				onFocus={() => {
					setIsFocus(true);
				}}
				onBlur={() => {
					setIsFocus(false);
				}}
				ref={inputRef}
				value={value}
				required
				type={type}
				name={name}
				className={cn(
					"w-full min-h-12 relative text-sm sm:text-base z-50 border-none dark:text-white bg-transparent text-black h-full rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500 px-4",
					animating && "text-transparent dark:text-transparent -z-10"
				)}
			/>

			<div className="absolute inset-0 flex items-center rounded-full pointer-events-none">
				<AnimatePresence mode="wait">
					{!value && (
						<motion.p
							initial={{
								y: 5,
								opacity: 0,
							}}
							key={`current-placeholder-${currentPlaceholder}`}
							animate={{
								y: 0,
								opacity: 1,
							}}
							exit={{
								y: -15,
								opacity: 0,
								transition: { duration: 0.2 },
							}}
							transition={{
								duration: 0.3,
								ease: "linear",
							}}
							className="dark:text-zinc-500 text-sm sm:text-base font-normal text-neutral-500 pl-4 text-left w-[calc(100%-2rem)] truncate select-none"
						>
							{placeholders[currentPlaceholder]}
						</motion.p>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
}
