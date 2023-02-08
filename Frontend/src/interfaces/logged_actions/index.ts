/** @format */

export interface LoggedActions {
	schema_name?: string;
	table_name?: string;
	user_name?: string;
	action_tstamp?: string;
	action?: string;
	original_data?: string;
	new_data?: string;
	query?: string;
	client_addr?: string;
}
