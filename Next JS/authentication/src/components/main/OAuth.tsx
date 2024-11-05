"use client";
import { useTheme } from "next-themes";

export const OAuth = ({ isLoading }: { isLoading?: any }) => {
	if (isLoading)
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={"animate-spin"}
			>
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
		);
	return (
		<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 48 48">
			<defs>
				<path
					id="a"
					d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
				></path>
			</defs>
			<clipPath id="b">
				<use xlinkHref="#a" overflow="visible"></use>
			</clipPath>
			<path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z"></path>
			<path
				clipPath="url(#b)"
				fill="#EA4335"
				d="M0 11l17 13 7-6.1L48 14V0H0z"
			></path>
			<path
				clipPath="url(#b)"
				fill="#34A853"
				d="M0 37l30-23 7.9 1L48 0v48H0z"
			></path>
			<path
				clipPath="url(#b)"
				fill="#4285F4"
				d="M48 48L17 24l-4-3 35-10z"
			></path>
		</svg>
	);
};

export const GAuth = ({ isLoading }: { isLoading?: any }) => {
	const { resolvedTheme } = useTheme();

	if (isLoading)
		return (
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				className={"animate-spin"}
			>
				<path d="M21 12a9 9 0 1 1-6.219-8.56" />
			</svg>
		);

	return (
		<>
			<svg
				className="w-[1.35rem] h-[1.35rem]"
				fill="currentColor"
				viewBox="0 0 24 24"
			>
				{/* <circle cx="12" cy="13" r="11" fill="#FFFFFF"></circle> */}
				<path
					fillRule="evenodd"
					// fill="#0D1117"
					fill={resolvedTheme === "dark" ? "#FFFFFF" : "#0D1117"}
					d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.332-1.758-1.332-1.758-1.086-.744.084-.729.084-.729 1.205.085 1.838 1.238 1.838 1.238 1.067 1.835 2.801 1.305 3.487.998.108-.775.418-1.305.762-1.605-2.665-.3-5.467-1.335-5.467-5.93 0-1.31.467-2.38 1.235-3.22-.123-.303-.535-1.523.117-3.176 0 0 1.007-.322 3.3 1.23.957-.267 1.983-.4 3.003-.404 1.02.004 2.047.137 3.005.404 2.28-1.552 3.283-1.23 3.283-1.23.655 1.653.243 2.873.12 3.176.77.84 1.233 1.91 1.233 3.22 0 4.61-2.807 5.625-5.48 5.92.43.37.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .32.218.694.825.577C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
				></path>
			</svg>
		</>
	);
};
