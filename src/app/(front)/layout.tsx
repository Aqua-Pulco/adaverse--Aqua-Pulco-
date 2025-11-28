import "./globals.css";
import Navbar from "@/components/Navbar";
import Header from "@/components/Header";



export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>

        <Navbar />
             {children}
        <Header/>

      </body>
    </html >
  );
}
