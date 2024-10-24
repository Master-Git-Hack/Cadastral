/** @format */

import { useState, useMemo, useCallback, memo, useEffect } from "react";
import Image from "next/image";
import { Card, CardHeader, CardContent, CardFooter } from "../card";
import { ChevronsUpDown, Plus, X, Pencil, Check, Trash } from "lucide-react";
import { Button } from "../button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../collapsible";
import { Input } from "../input";
import { Label } from "../label";
import { ScrollArea } from "@components/ui/scroll-area";
import { Warning } from "@components/ui/alert";
import Resizer from "react-image-file-resizer";
export const DropZone = () => {
	const [isDragging, setIsDragging] = useState(false);
	const [images, setImages] = useState([]);
	const [isOpen, setIsOpen] = useState(true);

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
	const resizeFile = (file) =>
		new Promise((resolve) => {
			Resizer.imageFileResizer(
				file,
				300,
				300,
				"JPEG",
				100,
				0,
				(uri) => {
					resolve(uri);
				},
				"base64",
			);
		});
	const handleFileChange = (e) => {
		const files = Array.from(e.target.files).map(async (file) => {
			const resized = await resizeFile(file);
			return new File([resized], file.name, { type: file.type });
		});
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

	const handleRemoveImage = useCallback((index) => {
		setImages((prevImages) => prevImages.filter((_, i) => i !== index));
	}, []);

	const memoizedImages = useMemo(() => images, [images]);
	const handleRenameImage = (index, newName) => {
		setImages((prevImages) => {
			const newImages = [...prevImages];
			newImages[index].name = newName;
			return newImages;
		});
	};
	const ImageCards = memo(() => (
		<div className="grid grid-cols-5 lg:grid-cols-4 md:grid-cols-6 sm:grid-cols-2 gap-2 md:gap-4 p-4 h-1/4">
			{memoizedImages.map((props, index) => (
				<ImageCard
					key={index}
					{...props}
					index={index}
					onRemove={handleRemoveImage}
					onRename={handleRenameImage}
				/>
			))}
		</div>
	));
	return (
		<div className="space-y-2">
			<div
				className={`w-full relative border-2 border-gray-300 border-dashed rounded-lg p-6 my-4 ${
					isDragging ? "border-indigo-600" : ""
				}`}
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
						</label>
					</h3>
					<p className="mt-1 text-xs text-gray-500">PNG, JPG up to 10MB</p>
				</div>
			</div>

			{memoizedImages.length > 0 && (
				<ScrollArea className="w-full h-[600px] overflow-y-auto rounded-md border">
					<ImageCards />
				</ScrollArea>
			)}
		</div>
	);
};

const ImageCard = memo(({ preview, name, index, onRemove, onRename }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState(name.split(".").shift());
	const [previousName, setPreviousName] = useState(name.split(".").shift());
	const [ext] = useState(name.split(".").pop());
	useEffect(() => {
		if (name !== newName) {
			setNewName(name.split(".").shift());
		}
		if (name !== previousName) {
			setPreviousName(name.split(".").shift());
		}
	}, [name]);
	const saveName = () => {
		if (newName !== previousName) {
			onRename(index, `${newName}.${ext}`);
			setPreviousName(newName);
		}
		setIsEditing(false);
	};

	const cancelName = () => {
		setNewName(previousName);
		setIsEditing(!isEditing);
	};
	return (
		<Card
			className={`${isEditing ? "w-64 h-96" : "size-64"} mx-auto  m-h-fit overflow-hidden border-2 border-gray-200 rounded-lg hover:shadow-lg mx-4`}
		>
			<CardHeader className="relative inline-block w-full h-48 mb-4">
				<Image
					src={preview}
					alt={name}
					layout="fill"
					objectFit="cover"
					className="rounded-md object-cover"
					loading="lazy"
				/>
				{!isEditing && (
					<>
						<Button
							variant="destructive"
							size="icon"
							className="absolute top-0 right-0 rounded-full z-10 opacity-50 hover:opacity-100 me-2"
							onClick={() =>
								Warning({
									title: "¿Estas seguro?",
									text: "Esta imagen sera eliminada.",
									showCancelButton: true,
									showCloseButton: true,
								}).then(({ isConfirmed }) => {
									if (isConfirmed) {
										onRemove(index);
									}
								})
							}
						>
							<Trash className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="absolute top-0 left-0 rounded-full z-10 hover:opacity-50 opacity-100 ms-2"
							onClick={cancelName}
						>
							<Pencil className="h-4 w-4" />
						</Button>
					</>
				)}
			</CardHeader>
			<CardContent>
				{isEditing ? (
					<div className="space-y-2">
						<Label htmlFor="filename">Nombre de la Imagen</Label>
						<Input
							id="filename"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							className="w-full"
							placeholder={`[Punto/pto]_#.${ext}`}
						/>
					</div>
				) : (
					<div className="flex flex-row items-center justify-between">
						<p className="text-sm font-medium break-all truncate">
							{newName}.{ext}
						</p>
					</div>
				)}
			</CardContent>
			{isEditing && (
				<CardFooter className="flex items-center justify-between">
					<Button variant="outline" size="sm" onClick={cancelName}>
						<X className="h-4 w-4 mr-2" />
						Cancelar
					</Button>
					<Button variant="success" size="sm" onClick={saveName}>
						<Check className="h-4 w-4 mr-2" />
						Guardar
					</Button>
				</CardFooter>
			)}
		</Card>
	);
});

export default DropZone;
