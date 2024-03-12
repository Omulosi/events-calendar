"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { createCustomTheme } from "@theme";

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
