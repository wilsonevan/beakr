import { createGlobalStyle } from "styled-components";

/*/// STYLES META DATA /////

COLORS______________________
green: #23a24d
blue: #2979ff
background-color: #f7f7f7

FONTS_______________________
Poppins: (weights) 300 & 600 

//////////////////////////*/

const GlobalColors = {
    PrimaryWhite: "#F2F2F2",
    PrimaryBlack: "#1C1C1C",
    PrimaryGrey: "#424242",
    SecondaryGrey: "#d3d3d3",
    PrimaryRed: "#FF6B5F",
    SecondaryRed: "#FF948C",
    PrimaryOrange: "#FFBD5F",
    SecondaryOrange: "#FFDBA8",
    PrimaryGreen: "#23a24d",
    SecondaryGreen: "#8CFFA0",
    SecondaryBlue: "#A9D3F8",
    PrimaryBlue: "#2979ff"
  };
  
  const GlobalSizes = {
      ScreenWidth: "800px"
  }

const GlobalStyles = createGlobalStyle`
* {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

body {
    box-sizing: border-box;
    font-family: "Poppins", sans-serif ;
    letter-spacing: 1.25px;
    font-weight: 300;
    color: ${GlobalColors.PrimaryBlue} ;
    background: ${GlobalColors.PrimaryWhite};
}

h1 {
    font-family: "Poppins", sans-serif !important;
    letter-spacing: 1.25px !important;
    font-weight: 300 !important;
    color: ${GlobalColors.PrimaryGreen};
}

h2, h3, h4, h5, h6,
p, div, button, a, 
input, select, textarea {
    font-family: "Poppins", sans-serif !important;
    font-weight: 300 !important;
    letter-spacing: 1.25px !important;
    color: ${GlobalColors.PrimaryGrey};
}
`;

export { GlobalStyles, GlobalColors, GlobalSizes };
