"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";

const Provider = ({ children, session }) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider theme={{}}>{children}</ThemeProvider>
    </SessionProvider>
  );
};

export default Provider;
