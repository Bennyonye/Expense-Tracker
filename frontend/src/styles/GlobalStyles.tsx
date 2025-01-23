import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
    :root {
    --primary-color: #222260;
    --primary-color2: 'color: rgba(34, 34, 96, 0.8)';
    --primary-color3: 'color: rgba(34, 34, 96, 0.5)';
    --color-green: #42AD00;
    --color-grey: #aaaaaa;
    --color-accent: #F56692;
    --color-delete: #FF0000;
}
body {
    font-family: "Nunito", serif;
    font-size: clamp(1rem, 1.5vw, 2rem);
    overlow: hidden;
    font-optical-sizing: auto;
    color: rgba(34, 34, 96, 0.8);
}

`;
