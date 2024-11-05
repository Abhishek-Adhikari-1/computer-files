import { toast } from "react-hot-toast";

const useVerifyEmail = () => {
	const verifyEmail = async (location) => {
		try {
			const response = await fetch("/api/auth/new-account", {
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					verifyIdLink: location,
				}),
			});

			const data = await response.json();

			if (data.error) {
				throw new Error(data.error);
			}

			toast.success(data.message);

			return true;
		} catch (e) {
			toast.error(e.message);
			return false;
		}
	};
	return { verifyEmail };
};

export default useVerifyEmail;
