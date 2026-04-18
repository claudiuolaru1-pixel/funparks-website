import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
export const metadata = { title: "Funparks — The World's Theme Parks in Your Pocket", description: 'Discover 57+ theme parks worldwide.' };
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{overflowX:"hidden"}}><Navbar /><main>{children}</main><Footer /></body>
    </html>
  );
}
