import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import toast from "react-hot-toast";

const Posts = () => {
	const fileInputRef = useRef(null);
	const scrollRef = useRef(null);
	const [image, setImage] = useState();
	const [postCreationLoading, setPostCreationLoading] = useState(false);

	const handleFileClick = () => {
		fileInputRef.current.click();
	};

	const [dummyPost, setDummyPost] = useState();

	const handleScroll = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollIntoView({ behavior: "smooth" });
		}
	};

	const handlePostSubmit = async (e) => {
		e.preventDefault();
		try {
			setPostCreationLoading(true);

			const response = await fetch("/api/upload/create-posts", {
				method: "POST",
				body: "fileData",
				credentials: "include",
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error);
			}

			toast.success(data.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setPostCreationLoading(false);
		}
	};

	return (
		<>
			<div className="h-full w-full flex items-center justify-center relative">
				{postCreationLoading && (
					<div className="absolute backdrop-blur-[2px] z-10 flex flex-col items-center bg-gray-500/30 w-full h-full top-0 left-0 rounded-lg">
						<div className="absolute flex items-center justify-center top-36">
							<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
							<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
							<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
							<span className="text-indigo-500 select-none">
								Updating...
							</span>
						</div>
						<div className="absolute flex items-center justify-center blur-[6px] top-36">
							<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
							<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
							<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
							<span className="text-indigo-500 select-none">
								Updating...
							</span>
						</div>
						<div className="absolute flex items-center justify-center blur-[8px] top-36">
							<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
							<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
							<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
							<span className="text-indigo-500 select-none">
								Updating...
							</span>
						</div>
					</div>
				)}
				<div className="p-4 w-full">
					<h2 className="text-2xl font-bold mb-6 text-center">
						Create a Post
					</h2>
					<form
						className="flex flex-col items-center space-y-5 w-full relative"
						onSubmit={handlePostSubmit}
					>
						<div className="flex items-center justify-between absolute right-0 -top-5">
							<button
								type="submit"
								disabled={postCreationLoading}
								className="bg-indigo-600 w-full hover:bg-indigo-700 text-white focus:ring-indigo-500 select-none items-center px-4 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
							>
								Create Post
							</button>
						</div>
						<div className="w-full">
							<label
								htmlFor="last-name"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Title
							</label>
							<input
								id="title"
								type="text"
								placeholder="Title of the post"
								disabled={postCreationLoading}
								className="shadow-lg placeholder:select-none w-full py-2 px-3 rounded-md border border-gray-200 outline-none focus:border-indigo-500"
							/>
						</div>
						<div className="w-full">
							<label
								className="block text-sm font-medium leading-6 text-gray-900"
								htmlFor="category"
							>
								Category
							</label>
							<select
								id="category"
								disabled={postCreationLoading}
								className="shadow-lg placeholder:select-none w-full py-2 px-3 rounded-md border border-gray-200 outline-none focus:border-indigo-500"
							>
								<option>Category 1</option>
								<option>Category 2</option>
								<option>Category 3</option>
							</select>
						</div>
						<div className="col-span-full w-full">
							<label
								htmlFor="cover-photo"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Cover photo
							</label>
							<div
								onClick={handleFileClick}
								className="bg-white shadow-lg mt-2 relative cursor-pointer flex justify-center items-center rounded-lg border-2 border-dashed border-gray-900/25 px-6 min-h-56"
							>
								<div className="text-center">
									{image && (
										<img
											src={image}
											alt="Cover Photo"
											className="lg:h-52 md:h-36 w-full object-cover object-center select-none"
											draggable={false}
										/>
									)}
									<div className="flex text-sm leading-6 text-gray-600">
										<label
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
										>
											<span>Upload a file</span>
											<input
												id="file-upload"
												name="file-upload"
												type="file"
												disabled={postCreationLoading}
												ref={fileInputRef}
												accept="image/*"
												className="sr-only"
												onChange={(event) => {
													const file =
														event.target.files[0];
													if (file) {
														const reader =
															new FileReader();
														reader.onloadend =
															() => {
																setImage(
																	reader.result
																);
															};
														reader.readAsDataURL(
															file
														);
													}
												}}
											/>
										</label>
										<p className="pl-1">or drag and drop</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">
										PNG, JPG, GIF, JPEG or SVG up to 10MB
									</p>
								</div>
							</div>
						</div>

						<div className="w-full">
							<label
								htmlFor="cover-photo"
								className="flex text-sm font-medium leading-6 text-gray-900 mb-2 justify-between"
							>
								Description
								<button
									type="button"
									className="text-sm text-indigo-600 border-b border-indigo-500"
									onClick={handleScroll}
									disabled={postCreationLoading}
								>
									See the demo
								</button>
							</label>
							<Editor
								className="shadow-lg"
								disabled={postCreationLoading}
								onChange={(content, editor) => {
									setDummyPost(editor.getContent());
								}}
								apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
								init={{
									plugins:
										"anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown",
									toolbar:
										"undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
									tinycomments_mode: "embedded",
									tinycomments_author: "Abhishek Adhikari",
									mergetags_list: [
										{
											value: "First.Name",
											title: "First Name",
										},
										{ value: "Email", title: "Email" },
									],
									ai_request: (request, respondWith) =>
										respondWith.string(() =>
											Promise.reject(
												"See docs to implement AI Assistant"
											)
										),
									placeholder: "Create a new post here...",
								}}
								initialValue=""
							/>
						</div>
					</form>
					<div
						className="flex justify-between flex-col bg-white px-6 py-2 rounded-lg mt-5 w-full h-full shadow-lg"
						ref={scrollRef}
					>
						<h2 className="text-2xl font-bold mb-6 text-center">
							Dummy of Post creation
						</h2>
						<div
							dangerouslySetInnerHTML={{ __html: dummyPost }}
							className="text-justify"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Posts;
