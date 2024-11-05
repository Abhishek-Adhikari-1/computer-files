// eslint-disable-next-line react/prop-types
export const Background = ({ children }) => {
	return (
		<div className="page bg-site text-white bg-cover bg-no-repeat min-w-full min-h-dvh h-screen">
			<div className="absolute left-0 top-0 mix-blend-color-dodge z-0 pointer-events-none w-[200px] lg:w-[400px] opacity-50">
				<img
					src="./top-left-img.png"
					draggable={false}
					width={400}
					height={400}
					alt=""
				/>
			</div>
			{children}
		</div>
	);
};
