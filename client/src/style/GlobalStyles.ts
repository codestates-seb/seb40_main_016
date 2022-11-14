import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
  	margin: 0;
  	padding: 0;
  	border: 0;
  	font-size: 100%;
  	font: inherit;
  	vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
  	display: block;
  }
  body {
  	line-height: 1;
  }
  ol, ul {
  	list-style: none;
  }
  blockquote, q {
  	quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
  	content: '';
  	content: none;
  }
  table {
  	border-collapse: collapse;
  	border-spacing: 0;
  }

  :root {
    --color-black: #0c0d0e
    --color-madium-black: #3b4045
    --color-light-black: #6a737c
    --color-yellow: #ffcc41
    --color-orange: #FF864B
    --color-faded-orange: #FFEDE6
    --color-red: #D20000
    --color-blue: #445cb4
    --color-sky: #63bff3
    --color-faded-sky: #EEFAFF
    --color-green: #5AB3B1
    --color-ivory: #F1F0ED

    --fs-pc-xlarge: 27px
    --fs-pc-large: 20px
    --fs-pc-regular: 16px 
    --fs-pc-small: 14px 
    --fs-pc-xsmall: 11px 
  }
`;

export default GlobalStyle;
