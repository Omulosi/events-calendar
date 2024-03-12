"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { createCustomTheme } from "@theme";

import "pure-react-carousel/dist/react-carousel.es.css";
import "simplebar-react/dist/simplebar.min.css";

const settings = {
  theme: "light",
  responsiveFontSizes: true,
};

const Provider = ({ children, session }) => {
  const theme = createCustomTheme({
    theme: settings.theme,
    responsiveFontSizes: settings.responsiveFontSizes,
  });

  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
