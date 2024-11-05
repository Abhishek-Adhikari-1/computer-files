import express from "express";

import login from "../controllers/auth/auth.login.js";
import signup from "../controllers/auth/auth.signup.js";
import logout from "../controllers/auth/auth.logout.js";
import google from "../controllers/auth/auth.google.js";
import verifyEmail from "../controllers/auth/auth.verifyEmail.js";
import verifyUser from "../controllers/auth/auth.verifyUser.js";

const router = express.Router();

router.post("/signin", login);

router.post("/signup", signup);

router.post("/signout", logout);

router.patch("/new-account", verifyEmail);

router.post("/verify-user", verifyUser);

router.post("/google", google);

// router.post("/forgot", forgot);

export default router;
