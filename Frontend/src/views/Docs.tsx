/** @format */

export default function Docs() {
	return (
		<div className="embed-responsive">
			<iframe
				src="https://app.tango.us/app/embed/5cb712a5-e304-4531-a8b9-59e47e96c551?iframe"
				className="embed-responsive-item"
				sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
				security="restricted"
				title="Tango Workflow"
				width="100%"
				height={500}
				referrerPolicy="strict-origin-when-cross-origin"
				frameBorder="0"
				allowFullScreen={true}
			/>
		</div>
	);
}
