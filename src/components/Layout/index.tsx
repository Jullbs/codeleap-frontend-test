import { ReactNode } from 'react'
import Header from '../Header'
import { useRouter } from 'next/router'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter()

  return (
    <>
      {router.pathname !== '/' && <Header />}

      {children}
    </>
  )
}
