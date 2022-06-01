/** @format */
import teaPot from "../assets/images/teapot.png";
export default function ErrorPage() {
	return (
		<div className="container container-fluid text-center px-5 mt-3">
			<h1 className="mb-5">¡Lo sentimos!</h1>
			<p>
				La página o ruta especifcada puede que se encuentre en cualquiera de estos estatus:
			</p>
			<ul className="list-group text-start mb-3">
				<li className="list-group-item list-group-item-danger">No existe.</li>
				<li className="list-group-item list-group-item-warning">Fue dada de baja.</li>
				<li className="list-group-item list-group-item-info">Esta en construcción.</li>
			</ul>
			<p className="mb-5">Favor de contactar al administrador del sistema.</p>
			<h2>
				<strong>Error 418!</strong>, I'm a teapot.
			</h2>
			<h4>
				The server refuses the attempt to brew coffee with a teapot, or the requested entity
				body is short and stout.
			</h4>
			<img src={teaPot} width="200" height="200" className="img-fluid" alt="teapot" />
			<p className="mb-5">Error reference for Hyper Text Coffee Pot Control Protocol</p>
		</div>
	);
}
