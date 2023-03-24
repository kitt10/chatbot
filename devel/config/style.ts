import { css } from '@emotion/react'


export const colors = {
    primary: '#00008b',        // DarkBlue
    secondary: '#eeeeee',      // LightGray
    blond: '#ffffff',          // White
    dark: '#000000',           // Black
    highlight: '#f7edad',      // DarkYellow
    gray: '#dddddd',           // DarkerGray
    inverse: '#800000',        // Maroon
    green: '#008000',          // DarkGreen
    darkgray: '#aaaaaa'        // DarkGray
  }
  
  export const view = {
    headerHeight: '50px'
}

export const pageS = css({
    display: 'flex',
    flexDirection: 'column',
    minWidth: '100vh',
    minHeight: '100vh',
    maxHeight: '100vh',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'flex-start'
})

  export const globalStyle = css`
html {
    background: black;
  }
  body {
    min-width: 100vh;
    min-height: 100vh;
    margin: 0 auto;
    background: ${colors.secondary};
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

a {
  color: inherit;
  text-decoration: none;
}
`