import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import useLogin from "../../hooks/useLogin";
import { useSelector } from "react-redux";
import OAuth from "../../components/OAuth";
import GAuth from "../../components/GAuth";

// eslint-disable-next-line react/prop-types
const SignIn = ({ toggleSignIn }) => {
	const { login } = useLogin();
	const { loading, currentUser } = useSelector((state) => state.user);

	const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		await login(inputs, setInputs);
	};

	return (
		<>
			{currentUser ? (
				<Navigate to={"/home"} />
			) : (
				<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-10 lg:px-8 bg-white max-w-full sm:max-w-md sm:mx-auto my-5 mx-4 rounded-xl">
					<div className="sm:mx-auto sm:w-full sm:max-w-sm">
						<img
							className="mx-auto h-7 w-auto rounded-full ring-8 ring-indigo-500 bg-indigo-500 select-none"
							src="./logo.svg"
							alt="Logo"
							draggable={false}
						/>
						<h2 className="mt-2 text-center text-2xl leading-9 tracking-tight text-gray-600">
							Sign in to your account
						</h2>
					</div>

					<div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
						<form onSubmit={handleFormSubmit}>
							<div>
								<div className="flex -mx-3">
									<div className="w-full px-3 mb-1">
										<label
											htmlFor=""
											className="text-xs font-semibold px-1"
										>
											Email
										</label>
										<div className="flex">
											<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="text-gray-400 w-6 h-6"
													viewBox="0 0 16 16"
												>
													<path d="M2 2a2 2 0 0 0-2 2v8.01A2 2 0 0 0 2 14h5.5a.5.5 0 0 0 0-1H2a1 1 0 0 1-.966-.741l5.64-3.471L8 9.583l7-4.2V8.5a.5.5 0 0 0 1 0V4a2 2 0 0 0-2-2zm3.708 6.208L1 11.105V5.383zM1 4.217V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v.217l-7 4.2z" />
													<path d="M14.247 14.269c1.01 0 1.587-.857 1.587-2.025v-.21C15.834 10.43 14.64 9 12.52 9h-.035C10.42 9 9 10.36 9 12.432v.214C9 14.82 10.438 16 12.358 16h.044c.594 0 1.018-.074 1.237-.175v-.73c-.245.11-.673.18-1.18.18h-.044c-1.334 0-2.571-.788-2.571-2.655v-.157c0-1.657 1.058-2.724 2.64-2.724h.04c1.535 0 2.484 1.05 2.484 2.326v.118c0 .975-.324 1.39-.639 1.39-.232 0-.41-.148-.41-.42v-2.19h-.906v.569h-.03c-.084-.298-.368-.63-.954-.63-.778 0-1.259.555-1.259 1.4v.528c0 .892.49 1.434 1.26 1.434.471 0 .896-.227 1.014-.643h.043c.118.42.617.648 1.12.648m-2.453-1.588v-.227c0-.546.227-.791.573-.791.297 0 .572.192.572.708v.367c0 .573-.253.744-.564.744-.354 0-.581-.215-.581-.8Z" />
												</svg>
											</div>
											<input
												type="email"
												name="email"
												className="placeholder:select-none w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
												placeholder="johnsmith@example.com"
												value={inputs?.email}
												onInput={(e) => {
													const sanitizedValue =
														e.target.value
															.toLowerCase()
															.replace(/\s/g, "");
													setInputs({
														...inputs,
														email: sanitizedValue,
													});
												}}
											/>
										</div>
									</div>
								</div>
								<div className="flex -mx-3 mt-3">
									<div className="w-full px-3 mb-5">
										<div className="flex justify-between mb-1">
											<label
												htmlFor=""
												className="text-xs font-semibold px-1"
											>
												Password
											</label>
											<Link
												onClick={toggleSignIn}
												to={""}
												className="text-xs font-semibold text-indigo-600 hover:text-indigo-500 hover:underline"
											>
												Forgot password?
											</Link>
										</div>
										<div className="flex">
											<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="16"
													height="16"
													fill="currentColor"
													className="text-gray-400 w-7 h-7"
													viewBox="0 0 16 16"
												>
													<path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
													<path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
												</svg>
											</div>
											<input
												type="password"
												name="password"
												className="placeholder:select-none w-full -ml-10 pl-10 pr-3 py-2 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
												placeholder="************"
												value={inputs?.password}
												onInput={(e) => {
													setInputs({
														...inputs,
														password:
															e.target.value,
													});
												}}
											/>
										</div>
									</div>
								</div>
								<div className="flex -mx-3">
									<div className="w-full px-3">
										{loading ? (
											<button
												type="button"
												className="cursor-not-allowed select-none flex items-center justify-center w-full max-w-xs mx-auto bg-indigo-400 hover:bg-indigo-300 text-white rounded-md px-3 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
											>
												<div className="border-2 border-white h-6 w-6 animate-spin rounded-full border-t-blue-600" />
											</button>
										) : (
											<button
												type="submit"
												className="select-none block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-md px-3 py-3 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											>
												<span>SIGN IN</span>
											</button>
										)}
									</div>
								</div>
							</div>
						</form>
						<div className="mt-3">
							<div className="relative">
								<div className="absolute inset-0 flex items-center">
									<div className="w-full border-t border-gray-300"></div>
								</div>
								<div className="relative flex justify-center text-sm">
									<span className="px-2 bg-white text-gray-500">
										Or continue with
									</span>
								</div>
							</div>

							<div className="mt-3 grid grid-cols-2 gap-3">
								<div>
									<OAuth />
								</div>
								<div>
									<GAuth />
								</div>
							</div>
						</div>
						<p className="mt-2 text-center text-sm text-gray-500">
							Don&apos;t have an account?{" "}
							<Link
								onClick={toggleSignIn}
								to="/signup"
								className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
							>
								Sign Up
							</Link>
						</p>
					</div>
				</div>
			)}
		</>
	);
};

export default SignIn;
