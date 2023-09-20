/** @format */

export interface Notification {
	id: string;
	severity: "error" | "success" | "info" | "warn";
	summary: string;
	detail: string;
	closable: boolean;
	sticky: boolean;
}
export interface NotificationPayload {
	id?: string;
	severity: "error" | "success" | "info" | "warn";
	summary: string;
	detail?: string;
}
export interface NotificationState {
	notifications: Notification[];
	badge: number;
}
