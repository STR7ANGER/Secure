// GlobalStyle.js
@tailwind base;
@tailwind components;
@tailwind utilities;

import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-image: linear-gradient(180deg, #0f1b28 0%, #1a2c44 100%);
    color: #ffffff; /* Set the text color */
    font-family: Arial, sans-serif;
    /* Add other common styles for the dark theme */
  }
`;

export default GlobalStyle;
