"use client";
import { Input } from "@/components/main/Input";
import { AnimatePresence, motion } from "framer-motion";
import {
	PhoneCallIcon,
	MailCheckIcon,
	MapPinIcon,
	SendHorizonalIcon,
} from "lucide-react";
import React from "react";
import toast from "react-hot-toast";

const contactItems = [
	{
		title: "Call me",
		icon: <PhoneCallIcon width={"2rem"} height={"2rem"} />,
		info: "+977 9811343299",
	},
	{
		title: "E-mail",
		icon: <MailCheckIcon width={"2rem"} height={"2rem"} />,
		info: "adhikaryabhishek209@gmail.com",
	},
	{
		title: "Location",
		icon: <MapPinIcon width={"2rem"} height={"2rem"} />,
		info: "Madhyapurthimi-03, Kaushaltar",
	},
];

export default function Contact() {
	const [loading, setLoading] = React.useState(false);
	const [submitted, setSubmitted] = React.useState(false);

	const handleSubmit = async (e: any) => {
		setLoading(true);
		e.preventDefault();
		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					name: e.target.name.value,
					email: e.target.email.value,
					message: e.target.message.value,
				}),
			});

			if (!response.ok) {
				const data = await response.json();
				throw new Error(data.error);
			}

			const data = await response.json();
			toast.success(data.message, {
				duration: 2500,
			});
			setSubmitted(true);
			e.target.reset();
		} catch (err: any) {
			toast.error(err.message || "An unexpected error occurred");
		} finally {
			setTimeout(() => {
				setSubmitted(false);
			}, 500);
			setLoading(false);
		}
	};

	return (
		<AnimatePresence>
			<main className="flex h-full flex-col items-center justify-center lg:ps-10 lg:pr-28 sm:py-5 p-3">
				<section className="w-full h-auto relative lg:flex lg:justify-center lg:items-center flex-col">
					<div className="mx-auto transition-all duration-500 max-w-max text-center mb-4 lg:mb-0">
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
							Contact Me
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
							Get in touch
						</motion.span>
					</div>
					<div className="flex flex-col lg:flex-row h-full lg:flex lg:justify-center lg:items-center w-full lg:p-8 xl:p-16 max-w-screen-xl">
						<div className="flex lg:justify-evenly items-start flex-col lg:h-full lg:w-1/3 justify-center">
							{contactItems.map((item, index) => {
								return (
									<motion.div
										key={item.title + index}
										className="flex mb-4 justify-center items-center"
										initial={{ opacity: 0, x: -15 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: -15 }}
										transition={{
											type: "spring",
											duration: 1,
											ease: "easeInOut",
											delay: 1 + index * 0.2,
										}}
									>
										<div className="mr-4 text-[#5779e0] dark:text-[#6788e9]">
											{item.icon}
										</div>
										<motion.div>
											<motion.h3
												className="text-lg font-semibold text-gray-900 dark:text-gray-100"
												initial={{ opacity: 0, y: -15 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0, y: -15 }}
												transition={{
													type: "spring",
													duration: 1,
													ease: "easeInOut",
													delay:
														1 + index * 0.2 + 0.2,
												}}
											>
												{item.title}
											</motion.h3>
											<motion.div
												className="text-sm"
												initial={{ opacity: 0, x: 15 }}
												animate={{ opacity: 1, x: 0 }}
												exit={{ opacity: 0, x: 15 }}
												transition={{
													type: "spring",
													duration: 1,
													ease: "easeInOut",
													delay:
														1 + index * 0.2 + 0.1,
												}}
											>
												{item.info}
											</motion.div>
										</motion.div>
									</motion.div>
								);
							})}
						</div>
						<div className="transition-all duration-500 flex flex-col justify-center items-center lg:w-2/3 pb-24 lg:pb-0 pt-4 lg:pt-0">
							<form onSubmit={handleSubmit} className="w-full">
								{/* <div className="mb-6">
									<input
										type="text"
										name="name"
										className="w-full p-4 text-sm bg-[#e1e7fa] dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Your Name"
										required
									/>
								</div> */}

								<motion.div
									className="mb-6 lg:mb-8"
									initial={{ opacity: 0,x: -20 }}
									animate={{ opacity: 1,x: 0 }}
									exit={{ opacity: 0,x: -20 }}
									transition={{
										type: "spring",
										duration: 1,
										ease: "easeInOut",
										delay: 1.3,
									}}
								>
									<Input
										placeholders={[
											"Enter your name here",
											"Eg. John Doe",
										]}
										formSubmit={submitted}
										type="text"
										name="name"
									/>
								</motion.div>
								<motion.div
									className="mb-6 lg:mb-8"
									initial={{ opacity: 0,x: 20 }}
									animate={{ opacity: 1,x: 0 }}
									exit={{ opacity: 0,x: 20 }}
									transition={{
										type: "spring",
										duration: 1,
										ease: "easeInOut",
										delay: 1.6,
									}}
								>
									<Input
										placeholders={[
											"Enter your email here",
											"Eg. johndoe12@gmail.com",
										]}
										formSubmit={submitted}
										type="email"
										name="email"
									/>
								</motion.div>
								<motion.div
									className="mb-6 lg:mb-8"
									initial={{ opacity: 0, x: -20 }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{
										type: "spring",
										duration: 1,
										ease: "easeInOut",
										delay: 1.9,
									}}
								>
									<Input
										placeholders={[
											"Type your message here...",
											"Hello Sir, I am Ram. I need to contact you asap.",
											"How do you made this website?",
										]}
										formSubmit={submitted}
										type="text"
										name="message"
									/>
								</motion.div>

								{/* <div className="mb-6">
									<input
										type="email"
										name="email"
										className="w-full p-4 text-sm bg-[#e1e7fa] dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Your Email"
										required
									/>
								</div> */}

								{/* <div className="mb-6">
									<textarea
										name="message"
										className="w-full min-h-32 h-40 p-4 text-sm bg-[#e1e7fa] dark:bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
										placeholder="Your Message"
										required
									></textarea>
								</div> */}

								<motion.div
								className="flex justify-center select-none"
									initial={{ opacity: 0, y: -20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -20 }}
									transition={{
										type: "spring",
										duration: 1,
										ease: "easeInOut",
										delay: 2.1,
									}}
								>
									{loading ? (
										<button
											disabled={true}
											className="w-max px-4 cursor-not-allowed py-3 flex text-sm text-white bg-blue-500 dark:bg-blue-400 rounded-md hover:bg-blue-600 dark:hover:bg-blue-500"
										>
											<span className="mr-1">
												Loading ...
											</span>
										</button>
									) : (
										<button className="w-max px-4 py-3 flex text-sm text-white bg-blue-500 dark:bg-blue-400 rounded-md hover:bg-blue-600 dark:hover:bg-blue-500">
											<span className="mr-1">
												Send Message
											</span>
											<SendHorizonalIcon
												width={"1.2rem"}
												height={"!.2rem"}
											/>
										</button>
									)}
								</motion.div>
							</form>
						</div>
					</div>
				</section>
			</main>
		</AnimatePresence>
	);
}
