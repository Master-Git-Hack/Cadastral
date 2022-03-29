/** @format */
import teaPot from "../assets/images/teapot.png";
export default function ErrorPage() {
	return (
		<div className="container container-fluid text-center px-5 mt-3">
			<h1>
				¡Lo sentimos!
				<br />
				La página o ruta especifcada no existe o fue dada de baja.
			</h1>
			<br />
			<h2>
				<strong>Error 418!, I'm a teapot</strong>
			</h2>
			<h4>
				The server refuses the attempt to brew coffee with a teapot, or the requested entity
				body is short and stout.
			</h4>

			<img src={teaPot} width="200" height="200" className="img-fluid" alt="teapot" />
			<p className=" mb-5">Error reference for Hyper Text Coffee Pot Control Protocol</p>
		</div>
	);
}
