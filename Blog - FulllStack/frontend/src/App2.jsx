import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./Pages/Header/index";
import Footer from "./Pages/Footer/index";
import useAuth from "./hooks/useAuth";

const Home = lazy(() => import("./Pages/Home/index"));
const About = lazy(() => import("./Pages/About/index"));
const Projects = lazy(() => import("./Pages/Projects/index"));
const SignIn = lazy(() => import("./Pages/SignIn/index"));
const SignUp = lazy(() => import("./Pages/SignUp/index"));
const Dashboard = lazy(() => import("./Pages/Dashboard/index"));
const Profile = lazy(() => import("./Pages/Profile/index"));
import VerifyEmail from "./Pages/verify/index";
import ProtectedRoute from "./redux/ProtectedRoute";
import PrivateRoute from "./redux/PrivateRoute";

const App2 = () => {
	const { authUser } = useAuth();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchAuthUser = async () => {
			await authUser();
			setLoading(false);
		};

		fetchAuthUser();
	}, [authUser]);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<BrowserRouter>
			<Header />
			<Suspense fallback={<div>Loading...</div>}>
				<Routes>
					<Route path="/home" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/signup" element={<SignUp />} />
					<Route
						path="/new-account/verifyId/:verifyIdLink"
						element={<VerifyEmail />}
					/>
					<Route exact path="/" element={<Navigate to="/home" />} />
					<Route element={<PrivateRoute />}>
						<Route element={<ProtectedRoute />}>
							<Route path="/dashboard" element={<Dashboard />} />
						</Route>
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Routes>
			</Suspense>
			<Footer />
		</BrowserRouter>
	);
};

export default App2;
