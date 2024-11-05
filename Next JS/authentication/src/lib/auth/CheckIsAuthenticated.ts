import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";
// import { getSession } from "next-auth/react";

const CheckIsAuthenticated = () => {
	console.log(getServerSession(authOptions));
	return null;
};

export default CheckIsAuthenticated;
