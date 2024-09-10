import localFont from 'next/font/local'
import './globals.css'
import Footer from './components/Footer'
import Header from './components/Header'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata = {
  title: 'Broadband Communication Networks',
  description: 'Communication technologies solution provider',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <Header />
        <main className='flex-shrink-0'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
