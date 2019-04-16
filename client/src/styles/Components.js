import styled from "styled-components";

const Bar = styled.div`
  position: relative;
  border-radius: 10px;
  padding: 1.1rem;
  background-color: #23a24d;
  color: white;
  letter-spacing: 2px;
  font-size: 1.3rem;
  cursor: pointer;
  background-image: linear-gradient(
    to right,
    rgba(75, 255, 100, 0.2) 15%,
    #23a24d,
    rgba(75, 255, 100, 0.2) 85%
  );
`;

const ButtonBlue = styled.button`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: #2979ff;
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;

  :hover {
    color: white;
    background-color: #1577ff;
  }

  :active {
    box-shadow: 0 0 0 3px #1577ff;
    background-color: white;
    color: #1577ff;
  }
`;

const ButtonGreen = styled.button`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: #23a24d;
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;

  :hover {
    color: white;
    background-color: #41c36c;
  }

  :active {
    box-shadow: 0 0 0 3px #41c36c;
    background-color: white;
    color: #41c36c;
  }
`;

const ButtonGrey = styled.button`
  text-decoration: none;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.8rem;
  background-color: #bdbdbd;
  color: white;
  letter-spacing: 1.5px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 0.9rem;
  outline: none;
  transition-duration: 0.1s;

  :hover {
    color: white;
    background-color: #cecece;
  }

  :active {
    box-shadow: 0 0 0 3px #cecece;
    background-color: white;
    color: #cecece;
  }
`;

export { Bar, ButtonBlue, ButtonGreen, ButtonGrey };
