import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
	const { currentUser } = useSelector((state) => state.user);

	if (!currentUser) {
		return <Navigate to="/home" />;
	}

	return currentUser ? <Outlet /> : <Navigate to="/home" />;
};

export default PrivateRoute;
