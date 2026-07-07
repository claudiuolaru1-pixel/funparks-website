import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://funparks.app'),
  title: {
    default: 'Funparks - Theme Park Guide & Wait Times App',
    template: '%s | Funparks',
  },
  description: 'Plan the perfect theme park day with Funparks. Live wait times, interactive maps, My Day planner, food guides and hotels for 60+ parks worldwide. Free on iOS & Android.',
  keywords: ['theme park app', 'theme park wait times', 'disney world app', 'universal studios app', 'roller coaster guide', 'theme park planner'],
  authors: [{ name: 'Funparks', url: 'https://funparks.app' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://funparks.app',
    siteName: 'Funparks',
    title: 'Funparks - Theme Park Guide & Wait Times App',
    description: 'Plan the perfect theme park day. Live wait times, maps, My Day planner for 60+ parks worldwide.',
    images: [{ url: 'https://funparks.app/screenshots/funparks_social.jpg', width: 1200, height: 630, alt: 'Funparks App' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Funparks - Theme Park Guide & Wait Times App',
    description: 'Plan the perfect theme park day. Live wait times, maps, My Day planner for 60+ parks worldwide.',
    images: ['https://funparks.app/screenshots/funparks_social.jpg'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#0d3b7a" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'MobileApplication',
          name: 'Funparks',
          description: 'Theme park guide with live wait times, interactive maps, and My Day planner for 60+ parks worldwide.',
          url: 'https://funparks.app',
          applicationCategory: 'TravelApplication',
          operatingSystem: 'iOS, Android',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        }) }} />
      </head>
      <body style={{ overflowX: 'hidden' }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}