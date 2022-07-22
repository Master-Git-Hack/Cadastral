/** @format */

export const PillComponent = (props: { style?: string; value: string | number }) => (
	<small
		className={`badge rounded-pill my-auto bg-${
			props.style !== undefined ? props.style : "primary"
		} fw-lighter `}
	>
		{props.value}
	</small>
);
