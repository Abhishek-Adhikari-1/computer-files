"use client";

import Image from "next/image";
import NextVideo from "next-video";
import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface CardProps {
	title?: string;
	src?: string | any;
	tag?: string;
	more?: string;
	type?: "image" | "video" | string;
}

export function Card({
	title = "Title",
	src = "/back",
	tag = "Tag",
	more = "Demo",
	type = "image",
}: CardProps) {
	var source =
		type === "video"
			? `/_next-video/${src?.originalFilePath?.split("/").pop()}`
			: `/_next/image?url=${src}&w=3840&q=100`;
	return (
		<CardContainer>
			<div className="absolute h-full w-full border rounded-xl backdrop-blur-[3px] bg-transparent"></div>
			<CardBody className="bg-background/[0.15] relative group/card hover:shadow-2xl hover:shadow-emerald-500/30 dark:hover:shadow-2xl dark:hover:shadow-emerald-500/20 dark:border-white/[0.2] border-black/[0.1] w-auto sm:max-w-[18rem] h-auto rounded-xl p-4 border ">
				<CardItem
					translateZ={50}
					translateY={-7}
					className="text-xl font-bold text-neutral-600 dark:text-white"
				>
					{title}
				</CardItem>

				<CardItem translateZ={70} scale={1.1} className="w-full">
					{type === "image" && (
						<Image
							src={src}
							height="1000"
							width="1000"
							quality={100}
							layout="responsive"
							draggable={false}
							className="max-h-40 h-auto w-full object-cover group-hover/card:shadow-xl select-none mt-3"
							alt="thumbnail"
						/>
					)}
					{type === "video" && (
						<NextVideo
							src={src}
							poster={"/loader.gif"}
							className="object-cover rounded-xl group-hover:card:shadow-xl select-none mt-2"
							muted
							autoPlay
							loop
							controls={false}
							
						/>
					)}
				</CardItem>
				<div className="flex justify-between items-center mt-2">
					<CardItem
						translateZ={20}
						translateX={-10}
						as={Link}
						href={source}
						className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white hover:tracking-[0.35em] transition-all duration-300"
					>
						{more}
						{" →"}
					</CardItem>
					<Badge variant="secondary">{tag}</Badge>
				</div>
			</CardBody>
		</CardContainer>
	);
}

// "use client";

// import Image from "next/image";
// import React from "react";
// import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
// import Link from "next/link";

// export function Card({ title = "Title" }: { title?: string }) {
// 	return (
// 		<CardContainer className="inter-var">
// 			<CardBody className="bg-background/[0.2] relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[18rem] h-auto rounded-xl p-6 border  ">
// 				<CardItem
// 					translateZ="50"
// 					className="text-xl font-bold text-neutral-600 dark:text-white"
// 				>
// 					{title}
// 				</CardItem>
// 				<CardItem
// 					as="p"
// 					translateZ="60"
// 					className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
// 				>
// 					Hover over this card to unleash the power of CSS perspective
// 				</CardItem>
// 				<CardItem translateZ="100" className="w-full mt-4">
// 					<Image
// 						src=""
// 						height="1000"
// 						width="1000"
// 						className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
// 						alt="thumbnail"
// 					/>
// 				</CardItem>
// 				<div className="flex justify-between items-center mt-20">
// 					<CardItem
// 						translateZ={20}
// 						as={Link}
// 						href="https://twitter.com/mannupaaji"
// 						target="__blank"
// 						className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
// 					>
// 						Demo →
// 					</CardItem>
// 				</div>
// 			</CardBody>
// 		</CardContainer>
// 	);
// }
