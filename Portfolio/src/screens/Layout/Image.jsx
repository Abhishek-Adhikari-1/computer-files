// eslint-disable-next-line react/prop-types
const Image = ({ Particle, motion, fadeVariants }) => {
	return (
		<>
			<div className="hidden xl:flex">
				<div className="w-[1200px] h-full absolute right-0 bottom-0 select-none pointer-events-none">
					<div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0 transition-none"></div>
					<Particle />
					<motion.div
						variants={fadeVariants}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ delay: 1.1, duration: 0.7, ease: "easeInOut" }}
						className="w-full h-full max-w-[537px] max-h-[478px] absolute bottom-16 right-[9%]"
					>
						<div className="hidden xl:flex xl:max-w-none">
							<img
								src="./pic.png"
								width={537}
								height={478}
								alt=""
								draggable={false}
								className="select-none translate-z-0 w-full h-full"
							/>
						</div>
					</motion.div>
				</div>
			</div>
			<div className="xl:hidden">
				<div className="w-full h-full absolute left-0 bottom-0 select-none pointer-events-none">
					<div className="opacity-20 xl:bg-none bg-explosion bg-cover bg-right bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0 transition-none"></div>
					<Particle />
					<div className="w-full h-full max-w-[250px] max-h-[300px] absolute bottom-0 right-[17%]">
						<div className=" xl:hidden max-w-none">
							<img
								src="./pic.png"
								width={250}
								height={300}
								alt=""
								draggable={false}
								className="select-none translate-z-0 w-full h-full max-w-none absolute top-0 left-0"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Image;
