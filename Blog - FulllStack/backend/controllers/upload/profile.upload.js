import multer from "multer";
import jwt from "jsonwebtoken";
import { uploadFile } from "@uploadcare/upload-client";

const storage = multer.memoryStorage({});

const upload = multer({ storage });

export const uploadAvatar = upload.fields([
	{ name: "profilePic", maxCount: 1 },
]);

export const handleAvatarUpload = async (req, res, next) => {
	try {
		if (
			req.files &&
			req.files.profilePic &&
			req.files.profilePic.length > 0
		) {
			const bufferFile = req.files.profilePic[0].buffer;
			if (req.user?.photo?.uuid) {
			}
			const result = await uploadFile(bufferFile, {
				publicKey: process.env.UPLOADCARE_API_PUBLIC_KEY,
				store: true,
				metadata: {
					original_filename: req.files.profilePic[0].originalname,
					fieldName: req.files.profilePic[0].fieldname,
					subsystem: "node-js",
					reqUserName: req.user.fName + " " + req.user.lName,
					reqUserEmail: req.user.email,
				},
			});
			req.user.photo.uuid = result.uuid;
			req.user.photo.photoUrl = result.cdnUrl + "-/preview/";
			await req.user.save();
			const encodedUserId = Buffer.from(req.user._id.toString()).toString(
				"base64"
			);
			const token = jwt.sign(
				{ userId: encodedUserId },
				process.env.JWT_SECRET,
				{ expiresIn: "15d" }
			);
			return res.status(200).json({
				message: "Profile updated successfully",
				user: {
					_id: token,
					fName: req.user?.fName,
					lName: req.user?.lName,
					email: req.user?.email,
					phone: req.user?.phoneNumber?.mobileNumber,
					photoUrl: req.user?.photo?.photoUrl,
					role: req.user?.role,
				},
			});
		} else {
			const encodedUserId = Buffer.from(req.user._id.toString()).toString(
				"base64"
			);
			const token = jwt.sign(
				{ userId: encodedUserId },
				process.env.JWT_SECRET,
				{ expiresIn: "15d" }
			);
			res.status(200).json({
				message: "Profile updated successfully",
				user: {
					_id: token,
					fName: req.user?.fName,
					lName: req.user?.lName,
					email: req.user?.email,
					phone: req.user?.phoneNumber?.mobileNumber,
					photoUrl: req.user?.photo?.photoUrl,
					role: req.user?.role,
				},
			});
			next();
		}
	} catch (error) {
		console.error("Error uploading file:", error);
		res.status(400).json({ error: "File upload failed" });
	}
};

export const handleInfoUpload = async (req, res, next) => {
	console.log(req.body);
	if (!req.body?.fName?.trim() || !req.body?.lName?.trim()) {
		return res.status(400).json({ error: "Name can't be empty" });
	}

	const fullNameRegex = /^[a-zA-Z]+$/;
	if (
		!fullNameRegex.test(req.body?.fName) ||
		!fullNameRegex.test(req.body?.lName)
	) {
		return res.status(400).json({
			error: "Name must contain only alphabets with no spaces",
		});
	}

	const phoneNumbRegex = /^(97|98)\d{8}$/;
	// const phoneNumbRegex = /^[0-9]+$/;
	if (req.body?.phoneNumber && !phoneNumbRegex.test(req.body?.phoneNumber)) {
		return res.status(400).json({
			error: "Phone must of 10 digits containing only numbers starting with 97 or 98",
		});
	}

	if (req.body?.phoneNumber !== "null") {
		req.user.fName = req.body.fName;
		req.user.lName = req.body.lName;
		req.user.phoneNumber.mobileNumber = req.body.phoneNumber;
		await req.user.save();
	}

	next();
};
