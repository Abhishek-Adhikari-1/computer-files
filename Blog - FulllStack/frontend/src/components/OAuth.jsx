import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
	const auth = getAuth(app);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleGoogleAuth = async () => {
		const provider = new GoogleAuthProvider();
		provider.setCustomParameters({ prompt: "select_account" });

		try {
			const result = await signInWithPopup(auth, provider);

			const res = await fetch("/api/auth/google", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fName: result._tokenResponse.firstName,
					lName: result._tokenResponse.lastName,
					email: result._tokenResponse.email,
					photoUrl: result._tokenResponse.photoUrl,
					emailVerified: result.user.emailVerified,
				}),
			});

			const data = await res.json();

			if (data.error) {
				throw new Error(data.error);
			}

			if (res.ok) {
				dispatch(signInSuccess(data.user));
				toast.success(data.message);
				navigate("/home");
			}
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	return (
		<button
			onClick={handleGoogleAuth}
			type="button"
			className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
		>
			<span className="sr-only">Sign in with Google</span>
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
				<path
					clipPath="url(#b)"
					fill="#FBBC05"
					d="M0 37V11l17 13z"
				></path>
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
		</button>
	);
};

export default OAuth;
