/** @format */

export default function Error({ message }) {
	return (
		<div
			id="error-page"
			className="flex items-center justify-center h-screen bg-gray-100  bg-opacity-20 backdrop-blur rounded drop-shadow-lg"
		>
			<div className="z-10 bg-white  p-8 rounded-lg shadow-md text-center">
				<h1 className="text-4xl font-semibold mb-4">Oops!</h1>
				<p className="text-red-500 mb-4">¡Lo sentimos, un error acaba de suceder!</p>
				<p className="text-gray-600 text-center">{message} </p>
			</div>
		</div>
	);
}
