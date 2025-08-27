import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import Navbar from './components/NavBar/Navbar'
import { ThemeProvider } from './context/Theme'
import Loading from './components/Loading/Loading'
import Home from './components/Home/Home'
import About from './components/About/About'
import Work from './components/Work/Work'
import Certificate from './components/Certificate/Certificate'
import ContactMe from './components/ContactMe/ContactMe'
import './App.css'

function App() {
  const [themeMode, setThemeMode] = useState("dark")
  const [isLoading, setIsLoading] = useState(true)

  const lightTheme = () => {
    setThemeMode("light")
  }

  const darkTheme = () => {
    setThemeMode("dark")
  }

  // actual change theme
  useEffect(() => {
    document.querySelector('html').classList.remove("light", "dark")
    document.querySelector("html").classList.add(themeMode)
  }, [themeMode])

  // loading completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500) // Adjust time as needed (4000ms = 4 seconds)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <ThemeProvider value={{themeMode, lightTheme, darkTheme}}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
          <Navbar />
          <main className="p-4">
            <Home/>
            <About/>
            <Work/>
            <Certificate/>
            <ContactMe/>
          </main>
        </div>
      )}
    </ThemeProvider>
  )
}

export default App