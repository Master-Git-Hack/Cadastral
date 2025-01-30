/** @format */

import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	// ...compat.extends("next/typescript"), //"next/core-web-vitals",
	{
		rules: {
			"@typescript-eslint/no-unused-vars": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"@typescript-eslint/no-empty-object-type": "off",
			"react/no-unescaped-entities": "off",
			"react/jsx-key": "off",
			"react-hooks/exhaustive-deps": "off",
			"@typescript-eslint/no-unused-expressions": "off",
		},
	},
];

export default eslintConfig;
