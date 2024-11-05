import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../../models/user.model.js";
import generateTokenAndSetCookie from "../../utilities/generateToken.js";

const login = async (req, res) => {
	try {
		const { email, password } = req?.body;

		if (!email.trim() || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const user = await User.findOne({ email });

		const isPasswordValid = await bcryptjs.compare(
			password,
			user?.password || ""
		);

		if (user && user?.accountType !== "default") {
			return res
				.status(400)
				.json({ error: "Try signing in different way" });
		}

		if (!user || !isPasswordValid) {
			return res.status(400).json({ error: "Invalid email or password" });
		}

		if (!user?.verify?.verifyId) {
			return res
				.status(400)
				.json({ error: "Please verify email address mail sent to inbox" });
		}

		generateTokenAndSetCookie(user?._id, res);

		const encodedUserId = Buffer.from(user?._id).toString("base64");

		const token = jwt.sign(
			{ userId: encodedUserId },
			process.env.JWT_SECRET,
			{
				expiresIn: "15d",
			}
		);

		return res.status(200).json({
			message: `Welcome ${user?.fName}`,
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
	} catch (error) {
		console.log("Error in login controller: ", error?.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default login;
