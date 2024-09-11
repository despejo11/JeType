'use client'

import Header from './ui/Header/Header'
import { usePathname } from 'next/navigation'

export default function HeaderWrapper() {
  const pathname = usePathname()

  if (pathname !== '/' && pathname !== '/trainer') {
    return null
  }

  return <Header />
}
