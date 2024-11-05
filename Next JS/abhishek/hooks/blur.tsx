"use client";
import React from "react";

const Blur: React.FC = () => {
	React.useEffect(() => {
		const originalTitle = document.title || "Abhishek || Portfolio";

		const handleVisibilityChange = () => {
			if (document.hidden) {
				document.title = "Come back! 😭";
			} else {
				document.title = originalTitle;
			}
		};

		document.addEventListener("visibilitychange", handleVisibilityChange);

		return () => {
			document.removeEventListener(
				"visibilitychange",
				handleVisibilityChange
			);
		};
	}, []);

	return null;
};

export default Blur;
