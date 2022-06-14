/** @format */

export const checkErrorr = (documentation: any) => {
	const errors = documentation.map((item: any) => {
		const data = [];
		item.name.trim().includes("") &&
			data.push({
				name: "",
			});
	});
	return errors;
};
