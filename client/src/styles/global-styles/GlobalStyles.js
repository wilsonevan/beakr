import React from "react";
import { createGlobalStyle } from "styled-components";

///// STYLES META DATA /////
// styles go here

////////////////////////////

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
    background-color: #f7f7f7 !important;
}
`;

export { GlobalStyles };
