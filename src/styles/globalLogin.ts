import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #E52E40;
    --blue: #5428cc;
    --green: #33CC95;

    --blue-light: #6933ff;
    --dark-light: #1F1B24;
    --dark: #121212;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --background: #f0f2f5;
    --shape: #ffffff;
  }
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  html {
    @media (max-width: 1080px) {
      font-size: 93.75%;
    }

    @media (max-width: 720px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--blue);
    --webkit-font-smoothing: antialiased;
    color: var(--shape);
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100%;
  }

  body, input, textarea, button {
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
  }

  h1, h2, h3, h4, h5, strong {
    font-weight: 600;
  }

  button {
    cursor: pointer;
  }
`;