module.exports = {
  stories: [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  staticDirs:["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-jest",
    "@storybook/addon-storyshots",
    "@storybook/testing-react",
    "@storybook/preset-create-react-app",
    "@storybook/addon-a11y"
  ],
  framework: "@storybook/react-webpack5",
  core: {
    builder: "@storybook/builder-webpack5"
  }
};