import classNames from 'classnames';
import './globals.css';
import { Roboto } from 'next/font/google';
import LocalFont from 'next/font/local';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

const roboto = Roboto({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-roboto',
});

const sfProText = LocalFont({
  src: [
    { path: './fonts/SFProText-Regular.ttf', weight: '400' },
    { path: './fonts/SFProText-RegularItalic.ttf', weight: '400', style: 'italic' },
  ],
  variable: '--font-sfprotxt',
  display: 'swap',
});

export const metadata = {
  title: 'Билетопоиск',
  description: 'Купи билет',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={classNames(sfProText.variable, roboto.variable)}>
        <div className="relative">
          <div id="dropdown-container"></div>
          <div id="backdrop-container"></div>
          <div id="modal-container"></div>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
