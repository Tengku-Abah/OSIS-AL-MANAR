import './globals.css';
import SmoothScroll from '../components/SmoothScroll';
import { AuthProvider } from '../context/AuthContext';
import ClientLayoutWrapper from '../components/ClientLayoutWrapper';

export const metadata = {
  title: 'OSIS AL-Manar - The Guiding Light',
  description: 'Website resmi OSIS AL-Manar, suar pemandu inovasi dan prestasi.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="flex flex-col min-h-screen relative">
        <AuthProvider>
          <SmoothScroll>
            <ClientLayoutWrapper>
              {children}
            </ClientLayoutWrapper>
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>
  );
}
