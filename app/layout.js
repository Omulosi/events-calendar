import "@radix-ui/themes/styles.css";
import "@styles/globals.css";
import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import Provider from "@components/Provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Events Calendar",
  description: "Schedule events on calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <Theme>{children}</Theme>
        </Provider>
      </body>
    </html>
  );
}
