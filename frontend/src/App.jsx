import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import { DarkModeProvider } from "./DarkModeContext"
import Sidebar from "./components/Sidebar"
import SplashScreen from "./components/SplashScreen"
import Home from "./pages/Home"
import Conditions from "./pages/Conditions"
import Verdict from "./pages/Verdict"
import Outlook from "./pages/Outlook"

export default function App() {
  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    const seen = sessionStorage.getItem("khet_splash_seen")
    if (seen) setShowSplash(false)
  }, [])

  const handleSplashFinish = () => {
    sessionStorage.setItem("khet_splash_seen", "true")
    setShowSplash(false)
  }

  if (showSplash) return <SplashScreen onFinish={handleSplashFinish} />

  return (
    <DarkModeProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </DarkModeProvider>
  )
}

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-[#f8f9f5] dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 ml-64">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/conditions" element={<Conditions />} />
          <Route path="/verdict" element={<Verdict />} />
          <Route path="/outlook" element={<Outlook />} />
        </Routes>
      </main>
    </div>
  )
}