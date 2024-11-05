import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import {
	signInStart,
	signInFailure,
	signInSuccess,
} from "../redux/user/userSlice";

const useLogout = () => {
	const dispatch = useDispatch();

	const logout = async () => {
		try {
			dispatch(signInStart());

			const response = await fetch("/api/auth/signout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({}),
			});

			const data = await response.json();

			if (data.error) {
				dispatch(signInFailure(data.error));
				throw new Error(data.error);
			}

			dispatch(signInSuccess(null));

			toast.success(data.message);
		} catch (e) {
			dispatch(signInFailure(e.message));
			toast.error(e.message);
		}
	};
	return { logout };
};

export default useLogout;
