"use client";
import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";

export const Particle = ({ className }) => {
	const [init, setInit] = useState(false);

	useEffect(() => {
		if (init) {
			return;
		}

		initParticlesEngine(async (engine) => {
			await loadFull(engine);
		}).then(() => {
			setInit(true);
		});
	}, [init]);

	return (
		<>
			{init && (
				<Particles
					id="tsparticles"
					className={`w-full h-full translate-z-0 -z-10 fixed top-0 left-0 ${className}`}
					options={{
						fullScreen: { enable: false },
						background: { color: { value: "" } },
						fps_limit: 120,
						interactivity: {
							events: {
								onClick: { enable: true, mode: "repulse" },
								onHover: { enable: true, mode: "attract" },
								resize: true,
							},
							modes: {
								push: { quantity: 5 },
								repulse: { distance: 120, duration: 4 },
								attract: {
									distance: 200,
									duration: 0.4,
									easing: "ease-out-quad",
									maxSpeed: 50,
									speed: 1,
									factor: 1,
								},
							},
						},
						particles: {
							color: { value: "#60a5fa" },
							links: {
								color: "#93c5fd",
								distance: 150,
								enable: true,
								opacity: 0.5,
								width: 1,
							},
							collisions: { enable: true },
							move: {
								direction: "none",
								enable: true,
								outModes: { default: "bounce" },
								speed: 1.5,
								random: true,
								straight: false,
							},
							number: {
								density: { enable: true, area: 800 },
								value: 170,
							},
							opacity: { value: 0.5 },
							shape: { type: "circle" },
							size: { value: { min: 1, max: 5 } },
						},
						detectRetina: true,
					}}
				/>
			)}
		</>
	);
};
