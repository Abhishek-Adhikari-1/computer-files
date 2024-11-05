const logout = (req, res) => {
	try {
		res.clearCookie("fsdi");
		res.status(200).json({ message: "Logged out successfull" });
	} catch (error) {
		console.log("Error in logout controller: ", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

export default logout;
