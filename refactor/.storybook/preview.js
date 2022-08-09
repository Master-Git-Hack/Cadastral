import * as NextImage from 'next/image';
import "../public/assets/css/globals.css";
import "../public/assets/css/bootstrap.min.css";
const BREAKPOINTS_INT = {
  xs: '320px',
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1600px',
};

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};