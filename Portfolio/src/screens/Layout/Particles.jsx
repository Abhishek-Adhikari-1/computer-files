import { Particles, initParticlesEngine } from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";
import particlesOptions from "./particleOptions.json";

export const Particle = () => {
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
					className="w-full h-full absolute translate-z-0"
					options={particlesOptions}
				/>
			)}
		</>
	);
};
