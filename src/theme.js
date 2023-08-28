import { responsiveFontSizes } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
const theme = responsiveFontSizes(
  createTheme({
    spacing: 4,
    typography: {
      fontFamily: "Nunito",
      h1: {
        fontSize: "5rem",
        fontWeight: 700,
      },
      h2: {
        fontSize: "3.5rem",
        fontStyle: "bold",
        fontWeight: 600,
      },
      h3: {
        fontSize: "2.5rem",
        fontWeight: 500,
      },
    },
    palette: {
      background: {
        default: "#fff", //white
      },
      primary: {
        main: "#FFB600", //orange
      },
      secondary: {
        main: "#000", //black
      },
      error: {
        main: "#D72A2A", //red
      },
      warning: {
        main: "#FC7B09", //orange
      },
      info: {
        main: "#6B7D6A", //gray
      },
      success: {
        main: "#09FE00", //green
      },
      text: {
        primary: "#000000", //black
        secondary: "#FFB600", //orange
        custom: "#fff", //white
      },
    },
  })
);

export default theme;
