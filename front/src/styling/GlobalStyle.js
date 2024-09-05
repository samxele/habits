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

    /* Mobile Styles */
    @media (max-width: 768px) {
        body {
            font-size: 16px; /* Slightly larger font size for readability on small screens */
        }

        h1 {
            font-size: 1.8rem;
        }

        h2 {
            font-size: 1.5rem;
        }

        /* Adjust input and button sizes for touch interfaces */
        input, button {
            font-size: 16px; /* Prevents zooming on input focus on iOS */
            min-height: 44px; /* Minimum touch target size */
        }

        /* Prevent horizontal scrolling */
        .container {
            width: 100%;
            padding-left: 15px;
            padding-right: 15px;
            overflow-x: hidden;
        }
    }
`;

export default GlobalStyle;