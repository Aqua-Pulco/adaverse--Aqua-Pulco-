import "./globals.css";
import Navbar from "@/components/Navbar";
import FloatingButton from "@/components/FloatingButton";



export default function RootLayout({ children, }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">

        <Navbar />

        <FloatingButton>Click me</FloatingButton>

        {children}


      </body>
    </html >
  );
}
