/** @format */

// Card.jsx
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card as Component, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
interface Coordinates {
	x: number;
	y: number;
	z: number;
}
interface CardProps {
	image: string;
	title: string;
	fields: Coordinates;
	onEdit: (fields: Coordinates) => void;
	loaded: boolean;
}
const Card = ({ image, title, fields, onEdit, loaded }: CardProps) => {
	const [isLoading, setIsLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [editFields, setEditFields] = useState(fields);
	useEffect(() => {
		if (loaded) {
			setIsLoading(false);
		}
	}, [loaded]);
	const handleEdit = () => {
		setIsEditing(!isEditing);
		if (isEditing) {
			onEdit(editFields);
		}
	};
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCoordinates((prev) => ({ ...prev, [name]: parseFloat(value) || 0 }));
	};
	if (isLoading)
		return (
			<Component className="w-full overflow-hidden border-2 border-gray-200 rounded-lg">
				<Skeleton className="h-48 w-full" />
				<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-8 w-8 rounded-full" />
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{["x", "y", "z"].map((coord) => (
							<div key={coord} className="flex items-center justify-between">
								<Skeleton className="h-4 w-4" />
								<Skeleton className="h-4 w-24" />
							</div>
						))}
					</div>
				</CardContent>
			</Component>
		);
	return (
		<Component className="w-full overflow-hidden border-2 border-gray-200 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary">
			<div className="relative w-full h-48">
				<Image src={image} alt={`Image for ${title}`} layout="fill" objectFit="cover" />
			</div>
			<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
				<CardTitle className="text-sm font-medium">{title}</CardTitle>
				<Button variant="ghost" size="icon" onClick={handleEdit}>
					{isEditing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
				</Button>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					{["x", "y", "z"].map((field) => (
						<div key={field} className="flex items-center justify-between">
							<span className="text-sm font-medium">{field.toUpperCase()}:</span>
							{isEditing ? (
								<Input
									type="number"
									name={field}
									value={fields[field as keyof Coordinates]}
									onChange={handleInputChange}
									className="w-24 text-right"
								/>
							) : (
								<span className="text-sm">
									{fields[field as keyof Coordinates]}
								</span>
							)}
						</div>
					))}
				</div>
			</CardContent>
		</Component>
	);
};

export default Card;
