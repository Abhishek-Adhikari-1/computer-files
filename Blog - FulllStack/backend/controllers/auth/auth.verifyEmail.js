import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";
import generateTokenAndSetCookie from "../../utilities/generateToken.js";

const verifyEmail = async (req, res) => {
	try {
		const { verifyIdLink } = req?.body;

		const decoded = jwt.verify(verifyIdLink, process.env.JWT_SECRET);

		if (!decoded || !decoded?.userId) {
			return res
				.status(401)
				.json({ error: "Token is invalid or expired" });
		}

		const userId = Buffer.from(decoded.userId, "base64").toString("utf-8");

		const user = await User.findById(userId);

		if (!user) {
			return res.status(401).json({ error: "User not found" });
		}

		if (user?.verify?.verifyId) {
			return res
				.status(401)
				.json({ error: "Email address already verified" });
		}

		user.verify.verifyId = true;
		await user.save();

		return res.status(200).json({
			message: "Email address verified successfully",
		});
	} catch (error) {
		console.log("Error in verifyEmail controller: ", error?.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default verifyEmail;
