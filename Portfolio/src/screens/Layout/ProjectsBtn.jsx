import { UilArrowRight } from "@iconscout/react-unicons";
import { Link } from "react-router-dom";

export const ProjectsBtn = () => {
	return (
		<>
			<div className="mx-auto xl:mx-0">
				<Link
					to="/resume"
					className="relative w-[180px] h-[180px] flex justify-center items-center bg-circleStar bg-cover bg-center bg-no-repeat group"
				>
					<img
						src={"./rounded-text.png"}
						width={141}
						height={148}
						alt=""
						className="animate-spin-slow w-full h-full max-w-[141px] max-h-[148px] select-none"
						draggable={false}
					/>
					<UilArrowRight
						className="absolute text-slate-300 text-4xl group-hover:translate-x-2 transition-all duration-300"
						size={32}
					/>
				</Link>
			</div>
		</>
	);
};
