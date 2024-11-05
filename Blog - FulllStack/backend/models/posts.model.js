import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
	{
		data: {
			title: {
				type: String,
				required: true,
				trim: true,
			},
			content: {
				type: String,
				required: true,
				trim: true,
			},
			author: {
				name: {
					type: String,
					required: true,
					trim: true,
				},
				email: {
					type: String,
					required: true,
					trim: true,
				},
				avatar: {
					type: String,
					required: true,
					trim: true,
				},
			},
			image: {
				type: String,
			},
			description: {
				type: String,
				trim: true,
				required: true,
			},
		},
	},
	{ timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
