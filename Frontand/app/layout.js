import './globals.css';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { GlobalBackground } from '../components/GlobalBackground';
import SmoothScroll from '../components/SmoothScroll';

export const metadata = {
  title: 'OSIS AL-Manar - The Guiding Light',
  description: 'Website resmi OSIS AL-Manar, suar pemandu inovasi dan prestasi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen relative">
        <SmoothScroll>
          <GlobalBackground />
          <Navbar />
          <main className="flex-grow pt-24 relative z-10">
            {children}
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
