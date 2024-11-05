import express from "express";

import homeContent from "../controllers/informations/info.home.js";

const router = express.Router();

router.post("/home", homeContent);

export default router;
