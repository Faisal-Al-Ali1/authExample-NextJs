import NavBar from "./NavBar";
import "./globals.css"; 

export const metadata = {
  title: "My Next.js App",
  description: "Testing Auth with Next.js 13 App Router",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <main style={{ padding: "20px" }}>{children}</main>
      </body>
    </html>
  );
}
