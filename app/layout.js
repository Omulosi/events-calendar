import "@radix-ui/themes/styles.css";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Events Calendar",
  description: "Schedule events easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Theme>{children}</Theme>
      </body>
    </html>
  );
}
