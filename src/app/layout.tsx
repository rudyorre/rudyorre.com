import type { Metadata } from 'next'
import { Open_Sans } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/components/theme-provider'
import { MainNav } from '@/components/main-nav'
import { BreadCrumb } from '@/components/breadcrumb'

import { Background } from '@/components/background'
import { Footer } from '@/components/footer'

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: 'Rudy Orre Portfolio',
  description: 'Portfolio website for Rudy Orre. Showcases experience, projects, and more.',
  openGraph: { "images": "https://rudyorre.com/images/preview.png" }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <head>
        <title>Rudy Orre</title>
        <meta property="og:title" content="Rudy Orre Portfolio" />
        <meta property="og:description" content="Portfolio website for Rudy Orre. Showcases experience, projects, and more." />
        <meta property="og:image" content="https://rudyorre.com/images/preview.png" />
        <meta property="og:url" content="https://rudyorre.com" />
      </head>
      <body className={openSans.className}>
          <ThemeProvider
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            themes={['light', 'dark', 'paper', 'carbon', 'bento', 'miami']}
          > 
            <div className="flex flex-col min-h-screen">
              <Background />
              {/* <div className={`border-b fixed top-0 z-20 w-screen backdrop-filter backdrop-blur-lg bg-background/[0.7]`}>
                <div className="flex h-16 items-center px-4 max-w-screen-xl mx-auto">
                <MainNav className="mx-6" />
                <div className="ml-auto flex items-center space-x-4">
                <ModeToggle />
                </div>
                </div>
              </div> */}
              <MainNav className="mx-0" />
              <div className="h-16"></div>
              <div className="bg-bg-color mx-4 sm:mx-auto max-w-screen-lg flex-grow">
                <BreadCrumb />
                {children}
              </div>
              <Footer />
            </div>
          </ThemeProvider>
      </body>
    </html> 
  )
}
