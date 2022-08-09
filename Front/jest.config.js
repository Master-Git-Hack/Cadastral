const nextJest = require("next/jest");
const createJestConfig = nextJest({dir:"./"});
const customJestConfig = {
    testEnvironment: "node",
    clearMocks: true,
    moduleDirectories: ["node_modules", "src"],
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],

};
module.exports = createJestConfig(customJestConfig);