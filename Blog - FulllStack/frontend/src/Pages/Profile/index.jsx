import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInSuccess } from "../../redux/user/userSlice";
import { toast } from "react-hot-toast";

const Profile = () => {
	const dispatch = useDispatch();
	const { currentUser } = useSelector((state) => state.user);

	const [formData, setFormData] = useState({
		image: null,
		imageUrl: null,
		fName: currentUser.fName,
		lName: currentUser.lName,
		email: currentUser.email,
		phone: currentUser?.phone,
	});
	const [formChange, setFormChange] = useState(false);
	const [formChangeLoading, setFormChangeLoading] = useState(false);

	const [changePassword, setChangePassword] = useState({
		oldPassword: "",
		newPassword: "",
		confirmPassword: "",
	});
	const [passwordChange, setPasswordChange] = useState(false);
	const [passwordChangeLoading, setPasswordChangeLoading] = useState(false);

	const fileInputRef = useRef(null);

	const handleButtonClick = () => {
		fileInputRef.current.click();
	};

	const handleSubmitChange = async (event) => {
		event.preventDefault();

		try {
			setFormChangeLoading(true);

			const file = formData.image;
			const fileData = new FormData();
			fileData.append("profilePic", file);
			fileData.append("fName", formData.fName);
			fileData.append("lName", formData.lName);
			fileData.append("phoneNumber", formData.phone);

			const response = await fetch("/api/upload/profile", {
				method: "POST",
				body: fileData,
				credentials: "include",
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error);
			}

			dispatch(signInSuccess(data.user));
			toast.success(data.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setFormChangeLoading(false);
		}
	};

	useEffect(() => {
		if (
			formData.image !== null ||
			formData.fName !== currentUser.fName ||
			formData.lName !== currentUser.lName ||
			formData.phone !== currentUser?.phone
		) {
			setFormChange(true);
		} else {
			setFormChange(false);
		}
	}, [formData, currentUser]);

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		if (
			!changePassword.oldPassword ||
			!changePassword.newPassword ||
			!changePassword.confirmPassword
		)
			return toast.error("All fields are required");

		if (changePassword.newPassword !== changePassword.confirmPassword)
			return toast.error("New and confirm password should match");

		try {
			setPasswordChangeLoading(true);

			const filePass = new FormData();
			filePass.append("oldPassword", changePassword.oldPassword);
			filePass.append("newPassword", changePassword.newPassword);
			filePass.append("confirmPassword", changePassword.confirmPassword);

			const response = await fetch("/api/upload/change-password", {
				method: "POST",
				body: filePass,
				credentials: "include",
			});
			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error);
			}

			setChangePassword({
				oldPassword: "",
				newPassword: "",
				confirmPassword: "",
			});
			toast.success(data.message);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setPasswordChangeLoading(false);
		}
	};

	useEffect(() => {
		if (
			changePassword.oldPassword &&
			changePassword.newPassword &&
			changePassword.confirmPassword
		) {
			setPasswordChange(true);
		} else {
			setPasswordChange(false);
		}
	}, [changePassword]);

	return (
		<>
			<div className="box-border">
				<div className="container sm:mx-auto px-4 md:py-10 py-4">
					{/* Personal Information Section  */}
					<div className="md:mb-8 mb-4 bg-white shadow-md rounded-lg p-6 relative">
						{formChangeLoading && (
							<div className="absolute backdrop-blur-[2px] z-10 flex flex-col items-center justify-center bg-gray-500/30 w-full h-full top-0 left-0 rounded-lg">
								<div className="absolute flex items-center justify-center">
									<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
									<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
									<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
									<span className="text-indigo-500 select-none">
										Updating...
									</span>
								</div>
								<div className="absolute flex items-center justify-center blur-[5px]">
									<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
									<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
									<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
									<span className="text-indigo-500 select-none">
										Updating...
									</span>
								</div>
								<div className="absolute flex items-center justify-center blur-[8px]">
									<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
									<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
									<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
									<span className="text-indigo-500 select-none">
										Updating...
									</span>
								</div>
							</div>
						)}
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								Personal Information
							</h2>
							<p className="mt-2 text-sm text-gray-600">
								Use a permanent address where you can receive
								mail.
							</p>
						</div>
						<form
							className="mt-6 space-y-6"
							encType="multipart/form-data"
							onSubmit={handleSubmitChange}
						>
							<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
								<div className="flex items-center space-x-6 w-full">
									<img
										src={
											formData.imageUrl ||
											currentUser?.photoUrl
										}
										alt="Profile Photo"
										className="h-16 w-16 rounded-full object-cover select-none ring-[3px] ring-indigo-500 ring-offset-2"
										draggable={false}
									/>
									<div>
										<button
											type="button"
											onClick={handleButtonClick}
											disabled={formChangeLoading}
											className="inline-flex select-none items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100"
										>
											Change avatar
										</button>
										<p className="mt-2 text-xs text-gray-500">
											JPG, GIF, PNG, JPEG or SVG.
										</p>
										<input
											type="file"
											id="avatar-input"
											name="profilePic"
											ref={fileInputRef}
											className="hidden"
											accept="image/*"
											hidden={true}
											disabled={formChangeLoading}
											onChange={(event) => {
												const file =
													event.target.files[0];
												if (file) {
													const reader =
														new FileReader();
													reader.onloadend = () => {
														setFormData({
															...formData,
															image: file,
															imageUrl:
																reader.result,
														});
													};
													reader.readAsDataURL(file);
												}
											}}
										/>
									</div>
								</div>
								<div className="">
									<div className="col-span-1 md:col-span-2">
										<label
											htmlFor="first-name"
											className="block text-sm font-medium text-gray-700"
										>
											First name
										</label>
										<input
											type="text"
											name="first-name"
											id="first-name"
											value={formData.fName || ""}
											disabled={formChangeLoading}
											onChange={(e) =>
												setFormData({
													...formData,
													fName: e.target.value,
												})
											}
											autoComplete="given-name"
											className="placeholder:select-none w-full mb-4 py-1 px-3 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
										/>
									</div>
									<div className="col-span-1 md:col-span-2">
										<label
											htmlFor="last-name"
											className="block text-sm font-medium text-gray-700"
										>
											Last name
										</label>
										<input
											type="text"
											name="last-name"
											id="last-name"
											value={formData.lName || ""}
											disabled={formChangeLoading}
											onChange={(e) =>
												setFormData({
													...formData,
													lName: e.target.value,
												})
											}
											autoComplete="family-name"
											className="placeholder:select-none w-full py-1 px-3 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="email"
										className="block text-sm font-medium text-gray-700"
									>
										Email address
									</label>
									<input
										type="text"
										name="email"
										id="email"
										disabled={true}
										value={formData.email || ""}
										autoComplete="email"
										className="placeholder:select-none text-gray-600/70 w-full py-1 px-3 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
									/>
								</div>
								<div>
									<label
										htmlFor="username"
										className="block text-sm font-medium text-gray-700"
									>
										Phone Number
									</label>
									<div className="mt-1 flex rounded-md shadow-sm">
										<select
											id="timezone"
											disabled={formChangeLoading}
											name="timezone"
											className="placeholder:select-none inline-flex items-center w-fit py-1 px-3 rounded-md rounded-r-none border-2 border-gray-200 outline-none focus:border-indigo-500"
										>
											<option>+977</option>
										</select>
										<input
											type="text"
											name="phone-number"
											id="phone-number"
											disabled={formChangeLoading}
											value={formData.phone || ""}
											onChange={(e) => {
												const sanitizedValue =
													e.target.value.replace(
														/[^0-9]/g,
														""
													);
												if (
													sanitizedValue.length ===
														10 &&
													!/^(97|98)\d{8}$/.test(
														sanitizedValue
													)
												) {
													toast.error(
														"Number must starts from 97 or 98"
													);
												}
												if (
													sanitizedValue.length <= 10
												) {
													return setFormData({
														...formData,
														phone: sanitizedValue,
													});
												}
											}}
											autoComplete="mobile tel"
											className="placeholder:select-none w-full py-1 px-3 rounded-md rounded-l-none border-2 border-gray-200 outline-none focus:border-indigo-500"
											placeholder="98 1234 1234"
										/>
									</div>
								</div>
								<div>
									<label
										htmlFor="timezone"
										className="block text-sm font-medium text-gray-700"
									>
										Timezone
									</label>
									<select
										name="timezone"
										disabled={formChangeLoading}
										className="placeholder:select-none w-full py-1 px-3 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
									>
										<option>Pacific Standard Time</option>
										<option>Eastern Standard Time</option>
										<option>Greenwich Mean Time</option>
									</select>
								</div>
							</div>
							<div className="flex justify-end">
								{formChange && (
									<button
										type="button"
										disabled={formChangeLoading}
										onClick={() =>
											setFormData({
												image: null,
												fName: currentUser.fName,
												lName: currentUser.lName,
												email: currentUser.email,
												phone: currentUser.phone,
											})
										}
										className={
											"select-none inline-flex bg-red-400/40 hover:bg-red-400/60 text-red-500 focus:ring-red-400 mr-6 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
										}
									>
										Cancel
									</button>
								)}
								<button
									type="submit"
									disabled={
										formChangeLoading
											? formChangeLoading
											: !formChange
									}
									className={`inline-flex ${
										formChange
											? "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"
											: "bg-gray-300 hover:cursor-not-allowed text-white focus:ring-gray-400"
									} select-none items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
								>
									Save
								</button>
							</div>
						</form>
					</div>
					{/* Change Password Section  */}
					<div className="md:mb-8 mb-4 bg-white shadow-md rounded-lg p-6 relative">
						{passwordChangeLoading && (
							<div className="absolute backdrop-blur-[2px] z-10 flex flex-col items-center justify-center bg-gray-500/30 w-full h-full top-0 left-0 rounded-lg">
								<div className="absolute flex items-center justify-center">
									<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
									<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
									<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
									<span className="text-indigo-500 select-none">
										Updating...
									</span>
								</div>
								<div className="absolute flex items-center justify-center blur-[5px]">
									<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
									<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
									<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
									<span className="text-indigo-500 select-none">
										Updating...
									</span>
								</div>
								<div className="absolute flex items-center justify-center blur-[8px]">
									<div className="absolute animate-spinY rounded-full h-28 w-28 border-b-[5px] border-[rgb(255,0,255)]"></div>
									<div className="absolute animate-spinX rounded-full h-28 w-28 border-t-[5px] border-[rgb(0,255,13)]"></div>
									<div className="absolute animate-spinZ rounded-full h-28 w-28 border-r-[5px] border-[rgb(0,247,255)]"></div>
									<span className="text-indigo-500 select-none">
										Updating...
									</span>
								</div>
							</div>
						)}
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								Change password
							</h2>
							<p className="mt-2 text-sm text-gray-600">
								Update your password associated with your
								account.
							</p>
						</div>
						<form
							className="mt-6 space-y-6"
							onSubmit={handlePasswordSubmit}
						>
							<div className="grid grid-cols-1 gap-6">
								<div>
									<label
										htmlFor="current-password"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Current password
									</label>
									<input
										id="current-password"
										name="current_password"
										type="password"
										disabled={passwordChangeLoading}
										value={changePassword.oldPassword || ""}
										onChange={(e) => {
											setChangePassword({
												...changePassword,
												oldPassword: e.target.value,
											});
										}}
										autoComplete="current-password"
										placeholder="************"
										className="placeholder:select-none w-full py-1 px-3 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
									/>
								</div>
								<div>
									<label
										htmlFor="new-password"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										New password
									</label>
									<input
										id="new-password"
										name="new_password"
										type="password"
										disabled={passwordChangeLoading}
										value={changePassword.newPassword || ""}
										onChange={(e) => {
											setChangePassword({
												...changePassword,
												newPassword: e.target.value,
											});
										}}
										autoComplete="new-password"
										placeholder="************"
										className="placeholder:select-none w-full py-1 px-3 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
									/>
								</div>
								<div>
									<label
										htmlFor="confirm-password"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Confirm password
									</label>
									<input
										id="confirm-password"
										name="confirm_password"
										type="password"
										disabled={passwordChangeLoading}
										value={
											changePassword.confirmPassword || ""
										}
										onChange={(e) => {
											setChangePassword({
												...changePassword,
												confirmPassword: e.target.value,
											});
										}}
										autoComplete="new-password"
										placeholder="************"
										className="placeholder:select-none w-full py-1 px-3 rounded-md border-2 border-gray-200 outline-none focus:border-indigo-500"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								{passwordChange && (
									<button
										type="button"
										disabled={passwordChangeLoading}
										onClick={() =>
											setChangePassword({
												oldPassword: "",
												newPassword: "",
												confirmPassword: "",
											})
										}
										className={
											"select-none inline-flex bg-red-400/40 hover:bg-red-400/60 text-red-500 focus:ring-red-400 mr-6 items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
										}
									>
										Cancel
									</button>
								)}
								<button
									type="submit"
									disabled={
										passwordChangeLoading
											? passwordChangeLoading
											: !passwordChange
									}
									className={`${
										passwordChange
											? "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500"
											: "bg-gray-300 hover:cursor-not-allowed text-white focus:ring-gray-400"
									} select-none items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2`}
								>
									Save
								</button>
							</div>
						</form>
					</div>
					{/* Log out other sessions Section  */}
					<div className="md:mb-8 mb-4 bg-white shadow-md rounded-lg p-6">
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								Log out other sessions
							</h2>
							<p className="mt-2 text-sm text-gray-600">
								Please enter your password to confirm you would
								like to log out of your other sessions across
								all of your devices.
							</p>
						</div>
						<form className="mt-6 space-y-6">
							<div className="grid grid-cols-1 gap-6">
								<div>
									<label
										htmlFor="logout-password"
										className="block text-sm font-medium text-gray-700"
									>
										Your password
									</label>
									<input
										id="logout-password"
										name="password"
										type="password"
										autoComplete="current-password"
										className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
									/>
								</div>
							</div>
							<div className="flex justify-end">
								<button
									type="submit"
									className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
								>
									Log out other sessions
								</button>
							</div>
						</form>
					</div>
					{/* Delete account Section  */}
					<div className="md:mb-8 mb-4 bg-white shadow-md rounded-lg p-6">
						<div>
							<h2 className="text-xl font-semibold text-gray-900">
								Delete account
							</h2>
							<p className="mt-2 text-sm text-gray-600">
								No longer want to use my service? You can delete
								your account here. This action is not
								reversible. All information related to this
								account will be deleted permanently.
							</p>
						</div>
						<form className="mt-6 flex justify-end">
							<button
								type="submit"
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
							>
								Yes, delete my account
							</button>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
