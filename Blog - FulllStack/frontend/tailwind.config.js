/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			screens: {
				tall: { raw: "(max-width: 767px)" },
				xs: { raw: "(max-width: 370px)" },
			},
			keyframes: {
				spinX: {
					"0%": {
						transform: "rotateX(35deg) rotateY(55deg) rotateZ(0deg)",
					},
					"100%": {
						transform: "rotateX(35deg) rotateY(55deg) rotateZ(360deg)",
					},
				},
				spinY: {
					"0%": {
						transform: "rotateX(35deg) rotateY(-45deg) rotateZ(0deg)",
					},
					"100%": {
						transform: "rotateX(35deg) rotateY(-45deg) rotateZ(360deg)",
					},
				},
				spinZ: {
					"0%": {
						transform: "rotateX(50deg) rotateY(10deg) rotateZ(0deg)",
					},
					"100%": {
						transform: "rotateX(50deg) rotateY(-10deg) rotateZ(360deg)",
					},
				},
			},
			animation: {
				spinX: "spinX 2s linear infinite",
				spinY: "spinY 2s linear infinite",
				spinZ: "spinZ 2s linear infinite",
			},
		},
	},
	plugins: [import("@tailwindcss/line-clamp")],
};
