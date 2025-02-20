/** @format */

export interface ICatastral {}
export interface ICatastralPost {
	fetch: (fileName: string) => Promise<>;
}
