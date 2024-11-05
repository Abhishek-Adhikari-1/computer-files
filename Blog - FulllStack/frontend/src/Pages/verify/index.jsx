import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useVerifyEmail from "../../hooks/useVerifyEmail";

const VerifyEmail = () => {
	const { verifyEmail } = useVerifyEmail();
	const location = useLocation().pathname.split("/").pop();
	const navigate = useNavigate();

	useEffect(() => {
		const myFunc = async () => {
			const result = await verifyEmail(location);
			if (result || !result) {
				navigate("/home");
			}
		};

		myFunc();
	}, [location, navigate, verifyEmail]);

	return (
		<>
			<div
				id="verify-email-section"
				className="h-screen flex items-center justify-center"
			>
				<div className="border-8 border-white h-32 w-32 animate-spin rounded-full border-t-blue-600" />
			</div>
		</>
	);
};

export default VerifyEmail;
