/** @format */

import { useEffect, useRef } from "react";
import { useMountEffect } from "primereact/hooks";
import { Messages } from "primereact/messages";
import { getNotifications } from "@reducers/Notifications";
import { useAppSelector } from "@redux/provider";
export default function Notify() {
	const msgs = useRef(null);
	const { notifications } = useAppSelector(getNotifications);
	useMountEffect(() => {
		msgs.current?.show(notifications);
	});

	return (
		<div className="card w-96">
			<Messages ref={msgs} />
		</div>
	);
}
