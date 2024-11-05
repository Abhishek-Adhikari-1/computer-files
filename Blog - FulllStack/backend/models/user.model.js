import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
	{
		fName: {
			type: String,
			required: true,
			trim: true,
		},
		lName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			minlength: 6,
		},
		phoneNumber: {
			countryCode: {
				type: String,
				trim: true,
				default: "+977",
			},
			mobileNumber: {
				type: String,
				trim: true,
				default: null,
			},
		},
		photo: {
			photoUrl: {
				type: String,
				trim: true,
				default:
					"https://th.bing.com/th/id/OIP.tQYFfqM9HEki3rZPgBodgQAAAA?pid=ImgDet&w=196&h=196&c=7&dpr=2",
			},
			uuid: {
				type: String,
				trim: true,
				default: null,
			},
		},
		verify: {
			verifyId: {
				type: Boolean,
				default: false,
				required: true,
			},
		},
		role: {
			type: String,
			default: "user",
			required: true,
			enum: ["user", "admin", "leader"],
		},
		accountType: {
			type: String,
			default: "default",
			required: true,
			enum: ["default", "google", "github"],
		},
	},
	{ timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
