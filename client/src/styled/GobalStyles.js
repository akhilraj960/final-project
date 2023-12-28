// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: black;
    font-family: 'Poppins', sans-serif;
  }
  a{
    color: blue;
    text-decoration: none;
  }
  body{
    background: #eff6ff;
    min-height: 100vh;
    min-width: 100vw;
}
`;

export default GlobalStyle;
