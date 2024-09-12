import localFont from 'next/font/local'
import './globals.css'
import Footer from './components/Footer'
import Header from './components/Header'

export const metadata = {
  title: 'Broadband Communication Networks',
  description: 'Communication technologies solution provider',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col relative pt-24">
        <Header />
        <main className='flex-shrink-0'>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
