import { useDispatch } from "react-redux";
import {
	signInStart,
	signInFailure,
	signInSuccess,
} from "../redux/user/userSlice";

const useAuth = () => {
	const dispatch = useDispatch();

	const authUser = async () => {
		try {
			dispatch(signInStart());

			const response = await fetch(`/api/auth/verify-user`, {
				method: "POST",
			});

			const data = await response.json();

			if (data.error) {
				dispatch(signInFailure(data.error));
				throw new Error(data.error);
			}

			dispatch(signInSuccess(data.user));
			return true;
		} catch (e) {
			dispatch(signInFailure(e.message));
			return false;
		}
	};
	return { authUser };
};

export default useAuth;
