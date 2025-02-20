/** @format */

import moment from "moment";
/** Gives the current date
 * @param {string} format - The format of the date by default it is YYYY-MM-DD HH:mm:ss
 * @returns {string} - The current date in the format of YYYY-MM-DD HH:mm:ss
 */
export const getNow = (format?: string): string => moment().format(format ?? "YYYY-MM-DD HH:mm:ss");

export const idleTime = (time: string): boolean => moment(time).diff(moment(), "minutes") <= -90;
