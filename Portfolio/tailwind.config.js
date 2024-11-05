/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		container: {
			padding: {
				DEFAULT: "15px",
			},
		},
		screens: {
			sm: "640px",
			md: "768px",
			lg: "960px",
			xl: "1200px",
		},
		extend: {
			fontFamily: {
				poppins: ["Poppins", "sans-serif"],
			},
			colors: {
				primary: "#131424",
				secondary: "#393A47",
				accent: "#E6180A",
			},
			backgroundImage: {
				explosion: 'url("/t1pfdaz8.png")',
				circles: 'url("/bg-circles.png")',
				circleStar: 'url("/circle-star.svg")',
				site: 'url("/site-bg.svg")',
			},
			animation: {
				"spin-slow": "spin 6s linear infinite",
			},
		},
	},
	container: {
		padding: {
			DEFAULT: "15px",
		},
	},
	plugins: [],
};
