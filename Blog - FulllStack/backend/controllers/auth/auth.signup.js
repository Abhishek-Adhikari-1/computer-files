import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../../models/user.model.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "adhikaryabhishek209@gmail.com",
		pass: "hlvozctqavykwhjr",
	},
});

const signup = async (req, res) => {
	try {
		const { fName, lName, email, password } = req?.body;

		if (!fName?.trim() || !lName?.trim() || !email?.trim() || !password) {
			return res.status(400).json({ error: "All fields are required" });
		}

		const fullNameRegex = /^[a-zA-Z]+$/;
		if (!fullNameRegex.test(fName) || !fullNameRegex.test(lName)) {
			return res.status(400).json({
				error: "Name must contain only alphabets with no spaces",
			});
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ error: "Email address is invalid" });
		}

		if (password.length < 6) {
			return res
				.status(400)
				.json({ error: "Password must be at least 6 characters" });
		}

		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ error: "Email already exists" });
		}

		const salt = await bcryptjs.genSalt(10);
		const hashedPassword = await bcryptjs.hash(password, salt);

		const newUser = new User({
			fName: fName.charAt(0).toUpperCase() + fName.slice(1).toLowerCase(),
			lName: lName.charAt(0).toUpperCase() + lName.slice(1).toLowerCase(),
			email: email.toLowerCase(),
			password: hashedPassword,
			accountType: "default",
		});

		if (newUser) {
			await newUser.save();

			const encodedUserId = Buffer.from(newUser?._id).toString("base64");

			const token = jwt.sign(
				{ userId: encodedUserId },
				process.env.JWT_SECRET,
				{
					expiresIn: "15d",
				}
			);
			const emailOptions = {
				from: "adhikaryabhishek209@gmail.com",
				to: email,
				subject: "Account Verification Required!",
				html: `
				<!DOCTYPE html>
				<html>
				<head>
					<meta charset="UTF-8">
					<title>Email Verification</title>
					<style>
						*{
						box-sizing: border-box;
						}
						body {
							font-family: Arial, sans-serif;
							background-color: #f4f4f4;
							margin: 0;
							padding: 0;
							overflow: hidden;
						}
						.container {
							width: 100%;
							max-width: 800px;
							margin: 0 auto;
							background-color: #ffffff;
							padding: 10px;
							border-radius: 8px;
							box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
						}
						.header {
							text-align: center;
							padding: 15px 10px;
							background-color: #007BFF;
							color: #ffffff;
							border-top-left-radius: 8px;
							border-top-right-radius: 8px;
						}
						.content {
							padding: 15px;
							line-height: 1.6;
						}
						.button {
							display: inline-block;
							padding: 10px 20px;
							margin: 20px 0;
							background-color: #007BFF;
							color: #ffffff !important;
							text-decoration: none;
							border-radius: 4px;
						}
						.footer {
							text-align: center;
							padding: 20px;
							font-size: 0.9em;
							color: #777777;
						}
					</style>
				</head>
				<body>
					<div class="container">
						<div class="header">
							<h1>Welcome to Abhi's Insights!</h1>
						</div>
						<div class="content">
							<p>Hi ${newUser.fName} ${newUser.lName},</p>
							<p>Thank you for signing up in my blog! Please verify your email address to complete your registration.</p>
							<p>Simply click the button below to verify your email address:</p>
							<p><a href="${process.env.VERIFICATION_LINK_WEB}/new-account/verifyId/${token}" class="button">Verify Email Address</a></p>
							<p>If the button above doesn't work, you can copy and paste the following link into your web browser:</p>
							<p>${process.env.VERIFICATION_LINK_WEB}/new-account/verifyId/${token}</p>
							<p>If you did not sign up for an account, you can ignore this email.</p>
							<p>Best regards,</p>
							<p>Abhishek Adhikari</p>
						</div>
						<div class="footer">
							<p>&copy; 2024 - Abhishek. All rights reserved.</p>
						</div>
					</div>
				</body>
				</html>`,
			};

			transporter.sendMail(emailOptions, async (error) => {
				if (error) {
					console.log(error);
				}
			});

			return res.status(200).json({
				message: `Mail sent to ${newUser?.email}. Please verify your email address to countinue`,
			});
		} else {
			return res.status(500).json({ error: "Invalid user data" });
		}
	} catch (error) {
		console.log("Error in signup controller: ", error?.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default signup;
