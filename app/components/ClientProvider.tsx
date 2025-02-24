"use client"; // Mark this as a Client Component

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../styles/theme";
import { ReactNode } from "react";

export default function ClientProvider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}