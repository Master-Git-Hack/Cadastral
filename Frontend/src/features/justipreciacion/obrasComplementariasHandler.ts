/** @format */

export const checkError = (documentation: any) =>
	documentation
		.map((item: any, index: number) => {
			const list = {} as any;
			const { area, name, calculation } = item;
			if (name !== undefined && name.trim() === "") {
				list["name"] = {
					name: "Titulo",
					message: "El titulo no puede estar vacio",
					reference: `el documento ${index + 1}`,
				};
			}
			const { data } = area;
			list["area"] = data
				.map((element: any, indx: number) => {
					const { description } = element;
					if (description !== undefined && description.trim() === "") {
						return {
							name: "Producto",
							message: `La descripcion ${indx + 1} del producto no puede estar vacia`,
							reference: `el documento ${index + 1}`,
						};
					}
					return null;
				})
				.filter((element: any) => element !== null);
			list["calculation"] = calculation
				.map((element: any, indx: number) => {
					const { description } = element.quantity;
					if (description !== undefined && description.trim() === "") {
						return {
							name: "Descripcion",
							message: `La descripcion ${indx + 1} del calculo no puede estar vacia`,
							reference: `el documento ${index + 1}`,
						};
					}
					return null;
				})
				.filter((element: any) => element !== null);
			list["area"].length === 0 && delete list["area"];
			list["calculation"].length === 0 && delete list["calculation"];
			return Object.keys(list).length !== 0 ? list : null;
		})
		.filter((item: any) => item !== null);
