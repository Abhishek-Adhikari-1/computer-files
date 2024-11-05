import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../../models/user.model.js";

const verifyUser = async (req, res) => {
	try {
		const verifyIdLink =
			req.cookies.fsdi ||
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJOalkyWTJWa00yWmhNV1ZrTWpnPSIsImlhdCI6MTcxODE4MDI0NCwiZXhwIjoxNzE5NDc2MjQ0fQ.2ww595-hXAqPJCKCtIoQ9LZHaOMHtWX1gS2zqxeUTmk";

		const decoded = jwt.verify(verifyIdLink, process.env.JWT_SECRET);

		if (!decoded || !decoded?.userId) {
			return res
				.status(401)
				.json({ error: "Token is invalid or expired" });
		}
		// console.log(Buffer.from("666ced3fa1ed28").toString("base64"));
		const userId = Buffer.from(decoded.userId, "base64").toString("utf-8");

		if (!mongoose.Types.ObjectId.isValid(userId)) {
			return res.status(200).json({ error: "User not found" });
		}

		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		if (!user.verify.verifyId) {
			return res.status(401).json({
				error: "Email address verification required. Check your mail to verify address",
			});
		}

		if (user && user.verify.verifyId) {
			const encodedUserId = Buffer.from(user._id.toString()).toString(
				"base64"
			);

			const token = jwt.sign(
				{ userId: encodedUserId },
				process.env.JWT_SECRET,
				{ expiresIn: "15d" }
			);

			return res.status(200).json({
				message: `Welcome back ${user?.fName}`,
				user: {
					_id: token,
					fName: user?.fName,
					lName: user?.lName,
					email: user?.email,
					phone: user?.phoneNumber?.mobileNumber || "",
					photoUrl: user?.photo?.photoUrl,
					role: user?.role,
				},
			});
		}
	} catch (error) {
		console.log("Error in verifyUser controller: ", error?.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default verifyUser;
