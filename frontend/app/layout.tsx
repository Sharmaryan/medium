import { NavBar } from "./components/NavBar/NavBar";
import { Providers } from "./providers";
import { cookies } from "next/headers";
import "./globals.css";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = (await cookies()).get("theme")?.value || "light";
  

  return (
    <html lang="en" className={theme}>
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
