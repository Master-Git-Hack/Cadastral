/** @format */

export type ICatastral = {};
export interface ICatastralPost {
	fetch: (fileName: string) => Promise<any>;
}
