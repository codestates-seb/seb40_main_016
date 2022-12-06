import { createGlobalStyle } from "styled-components";
import variables from "./GloabalVariables";
import TmoneyRoundWindExtraBold from "../font/TmoneyRoundWindExtraBold.ttf";
import TmoneyRoundWindRegular from "../font/TmoneyRoundWindRegular.ttf";

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'TmoneyRoundWindExtraBold';
      src: local('TmoneyRoundWindExtraBold');
      font-weight: normal;
      font-style: normal;
      src: url(${TmoneyRoundWindExtraBold}) format('truetype');
  }

  @font-face {
      font-family: 'TmoneyRoundWindRegular';
      src: local('TmoneyRoundWindRegular');
      font-weight: normal;
      font-style: normal;
      src: url(${TmoneyRoundWindRegular}) format('truetype');
  }

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
    font-family: TmoneyRoundWindRegular;
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
    ${variables}
  }
`;

export default GlobalStyle;
