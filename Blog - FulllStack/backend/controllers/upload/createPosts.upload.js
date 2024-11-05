import bcryptjs from "bcryptjs";
import multer from "multer";

import User from "../../models/user.model.js";

const storage = multer.memoryStorage({});

const upload = multer({ storage });

export const uploadImage = upload.none();

export const uploadBlog = async (req, res) => {
	
};
