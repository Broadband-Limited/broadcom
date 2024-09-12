'use client'
import { useState } from 'react'
import Link from 'next/link'
import Logo from './Logo'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact Us' },
  ]

  return (
    <header className="w-full flex items-center justify-between relative px-6 md:px-48 py-6">
      
      <Logo />

      <nav
        className={`menu absolute z-50 top-0 left-0 bg-r-black w-screen h-screen ${
          isMenuOpen ? 'flex' : 'hidden'
        } flex-col`}
      >
        <div className="w-full flex items-center justify-between px-6 md:px-48 py-6">
          <Logo white />
          <button onClick={toggleMenu} className='text-white text-lg'>&#x2715;</button>
        </div>

        <ul className="menu-list w-full h-full border-t px-6 md:px-64 py-6 flex flex-col gap-4">
          {menuItems.map((item) => (
            <li className="menu-item w-full h-fit py-4" key={item.href}>
              <Link href={item.href} className="text-r-ash text-4xl uppercase font-bold w-full" onClick={toggleMenu}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className={`hamburger w-4 aspect-square flex flex-col gap-1 ${
          isMenuOpen ? 'open' : ''
        }`}
        onClick={toggleMenu}
      >
        <span className="w-full h-[2px] bg-r-black"></span>
        <span className="w-full h-[2px] bg-r-black"></span>
      </button>
    </header>
  )
}

export default Header
