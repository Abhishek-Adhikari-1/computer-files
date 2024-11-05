import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const encodedUserId = Buffer.from(userId).toString("base64");

	const token = jwt.sign({ userId: encodedUserId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});
	res.cookie("fsdi", token, {
		httpOnly: true,
		secure: process.env.NODE_ENV !== "development",
		maxAge: 15 * 24 * 60 * 60 * 1000,
		sameSite: "strict",
	});
};

export default generateTokenAndSetCookie;
