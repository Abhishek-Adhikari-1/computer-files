import fetch from "node-fetch";

const homeContent = async (req, res) => {
	try {
		const response = await fetch(process.env.FACEBOOK_API_HOMECONTENT, {
			method: "GET",
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.error || "Something went wrong");
		}

		const posts = await data.data.map((post) => {
			const title = post?.message_tags?.[0]?.name
				?.split("_")
				.join(" ")
				.split("#")
				.pop()
				.split(" ")
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(" ");
			return {
				id: post.id,
				title: title || post?.message,
				description: post?.message,
				image:
					post?.full_picture ||
					"https://www.thewowstyle.com/wp-content/uploads/2015/01/nature-desktop-background-1691.jpg",
				totalViews: post?.reactions?.summary?.total_count,
				totalComments: post?.comments?.summary?.total_count,
				created_time: post.created_time,
			};
		});

		res.json({
			data: posts,
		});
	} catch (error) {
		console.log("Error in Home content controller: ", error?.message);
		return res.status(500).json({ error: "Internal Server Error" });
	}
};

export default homeContent;
