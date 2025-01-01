import { NavBar } from "./components/NavBar/NavBar";
import { Providers } from "./providers";
import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar/>
          {children}
        </Providers>
      </body>
    </html>
  );
}
