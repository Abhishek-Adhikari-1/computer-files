import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import dotenv from "dotenv";

import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import dataUploadRoutes from "./routes/uploadData.routes.js";
import getiingContentRoutes from "./routes/getHomeContent.routes.js";

dotenv.config();

const port = process.env.PORT || 4856;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.use("/api/auth", authRoutes);
app.use("/api/upload", dataUploadRoutes);
app.use("/api/get", getiingContentRoutes);

app.listen(port, () => {
	connectToMongoDB();
	console.log(`Server is running on port ${port}`);
});
