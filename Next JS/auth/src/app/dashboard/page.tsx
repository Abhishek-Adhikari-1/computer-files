import {
	getKindeServerSession,
	LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/server";

const Dashboard = async () => {
	const { isAuthenticated, getUser, getAccessToken } =
		getKindeServerSession();
	const isUserAuthenticated = await isAuthenticated();

	const accessToken = await getAccessToken();

	const user = await getUser();

	console.log(accessToken);

	return (
		<div>
			Dashboard
			<div>{isUserAuthenticated && <LogoutLink>Log out</LogoutLink>}</div>
			<div>User ID: {user?.id}</div>
			<div>
				Name: {user?.given_name} {user?.family_name}
			</div>
			<div>Email: {user?.email}</div>
			<div>Picture: {user?.picture}</div>
			<div>{JSON.stringify(user)}</div>
		</div>
	);
};

export default Dashboard;
