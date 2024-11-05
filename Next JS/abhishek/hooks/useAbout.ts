"use client";
import React from "react";

const useAbout = () => {
	const [age, setAge] = React.useState({
		years: 0,
		days: 0,
		months: 0,
		expYears: 0,
	});

	React.useEffect(() => {
		const ageCalculate = () => {
			const today = new Date();
			var d1 = 16;
			var m1 = 7;
			var y1 = 2004;
			var d2 = today.getDate();
			var m2 = today.getMonth() + 1;
			var y2 = today.getFullYear();
			var month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			var d3 = 6;
			var m3 = 4;
			var y3 = 2021;

			if (d1 > d2) {
				d2 += month[m2 - 1];
				m2 = m2 - 1;
			}
			if (m1 > m2) {
				m2 = m2 + 12;
				y2 = y2 - 1;
			}
			if (d3 > d2) {
				d3 += month[m3 - 1];
				m3 = m3 - 1;
			}
			if (m3 > m2) {
				m3 = m3 + 12;
				y3 = y3 - 1;
			}

			setAge({
				years: y2 - y1,
				days: d2 - d1,
				months: m2 - m1,
				expYears: y2 - y3,
			});
		};
		ageCalculate();
	}, []);

	return { age };
};

export default useAbout;
