"use server";

export const submitAction = async (formData: FormData) => {
	const name = formData.get("name");
	const email = formData.get("email");
	const message = formData.get("message");
	console.log(name, email, message);
	return "done";
};
