import "../public/assets/css/globals.css";
import "../public/assets/css/bootstrap.min.css";
require("rsuite/dist/rsuite.min.css");


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};