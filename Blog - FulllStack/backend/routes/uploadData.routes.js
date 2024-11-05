import express from "express";

import {
	uploadAvatar,
	handleAvatarUpload,
	handleInfoUpload,
} from "../controllers/upload/profile.upload.js";
import protectRoute from "../middleware/protectRoute.js";
import {
	changePassword,
	uploadData,
} from "../controllers/upload/changePassword.upload.js";
import {
	uploadBlog,
	uploadImage,
} from "../controllers/upload/createPosts.upload.js";

const router = express.Router();

router.post(
	"/profile",
	protectRoute,
	uploadAvatar,
	handleInfoUpload,
	handleAvatarUpload
);

router.post("/change-password", protectRoute, uploadData, changePassword);

router.post("/create-posts", protectRoute, uploadImage, uploadBlog);

export default router;
