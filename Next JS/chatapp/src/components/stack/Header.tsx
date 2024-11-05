import React from "react";
import UserMenu from "./UserMenu";

const Header = () => {
	return (
		<div>
			<div className="glass-shine-effect h-fit w-fit rounded-full">
				<UserMenu />
			</div>
		</div>
	);
};

export default Header;
