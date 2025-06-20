"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function api() {
			const response = await fetch(
				"https://jsonplaceholder.typicode.com/photos"
			);
			const data = await response.json();
			setData(data);
			setLoading(false);
		}
		api();
	}, []);

	// Get the first item for each album
	const getFirstItems = () => {
		const albumMap = new Map();

		data.forEach((item) => {
			if (!albumMap.has(item.albumId)) {
				// Get all the photos for the current albumId
				const allPhotos = data.filter(
					(albumItem) => albumItem.albumId === item.albumId
				);

				// Modify the first item of the album to include an `allPhotos` property
				const firstItemWithPhotos = {
					...item, // Include all properties of the item
					allPhotos: allPhotos, // Add the `allPhotos` array to this item
				};

				// Set the first item with allPhotos array in the map
				albumMap.set(item.albumId, firstItemWithPhotos);
			}
		});

		// Convert the Map to an array
		return Array.from(albumMap.values());
	};

	return (
		<>
			{loading ? (
				<div
					role="status"
					className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] flex justify-center items-center flex-col"
				>
					<svg
						aria-hidden="true"
						className="inline w-12 h-12 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300"
						viewBox="0 0 100 101"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{/* Loading spinner */}
						<path
							d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
							fill="currentColor"
						/>
						<path
							d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
							fill="currentFill"
						/>
					</svg>
					<span>Loading...</span>
				</div>
			) : (
				<div className="grid grid-cols-1 min-[290px]:grid-cols-2 min-[490px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5">
					{/* <div className="columns-[130px] min-[290px]:columns-[150px] md:columns-[165px] xl:columns-[180px]"> */}
					{getFirstItems().map((item) => (
						<Dialog key={"album" + item.albumId} modal={true}>
							<DialogTrigger asChild>
								<div>
									<Image
										height={200}
										width={200}
										id={"album" + item.albumId}
										loading="lazy"
										draggable={false}
										className="max-w-full rounded-lg h-full w-full cursor-pointer"
										src={
											item.thumbnailUrl ||
											"https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
										}
										alt={item.title}
									/>
									<span>{item.albumId}</span>
								</div>
							</DialogTrigger>
							<DialogContent className="max-w-full sm:max-w-[425px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[1000px] backdrop-blur-md bg-white/15">
								<DialogHeader>
									<DialogTitle>All Images</DialogTitle>
									<DialogDescription>
										<div className="max-h-[70vh] overflow-y-auto">
											<div className="grid grid-cols-2 min-[290px]:grid-cols-3 min-[400px]:grid-cols-4 min-[490px]:grid-cols-5 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-5">
												{item.allPhotos.map(
													(childItem) => (
														<div key={childItem.id}>
															<Image
																height={200}
																width={200}
																id={
																	childItem.albumId +
																	"-" +
																	childItem.id
																}
																loading="lazy"
																draggable={
																	false
																}
																className="max-w-full rounded-lg h-full w-full"
																src={
																	childItem.thumbnailUrl ||
																	"https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg"
																}
																alt={
																	childItem.title
																}
															/>
															<span>
																{childItem.albumId +
																	"-" +
																	childItem.id}
															</span>
														</div>
													)
												)}
											</div>
										</div>
									</DialogDescription>
								</DialogHeader>
							</DialogContent>
						</Dialog>
					))}
				</div>
			)}
		</>
	);
}
