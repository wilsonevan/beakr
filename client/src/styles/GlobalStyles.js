import { createGlobalStyle } from "styled-components";

/*/// STYLES META DATA /////

COLORS______________________
green: #23a24d
blue: #0029ff
background-color: #f7f7f7

FONTS_______________________
Poppins: (weights) 300 & 600 

//////////////////////////*/

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: inherit !important;
}

body {
    box-sizing: border-box !important;
    font-family: "Poppins", sans-serif !important;
    letter-spacing: 1.25px !important;
    font-weight: 300 !important;
    color: #455A64 !important;
    background: #f7f7f7 !important;
}

h1 {
    font-family: "Poppins", sans-serif !important;
    letter-spacing: 1.25px !important;
    font-weight: 300 !important;
    color: #23a24d !important;
}

h2, h3, h4, h5, h6,
p, div, button, a, 
input, select, textarea {
    font-family: "Poppins", sans-serif !important;
    font-weight: 300 !important;
    letter-spacing: 1.25px !important;
}
`;

export { GlobalStyles };
