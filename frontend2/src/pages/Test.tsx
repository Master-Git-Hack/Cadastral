/** @format */
import React, { useEffect, useState } from "react";

import { convert2Base64 } from "../utils/utils.file";
import { View } from "../components/PaginatedView/PaginatedView";
import { Common } from "../modules/Homologacion/Factores/Factores.Common";
/**
const pages = [
	null,
	<Button>test</Button>,
	<Select
		label="test"
		data={[
			{ type: "text", value: 0.95 },
			{ type: "text 2", value: 1.1 },
			{ type: "text 3", value: 2.2 },
		]}
		onSelect={(value: any, item: any, event: any) => console.log(value, item)}
	/>,
	<Fancy
		value={0}
		onChange={function (event: ChangeEvent<HTMLInputElement>): void {
			throw new Error("Function not implemented.");
		}}
		name={""}
		label={""}
	/>,
	<FileTest />,
]; */
const pages: { [key: number]: React.ReactNode } = {
	1: <Common name="Building" />,
};
export default function Test() {
	return (
		<>
			<View title="Test" limitPages={10} pages={pages} />
			<Common name="Building" />
		</>
	);
}
