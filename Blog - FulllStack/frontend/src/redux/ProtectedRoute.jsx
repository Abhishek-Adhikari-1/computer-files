import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
	const { currentUser } = useSelector((state) => state.user);

	if (!currentUser) {
		return <Navigate to="/home" />;
	}

	return currentUser.role !== "user" ? (
		<Outlet />
	) : (
		<Navigate to="/signin" />
	);
};

export default ProtectedRoute;
