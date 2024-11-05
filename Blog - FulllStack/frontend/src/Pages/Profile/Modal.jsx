// Modal.js
import React from "react";

export default function Modal({ isOpen, closeModal, onFileChange }) {
	if (!isOpen) return null;

	return (
		<div className="fixed z-10 inset-0 overflow-y-auto">
			<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
				<div
					className="fixed inset-0 transition-opacity"
					aria-hidden="true"
				>
					<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
				</div>
				<span
					className="hidden sm:inline-block sm:align-middle sm:h-screen"
					aria-hidden="true"
				>
					&#8203;
				</span>
				<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
					<div className="sm:flex sm:items-start">
						<div className="mt-3 text-center sm:mt-0 sm:text-left">
							<h3 className="text-lg leading-6 font-medium text-gray-900">
								Upload a new avatar
							</h3>
							<div className="mt-2">
								<p className="text-sm text-gray-500">
									Choose an image file to set as your new
									avatar.
								</p>
								<input
									type="file"
									onChange={onFileChange}
									className="mt-2"
								/>
							</div>
						</div>
					</div>
					<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
						<button
							type="button"
							onClick={closeModal}
							className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
						>
							Cancel
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
