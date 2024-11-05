import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
const nodemailer = require("nodemailer");

// export async function GET(request: NextRequest) {
// 	return NextResponse.redirect("/contact");
// }

export async function POST(request: NextRequest) {
	const { name, email, message } = await request?.json();

	if (!name || !email || !message) {
		return Response({ error: "Missing required fields" }, 400);
	}

	const client = new MongoClient(
		process.env.MONGODB_URI ||
			"mongodb+srv://adhikaryabhishek209:l7G3l6AHqwgWmboe@cluster0.uucvt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
		{
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		}
	);

	const transporter = nodemailer.createTransport({
		// host: "smtp-mail.outlook.com",
		// port: 587,
		// tls: {
		// 	ciphers: "SSLv3",
		// 	rejectUnauthorized: false,
		// },

		// auth: {
		// 	user: username,
		// 	pass: password,
		// },
		service: "gmail",
		auth: {
			user: process.env.NODEMAILER_EMAIL,
			pass: process.env.NODEMAILER_PASSWORD,
		},
	});

	try {
		await client.connect();
		const db = client.db("contact");

		const collection = db.collection("emails");
		await collection.insertOne({ name, email, message, Date: new Date() });

		const emailOptions = {
			from: "adhikaryabhishek209@gmail.com",
			to: email,
			subject: "Contact Information",
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<style>
						.button {
							background-color: #7b3dbd;
							border: none;
							color: #fff !important;
							padding: 10px 20px;
							text-align: center;
							text-decoration: none;
							display: inline-block;
							font-size: 16px;
							cursor: pointer;
							outline: none;
							border-radius: 8px;
							user-select: none !important;
						}
						.button:hover{
							background-color: #652acbce;
						}
						p{
							font-weight: 400;
							font-size: 18px;
						}
						u{
							color: blue;
						}
						@media (max-width: 450px){
							p{
								font-size: 15px;
							}
							h2{
								font-size: 1.75em;
							}
						}
					</style>
				</head>
				<body>
					<p>I have recieved your message. I will contact you as soon as possible.</p>
					<p>Your Form is shown below:</p>
					<div>
					    <h3>Full Name:</h3>
						<p>${name}</p>
					</div>
					<div>
						<h3>Email:</h3>
						<p>${email}</p>
					</div>
					<div>
					    <h3>Message:</h3>
						<p>${message}</p>
					</div>
					<br />
					<br />
					<p>For your security, <u>kindly do not share this email with anyone else</u>.
					It is unique to your account and should remain confidential.
					<b>If you did not request this, </b>please ignore this message.</p>
				</body>
				</html>
			`,
		};

		await transporter.sendMail(emailOptions, async (error: any) => {
			if (error) {
				console.log(error);
				return Response({ error: "Internal Server Error" }, 501);
			}
		});

		const ownerEmailOptions = {
			from: "adhikaryabhishek209@gmail.com",
			to: "adhikaryabhishek209@gmail.com",
			subject: "New Contact Request",
			html: `
				<!DOCTYPE html>
				<html>
				<head>
					<style>
						.button {
							background-color: #7b3dbd;
							border: none;
							color: #fff !important;
							padding: 10px 20px;
							text-align: center;
							text-decoration: none;
							display: inline-block;
							font-size: 16px;
							cursor: pointer;
							outline: none;
							border-radius: 8px;
							user-select: none !important;
						}
						.button:hover{
							background-color: #652acbce;
						}
						p{
							font-weight: 400;
							font-size: 18px;
						}
						u{
							color: blue;
						}
						@media (max-width: 450px){
							p{
								font-size: 15px;
							}
							h2{
								font-size: 1.75em;
							}
						}
					</style>
				</head>
				<body>
					<p>A new person wants to contact you. Kindly reply as soon as possible.</p>
					<p>Information:</p>
					<div>
					    <h3>Full Name:</h3>
						<p>${name}</p>
					</div>
					<div>
						<h3>Email:</h3>
						<p>${email}</p>
					</div>
					<div>
					    <h3>Message:</h3>
						<p>${message}</p>
					</div>
					<br />
				</body>
				</html>
			`,
		};

		transporter.sendMail(ownerEmailOptions, async (error: any) => {
			if (error) {
				console.log(error);
				return Response({ error: "Internal Server Error" }, 501);
			}
		});

		return Response({
			message: `Thank you ${name} for your request. I will contact you as soon as possible.`,
		});
	} catch (err) {
		console.error("Error connecting to MongoDB:", err);
		return Response({ error: "Failed to connect to MongoDB" }, 500);
	} finally {
		await client.close();
	}
}

const Response = (json: object, statusCode: number = 200) => {
	return NextResponse.json(json, {
		status: statusCode,
	});
};

// const utcDate = new Date();
// 		const nepalOffset = 5 * 60 + 45; // 5 hours and 45 minutes in minutes
// 		const utcOffset = utcDate.getTimezoneOffset(); // getTimezoneOffset returns the offset in minutes

// 		// Calculate the Nepal Time
// 		const nepalTime = new Date(
// 			utcDate.getTime() + (nepalOffset + utcOffset) * 60 * 1000
// 		);
// 		const nepal = nepalTime.toLocaleString("en-US", {
// 			timeZone: "Asia/Kathmandu",
// 		});
