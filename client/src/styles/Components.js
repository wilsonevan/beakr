import styled from "styled-components";
import {GlobalColors} from './GlobalStyles'

const Bar = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 1.1rem;
  background-color: ${GlobalColors.PrimaryGreen};
  color: white;
  letter-spacing: 2px;
  font-size: 1.3rem;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    rgba(75, 255, 100, 0.2) 15%,
    ${GlobalColors.PrimaryGreen},
    rgba(75, 255, 100, 0.2) 85%
  );
`;

const ButtonBlue = styled.button`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: ${GlobalColors.PrimaryBlue};;
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;

  :hover {
    color: white;
    background-color: ${GlobalColors.SecondaryBlue};
  }

  :active {
    box-shadow: 0 0 0 3px ${GlobalColors.SecondaryGrey};
    background-color: white;
    color: ${GlobalColors.PrimaryBlue};
  }
`;

const ButtonGreen = styled.button`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: ${GlobalColors.PrimaryGreen};
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;

  :hover {
    color: white;
    background-color: ${GlobalColors.SecondaryGreen};
  }

  :active {
    box-shadow: 0 0 0 3px ${GlobalColors.SecondaryGrey};
    background-color: white;
    color: ${GlobalColors.PrimaryGreen};
  }
`;

const ButtonGrey = styled.button`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: ${GlobalColors.PrimaryGrey};
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;

  :hover {
    color: white;
    background-color: ${GlobalColors.SecondaryGrey};
  }

  :active {
    box-shadow: 0 0 0 3px ${GlobalColors.SecondaryGrey};
    background-color: white;
    color: ${GlobalColors.PrimaryGrey};
  }
`;
const ButtonRed = styled.button`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: red;
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;

  :hover {
    color: white;
    background-color: red;
  }

  :active {
    box-shadow: 0 0 0 3px red;
    background-color: white;
    color: red;
  }
`;

export { Bar, ButtonBlue, ButtonGreen, ButtonGrey, ButtonRed };
