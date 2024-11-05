import bcryptjs from "bcryptjs";
import multer from "multer";
import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";
import generateTokenAndSetCookie from "../../utilities/generateToken.js";

const storage = multer.memoryStorage({});

const upload = multer({ storage });

export const uploadData = upload.none();

export const changePassword = async (req, res) => {
	try {
		const { oldPassword, newPassword, confirmPassword } = req?.body;

		if (!oldPassword || !newPassword || !confirmPassword) {
			return res.status(400).json({ error: "All fields are required" });
		}

		if (oldPassword === newPassword) {
			return res
				.status(400)
				.json({ error: "Old password and new password can't be same" });
		}

		if (newPassword.length < 6) {
			return res
				.status(400)
				.json({ error: "Password must be at least 6 characters" });
		}

		if (newPassword !== confirmPassword) {
			return res.status(400).json({
				error: "New password and confirm password doesn't match",
			});
		}

		const user = await User.findOne({ email: req.user.email });

		if (user && user?.accountType !== "default") {
			return res.status(400).json({
				error: "Google or Github account password can't be set",
			});
		}

		const isPasswordValid = await bcryptjs.compare(
			oldPassword,
			user?.password || ""
		);

		if (!isPasswordValid) {
			return res.status(400).json({ error: "Password is incorrect" });
		}

		if (isPasswordValid) {
			const salt = await bcryptjs.genSalt(10);
			const hashedPassword = await bcryptjs.hash(newPassword, salt);

			req.user.password = hashedPassword;
			await req.user.save();

			res.status(200).json({ message: "Password changed successfully" });
		}
	} catch (error) {
		console.log("Error in login controller: ", error?.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};
