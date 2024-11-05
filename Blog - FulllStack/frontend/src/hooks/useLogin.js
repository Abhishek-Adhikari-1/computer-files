import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
	signInStart,
	signInFailure,
	signInSuccess,
} from "../redux/user/userSlice";

const useLogin = () => {
	const dispatch = useDispatch();

	const login = async ({ email, password }, setInputs) => {
		const success = handleInputErrors({
			email,
			password,
		});
		if (!success) return;
		try {
			dispatch(signInStart());

			const response = await fetch("/api/auth/signin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (data.error) {
				dispatch(signInFailure(data.error));
				throw new Error(data.error);
			}

			dispatch(signInSuccess(data.user));

			toast.success(data.message);
			setInputs({ email: "", password: "" });
		} catch (e) {
			dispatch(signInFailure(e.message));
			toast.error(e.message);
		}
	};
	return { login };
};

export default useLogin;

function handleInputErrors({ email, password }) {
	if (!email.trim() || !password.trim()) {
		toast.error("Please fill all the fields.");
		return false;
	}
	if (!email.trim().includes("@") || !email.trim().includes(".")) {
		toast.error("Please enter a valid email address.");
		return false;
	}
	return true;
}
