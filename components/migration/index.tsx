/** @format */

"use client";

// Componentes básicos de migración compatibles - usando JSX.Element para evitar conflictos
export function MigrationTable({ children, className = "" }: { children: any; className?: string }): JSX.Element {
	return (
		<table className={`w-full border-collapse border border-gray-300 ${className}`}>
			{children}
		</table>
	);
}

export function MigrationTableHeader({ children, className = "" }: { children: any; className?: string }): JSX.Element {
	return (
		<thead className={`bg-gray-100 dark:bg-gray-800 ${className}`}>
			{children}
		</thead>
	);
}

export function MigrationTableBody({ children, className = "" }: { children: any; className?: string }): JSX.Element {
	return (
		<tbody className={className}>
			{children}
		</tbody>
	);
}

export function MigrationTableRow({ children, className = "" }: { children: any; className?: string }): JSX.Element {
	return (
		<tr className={`border-b border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-900 ${className}`}>
			{children}
		</tr>
	);
}

export function MigrationTableCell({ 
	children, 
	className = "", 
	colSpan,
	onClick 
}: { 
	children: any; 
	className?: string; 
	colSpan?: number;
	onClick?: () => void;
}): JSX.Element {
	return (
		<td 
			className={`p-3 border border-gray-300 ${onClick ? 'cursor-pointer' : ''} ${className}`}
			colSpan={colSpan}
			onClick={onClick}
		>
			{children}
		</td>
	);
}

export function MigrationTableHeaderCell({ children, className = "" }: { children: any; className?: string }): JSX.Element {
	return (
		<th className={`p-3 border border-gray-300 font-semibold text-left ${className}`}>
			{children}
		</th>
	);
}

export function MigrationButton({ 
	children, 
	onClick, 
	disabled = false, 
	variant = 'primary',
	size = 'md',
	className = ""
}: {
	children: any;
	onClick?: () => void;
	disabled?: boolean;
	variant?: 'primary' | 'secondary' | 'danger' | 'success';
	size?: 'sm' | 'md' | 'lg';
	className?: string;
}): JSX.Element {
	const baseClasses = "font-medium rounded transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
	
	const variantClasses = {
		primary: "bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-500",
		secondary: "bg-gray-500 hover:bg-gray-600 text-white focus:ring-gray-500",
		danger: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500",
		success: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-500",
	};
	
	const sizeClasses = {
		sm: "px-2 py-1 text-sm",
		md: "px-4 py-2",
		lg: "px-6 py-3 text-lg",
	};
	
	const disabledClasses = disabled ? "opacity-50 cursor-not-allowed" : "";
	
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${disabledClasses} ${className}`}
		>
			{children}
		</button>
	);
}

export function MigrationInput({
	type = "text",
	value,
	onChange,
	placeholder,
	disabled = false,
	className = "",
	name,
}: {
	type?: string;
	value?: string | number;
	onChange?: (e: any) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	name?: string;
}): JSX.Element {
	return (
		<input
			type={type}
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			disabled={disabled}
			name={name}
			className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${disabled ? 'bg-gray-100 cursor-not-allowed' : ''} ${className}`}
		/>
	);
}

export function MigrationCard({ children, className = "", title, description }: { 
	children: any; 
	className?: string; 
	title?: string;
	description?: string;
}): JSX.Element {
	return (
		<div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
			{title && (
				<div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
					<h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
					{description && (
						<p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{description}</p>
					)}
				</div>
			)}
			<div className="p-6">
				{children}
			</div>
		</div>
	);
}

export function MigrationSpinner({ size = 'md', className = "" }: { size?: 'sm' | 'md' | 'lg'; className?: string }): JSX.Element {
	const sizeClasses = {
		sm: "w-4 h-4",
		md: "w-8 h-8",
		lg: "w-12 h-12",
	};
	
	return (
		<div className={`animate-spin rounded-full border-2 border-gray-300 border-t-blue-500 ${sizeClasses[size]} ${className}`} />
	);
}

export function MigrationAlert({ children, type = 'info', className = "" }: { 
	children: any; 
	type?: 'info' | 'success' | 'warning' | 'error'; 
	className?: string;
}): JSX.Element {
	const typeClasses = {
		info: "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900 dark:border-blue-800 dark:text-blue-200",
		success: "bg-green-50 border-green-200 text-green-800 dark:bg-green-900 dark:border-green-800 dark:text-green-200",
		warning: "bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:border-yellow-800 dark:text-yellow-200",
		error: "bg-red-50 border-red-200 text-red-800 dark:bg-red-900 dark:border-red-800 dark:text-red-200",
	};
	
	return (
		<div className={`border rounded-lg p-4 ${typeClasses[type]} ${className}`}>
			{children}
		</div>
	);
}

export default {
	Table: MigrationTable,
	TableHeader: MigrationTableHeader,
	TableBody: MigrationTableBody,
	TableRow: MigrationTableRow,
	TableCell: MigrationTableCell,
	TableHeaderCell: MigrationTableHeaderCell,
	Button: MigrationButton,
	Input: MigrationInput,
	Card: MigrationCard,
	Spinner: MigrationSpinner,
	Alert: MigrationAlert,
};
