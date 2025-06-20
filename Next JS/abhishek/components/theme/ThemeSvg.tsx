import React from "react";
import type { SVGProps } from "react";

export function SunToMoon(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.width}
			viewBox="0 0 24 24"
			{...props}
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<g strokeDasharray={2}>
					<path d="M12 21v1M21 12h1M12 3v-1M3 12h-1">
						<animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							dur="0.3s"
							values="4;2"
						></animate>
					</path>
					<path d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5">
						<animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							begin="0.3s"
							dur="0.3s"
							values="4;2"
						></animate>
					</path>
				</g>
				<path
					fill="currentColor"
					d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
					opacity={0}
				>
					<set attributeName="opacity" begin="0.75s" to={1}></set>
				</path>
			</g>
			<g fill="currentColor" fillOpacity={0}>
				<path d="m15.22 6.03l2.53-1.94L14.56 4L13.5 1l-1.06 3l-3.19.09l2.53 1.94l-.91 3.06l2.63-1.81l2.63 1.81z">
					<animate
						id="lineMdSunnyFilledLoopToMoonFilledLoopTransition0"
						fill="freeze"
						attributeName="fill-opacity"
						begin="0.9s;lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+9s"
						dur="0.6s"
						values="0;1"
					></animate>
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+3.3s"
						dur="0.6s"
						values="1;0"
					></animate>
				</path>
				<path d="M13.61 5.25L15.25 4l-2.06-.05L12.5 2l-.69 1.95L9.75 4l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+4.5s"
						dur="0.6s"
						values="0;1"
					></animate>
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+7.8s"
						dur="0.6s"
						values="1;0"
					></animate>
				</path>
				<path d="M19.61 12.25L21.25 11l-2.06-.05L18.5 9l-.69 1.95l-2.06.05l1.64 1.25l-.59 1.98l1.7-1.17l1.7 1.17z">
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+0.6s"
						dur="0.6s"
						values="0;1"
					></animate>
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+4.2s"
						dur="0.6s"
						values="1;0"
					></animate>
				</path>
				<path d="m20.828 9.731l1.876-1.439l-2.366-.067L19.552 6l-.786 2.225l-2.366.067l1.876 1.439L17.601 12l1.951-1.342L21.503 12z">
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+5.1s"
						dur="0.6s"
						values="0;1"
					></animate>
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="lineMdSunnyFilledLoopToMoonFilledLoopTransition0.begin+8.4s"
						dur="0.6s"
						values="1;0"
					></animate>
				</path>
			</g>
			<mask id="lineMdSunnyFilledLoopToMoonFilledLoopTransition1">
				<circle cx={12} cy={12} r={12} fill="#fff"></circle>
				<circle cx={22} cy={2} r={3} fill="#fff">
					<animate
						fill="freeze"
						attributeName="cx"
						begin="0.15s"
						dur="0.6s"
						values="22;18"
					></animate>
					<animate
						fill="freeze"
						attributeName="cy"
						begin="0.15s"
						dur="0.6s"
						values="2;6"
					></animate>
					<animate
						fill="freeze"
						attributeName="r"
						begin="0.15s"
						dur="0.6s"
						values="3;12"
					></animate>
				</circle>
				<circle cx={22} cy={2} r={1}>
					<animate
						fill="freeze"
						attributeName="cx"
						begin="0.15s"
						dur="0.6s"
						values="22;18"
					></animate>
					<animate
						fill="freeze"
						attributeName="cy"
						begin="0.15s"
						dur="0.6s"
						values="2;6"
					></animate>
					<animate
						fill="freeze"
						attributeName="r"
						begin="0.15s"
						dur="0.6s"
						values="1;10"
					></animate>
				</circle>
			</mask>
			<circle
				cx={12}
				cy={12}
				r={6}
				fill="currentColor"
				mask="url(#lineMdSunnyFilledLoopToMoonFilledLoopTransition1)"
			>
				<set attributeName="opacity" begin="0.75s" to={0}></set>
				<animate
					fill="freeze"
					attributeName="r"
					begin="0.15s"
					dur="0.6s"
					values="6;10"
				></animate>
			</circle>
		</svg>
	);
}

export function MoonToSun(props: SVGProps<SVGSVGElement>) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props.width}
			height={props.width}
			viewBox="0 0 24 24"
			{...props}
		>
			<g
				fill="none"
				stroke="currentColor"
				strokeDasharray={2}
				strokeDashoffset={2}
				strokeLinecap="round"
				strokeWidth={2}
			>
				<path d="M0 0">
					<animate
						fill="freeze"
						attributeName="d"
						begin="1.8s"
						dur="0.3s"
						values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
					></animate>
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						begin="1.8s"
						dur="0.3s"
						values="2;0"
					></animate>
				</path>
				<path d="M0 0">
					<animate
						fill="freeze"
						attributeName="d"
						begin="2.25s"
						dur="0.3s"
						values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
					></animate>
					<animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						begin="2.25s"
						dur="1.8s"
						values="2;0"
					></animate>
				</path>
				<animateTransform
					attributeName="transform"
					dur="45s"
					repeatCount="indefinite"
					type="rotate"
					values="0 12 12;360 12 12"
				></animateTransform>
			</g>
			<g fill="currentColor">
				<path d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z">
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						dur="0.6s"
						values="1;0"
					></animate>
				</path>
				<path d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z">
					<animate
						fill="freeze"
						attributeName="fill-opacity"
						begin="0.3s"
						dur="0.6s"
						values="1;0"
					></animate>
				</path>
			</g>
			<g
				fill="currentColor"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
			>
				<path d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"></path>
				<set attributeName="opacity" begin="0.9s" to={0}></set>
			</g>
			<mask id="lineMdMoonFilledToSunnyFilledLoopTransition0">
				<circle cx={12} cy={12} r={12} fill="#fff"></circle>
				<circle cx={18} cy={6} r={12} fill="#fff">
					<animate
						fill="freeze"
						attributeName="cx"
						begin="0.9s"
						dur="0.6s"
						values="18;22"
					></animate>
					<animate
						fill="freeze"
						attributeName="cy"
						begin="0.9s"
						dur="0.6s"
						values="6;2"
					></animate>
					<animate
						fill="freeze"
						attributeName="r"
						begin="0.9s"
						dur="0.6s"
						values="12;3"
					></animate>
				</circle>
				<circle cx={18} cy={6} r={10}>
					<animate
						fill="freeze"
						attributeName="cx"
						begin="0.9s"
						dur="0.6s"
						values="18;22"
					></animate>
					<animate
						fill="freeze"
						attributeName="cy"
						begin="0.9s"
						dur="0.6s"
						values="6;2"
					></animate>
					<animate
						fill="freeze"
						attributeName="r"
						begin="0.9s"
						dur="0.6s"
						values="10;1"
					></animate>
				</circle>
			</mask>
			<circle
				cx={12}
				cy={12}
				r={10}
				fill="currentColor"
				mask="url(#lineMdMoonFilledToSunnyFilledLoopTransition0)"
				opacity={0}
			>
				<set attributeName="opacity" begin="0.9s" to={1}></set>
				<animate
					fill="freeze"
					attributeName="r"
					begin="0.9s"
					dur="0.6s"
					values="10;6"
				></animate>
			</circle>
		</svg>
	);
}