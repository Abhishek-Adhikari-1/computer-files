import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

import User from "../../models/user.model.js";
import generateTokenAndSetCookie from "../../utilities/generateToken.js";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "adhikaryabhishek209@gmail.com",
		pass: "hlvozctqavykwhjr",
	},
});

const google = async (req, res) => {
	try {
		const { fName, lName, email, photoUrl, emailVerified } = req.body;

		const user = await User.findOne({ email });

		if (user && user.accountType !== "google") {
			return res.status(400).json({ error: "User already exists" });
		}

		if (user && user.accountType === "google") {
			const encodedUserId = Buffer.from(user._id.toString()).toString(
				"base64"
			);

			const token = jwt.sign(
				{ userId: encodedUserId },
				process.env.JWT_SECRET,
				{ expiresIn: "15d" }
			);

			generateTokenAndSetCookie(user._id, res);

			return res.status(200).json({
				message: `Welcome ${user.fName}`,
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

		if (!user) {
			const newUser = new User({
				fName:
					fName.charAt(0).toUpperCase() +
					fName.slice(1).toLowerCase(),
				lName:
					lName.charAt(0).toUpperCase() +
					lName.slice(1).toLowerCase(),
				email: email.toLowerCase(),
				photo: {
					photoUrl: photoUrl,
				},
				verify: {
					verifyId: emailVerified,
				},
				accountType: "google",
			});

			await newUser.save();

			const encodedUserId = Buffer.from(newUser._id.toString()).toString(
				"base64"
			);

			const token = jwt.sign(
				{ userId: encodedUserId },
				process.env.JWT_SECRET,
				{ expiresIn: "15d" }
			);

			generateTokenAndSetCookie(newUser._id, res);

			const emailOptions = {
				from: "adhikaryabhishek209@gmail.com",
				to: email,
				subject: "Account Created!",
				html: `
                <!DOCTYPE html>
                <html>
                    <head>
                    <meta charset="UTF-8">
                    <title>Welcome to Abhi's Insights!</title>
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
                        max-width: 600px;
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
                        <p>Thank you for signing up for my blog! Your account has been created successfully.</p>
                        <p>We are excited to have you as part of our community. Feel free to explore the content and engage with other members.</p>
                        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
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

			transporter.sendMail(emailOptions, (error) => {
				if (error) {
					console.log(error);
				}
			});

			return res.status(200).json({
				message: `Welcome ${newUser.fName}`,
				user: {
					_id: token,
					fName: newUser?.fName,
					lName: newUser?.lName,
					email: newUser?.email,
					phone: newUser?.phoneNumber?.mobileNumber || "",
					photoUrl: newUser?.photo?.photoUrl,
					role: newUser?.role,
				},
			});
		}
	} catch (error) {
		console.log("Error in google controller: ", error.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default google;
