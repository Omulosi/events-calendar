import Provider from "@components/Provider";

// import LayoutBodyWrapper from "@components/LayoutBodyWrapper";

// const inter = Inter({ subsets: ["latin"] });

import "@styles/globals.css";

export const metadata = {
  title: "Events Calendar",
  description: "Schedule events on calendar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
