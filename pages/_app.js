import { useEffect, useState } from 'react'
import { analytics } from '../lib/firebase'
import { CookieWarning } from '../components/utils/CookieWarning'
import { DataProvider } from '../context/data-context'
import { Footer } from '../components/footer/Footer'
import { Navbar } from '../components/navbar/Navbar'
import { SettingsProvider } from '../context/settings-context'
import { AuthProvider } from '../context/AuthContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [showCookieWarning, setShowCookieWarning] = useState(false)

  useEffect(() => {
    const showWarning = window.localStorage.getItem('cookieWarning')
    setShowCookieWarning(showWarning === null)
    // Only initialize analytics on client side
    if (typeof window !== 'undefined' && analytics) {
      // analytics is already initialized in firebase.js
      // no need to call it as a function
    }
  }, [])

  function handleCookieWarning() {
    window.localStorage.setItem('cookieWarning', false)
    setShowCookieWarning(false)
  }

  return (
    <AuthProvider>
      <DataProvider>
        <SettingsProvider>
          <div className="bg-primary flex flex-col overflow-x-hidden text-fg-primary">
            <Navbar />
            <div className="flex justify-center px-2 lg:min-h-[80vh]">
              <Component {...pageProps} />
            </div>
            <Footer />
            {showCookieWarning && <CookieWarning onConfirm={handleCookieWarning} />}
          </div>
        </SettingsProvider>
      </DataProvider>
    </AuthProvider>
  )
}

export default MyApp
