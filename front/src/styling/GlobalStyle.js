import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji';
        background-color: ${props => props.theme.colors.background};
        color: ${props => props.theme.colors.text.primary};
        font-size: 14px;
        line-height: 1.5;
    }

    * {
        box-sizing: border-box;
    }

    a {
        color: ${props => props.theme.colors.link};
        text-decoration: none;
    }

    button {
        font-family: inherit;
        font-size: 14px;
        line-height: 20px;
        font-weight: 500;
        cursor: pointer;
    }
`;

export default GlobalStyle;