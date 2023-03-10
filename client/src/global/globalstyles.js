import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-size: 13px;
    font-family: 'Noto Serif KR', serif;
    @media screen and (max-width: 480px) {
      font-size: 11px;
    }
  }

  h1 {
    font-size: 2rem !important;
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 1.5rem !important;
    margin-bottom: 0.5rem;
  }

  .bodymargin {
    padding-top: 70px;
  }

  .marginbase {
    display: flex;
    justify-content: center;
    background-color: var(--body_beige);
  }

  .margininside {
    display: flex;
    width: 1056px;
    padding: 0 16px 0;
  }

  .shadow {
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.4);
  }
  
  .buttonstyle {
    font-family: 'IBM Plex Sans KR', sans-serif;
    font-size: 1.1rem !important;
    border-radius: 4px;
  }

  .inputstyle {
    padding: 0.5rem;
    border: 1px solid var(--black);
    border-radius: 4px;

    &:focus {
      border: none;
      outline: 2px solid var(--signature);
    }
  }

  .errorstyle {
    color: var(--red);
  }

  .linkstyle {
    color: var(--black);
    cursor: pointer;
    :hover {
      color: var(--signature)
    }
  }

  :root {
    --black: rgba(0, 0, 0, 1);
    --signature: rgba(59, 152, 185, 1);
    --signature_070: rgba(59, 152, 185, 0.7);
    --bucket_brown: rgba(215, 184, 140, 1);
    --bucket_brown_070: rgba(215, 184, 140, 0.7);
    --product_cocoa: rgba(232, 213, 196, 1);
    --gray: rgba(238, 238, 238, 1);
    --head_brown: rgba(242, 233, 221, 1);
    --body_beige: rgba(252, 246, 236, 1);
    --white: rgba(255, 255, 255, 1);
    --white_020: rgba(255, 255, 255, 0.2);
    --red: rgba(255, 0, 0, 1); 
  }
`;

export default GlobalStyle;
