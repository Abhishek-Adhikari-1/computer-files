import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
	signInStart,
	signInFailure,
	signInSuccess,
} from "../redux/user/userSlice";

const useSignup = () => {
	const dispatch = useDispatch();

	const signup = async ({ fName, lName, email, password }, setInputs) => {
		const success = handleInputErrors({
			fName,
			lName,
			email,
			password,
		});
		if (!success) return;
		try {
			dispatch(signInStart());

			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					fName,
					lName,
					email,
					password,
				}),
			});

			const data = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			dispatch(signInSuccess(null));

			toast.success(data.message);
			setInputs({
				fName: "",
				lName: "",
				email: "",
				password: "",
			});
		} catch (e) {
			dispatch(signInFailure(e.message));
			toast.error(e.message);
		}
	};
	return { signup };
};

export default useSignup;

function handleInputErrors({ fName, lName, email, password }) {
	if (!email.trim() || !password.trim() || !fName.trim() || !lName.trim()) {
		toast.error("Please fill all the fields.");
		return false;
	}
	if (!email.trim().includes("@") || !email.trim().includes(".")) {
		toast.error("Please enter a valid email address.");
		return false;
	}
	return true;
}
