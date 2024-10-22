/** @format */
"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "../card";
import { ChevronsUpDown, Plus, X, Pencil, Check } from "lucide-react";

import { Button } from "../button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";

import { Input } from "../input";
import { Label } from "../label";
import { ScrollArea, ScrollBar } from "@components/ui/scroll-area";

export const DropZone = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [images, setImages] = useState([]);
	const [isOpen, setIsOpen] = useState(false);
	const handleDragOver = (e) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e) => {
		e.preventDefault();
		setIsDragging(false);
		const files = Array.from(e.dataTransfer.files);
		displayPreview(files);
	};

	const handleFileChange = (e) => {
		const files = Array.from(e.target.files);
		displayPreview(files);
	};

	const displayPreview = (files) => {
		const newImages = files.map((file) => {
			const reader = new FileReader();

			return new Promise((resolve) => {
				reader.onload = () => {
					resolve({ preview: reader.result, name: file.name });
				};
				reader.readAsDataURL(file);
			});
		});
		Promise.all(newImages).then((results) => {
			setImages((prevPreviews) => [...prevPreviews, ...results]);
		});
	};

	return (
		<div className="w-full h-screen flex justify-center items-center">
			<div className="flex flex-col items-center">
				<Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full space-y-2">
					<div
						className={`w-fit relative border-2 border-gray-300 border-dashed rounded-lg p-6 my-4${isDragging ? "border-indigo-600" : ""}`}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
					>
						<input
							type="file"
							className="absolute inset-0 w-full h-full opacity-0 z-50"
							onChange={handleFileChange}
						/>
						<div className="text-center">
							<Image
								className="mx-auto h-12 w-12"
								src="https://www.svgrepo.com/show/357902/image-upload.svg"
								alt="Upload icon"
								width={250}
								height={250}
							/>
							<h3 className="mt-2 text-sm font-medium text-gray-900">
								<label className="relative cursor-pointer">
									<span>Drag and drop</span>
									<span className="text-indigo-600"> or browse</span>
									<span> to upload</span>
									<input
										id="file-upload"
										name="file-upload"
										type="file"
										className="sr-only"
									/>
								</label>
							</h3>
							<p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
						</div>
					</div>
					<CollapsibleTrigger asChild>
						<Button variant="ghost" size="sm" className="w-9 p-0">
							dasdasdasdasd
							<ChevronsUpDown className="h-4 w-4" />
							<span className="sr-only">Toggle</span>
						</Button>
					</CollapsibleTrigger>
					{images.length > 0 && (
						<CollapsibleContent>
							<ScrollArea className="w-fit h-[600px] overflow-y-auto rounded-md border ">
								<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 h-1/4">
									{images.map((props, index) => (
										<ImageCard
											key={index}
											{...props}
											index={index}
											setImage={setImages}
										/>
									))}
								</div>

								<ScrollBar orientation="vertical" />
							</ScrollArea>
						</CollapsibleContent>
					)}
				</Collapsible>
			</div>
		</div>
	);
};
const ImageCard = ({ preview, name, index, setImage }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [tempFilename, setTempFilename] = useState(name);
	const [filename, setFilename] = useState(name);
	const handleEdit = () => {
		setIsEditing(true);
		setTempFilename(filename);
	};
	const handleSave = () => {
		setFilename(tempFilename);
		setIsEditing(false);
		setImage((prevImages) => [
			...prevImages.slice(0, index),
			{ ...prevImages[index], name: tempFilename },
			...prevImages.slice(index + 1),
		]);
	};

	const handleCancel = () => {
		setTempFilename(filename);
		setIsEditing(false);
	};
	return (
		<Card
			className={` ${isEditing ? "w-72 h-96" : "size-64"} mx-auto overflow-hidden border-2 border-gray-200 rounded-lg transition-all duration-300 hover:shadow-lg mx-4`}
		>
			<CardHeader className="relative w-full h-48 mb-4">
				<Image
					src={preview}
					alt={filename}
					layout="fill"
					objectFit="cover"
					className="rounded-md"
				/>
			</CardHeader>
			<CardContent>
				{isEditing ? (
					<div className="space-y-2">
						<Label htmlFor="filename">Nombre de la Imagen</Label>
						<Input
							id="filename"
							value={tempFilename}
							onChange={(e) => setTempFilename(e.target.value)}
							className="w-full"
							placeholder="[Punto/pto]_#.{ext}"
						/>
					</div>
				) : (
					<div className="flex flex-row items-center justify-between">
						<p className="text-sm font-medium break-all truncate">{filename}</p>
						{!isEditing && (
							<Button variant="ghost" size="icon" onClick={handleEdit}>
								<Pencil className="h-4 w-4" />
							</Button>
						)}
					</div>
				)}
			</CardContent>
			{isEditing && (
				<CardFooter className="flex justify-end space-x-2">
					<Button variant="outline" size="sm" onClick={handleCancel}>
						<X className="h-4 w-4 mr-2" />
						Cancel
					</Button>
					<Button variant="default" size="sm" onClick={handleSave}>
						<Check className="h-4 w-4 mr-2" />
						Save
					</Button>
				</CardFooter>
			)}
		</Card>
	);
};
export default DropZone;
