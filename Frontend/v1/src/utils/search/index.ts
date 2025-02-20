/**
 * It takes an array of options and a type, and returns the first option that matches the type
 *
 * @format
 * @param {any} options - The options array that is passed to the component.
 * @param {string} type - The type of the option you want to find.
 */

export const searchByType = (options: Array<any>, label: string) =>
	options.find((option: any) => option.label === label);

/**
 * It takes an array of objects and a value, and returns the object in the array that has a value
 * property equal to the value passed in
 * @param {any} options - The array of options to search through.
 * @param {number} value - The value of the selected option.
 */
export const searchByValue = (options: Array<any>, value: string | number) =>
	options.find((option: any) => option.value === value);
