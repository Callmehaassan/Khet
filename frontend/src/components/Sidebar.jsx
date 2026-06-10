import { useState } from "react"
import { NavLink } from "react-router-dom"
import { Home, Sun, Brain, BarChart3, Settings, Moon, Menu, X } from "lucide-react"
import { useDarkMode } from "../DarkModeContext"
import logo from "../logo.png"
 
export default function Sidebar() {
  const { darkMode, setDarkMode } = useDarkMode()
  const [mobileOpen, setMobileOpen] = useState(false)
 
  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/conditions", icon: Sun, label: "Today's Conditions" },
    { to: "/verdict", icon: Brain, label: "AI Verdict" },
    { to: "/outlook", icon: BarChart3, label: "3-Day Outlook" },
  ]
 
  const sidebarContent = (
    <>
      {/* Logo */}
      <div className={`px-6 py-5 border-b flex items-center justify-between ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <div className="flex items-center gap-3">
          <img src={logo} alt="Khet Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className={`font-bold text-lg leading-none ${darkMode ? "text-white" : "text-gray-900"}`}>Khet</h1>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Precision Agriculture</p>
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={() => setMobileOpen(false)}
          className={`md:hidden p-1 rounded-lg ${darkMode ? "text-gray-400 hover:bg-gray-800" : "text-gray-500 hover:bg-gray-100"}`}
        >
          <X size={20} />
        </button>
      </div>
 
      {/* Nav links */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800"
                  : darkMode
                  ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>
 
      {/* Dark mode toggle */}
      <div className={`px-3 py-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all ${darkMode ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
 
      {/* Settings */}
      <div className={`px-3 py-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <button className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full ${darkMode ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-50"}`}>
          <Settings size={18} />
          Settings
        </button>
      </div>
 
      {/* Footer */}
      <div className={`px-6 py-4 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>© {new Date().getFullYear()} Khet AI Intelligence</p>
        <p className="text-xs text-green-600 font-medium mt-0.5">System Status: Optimal</p>
      </div>
    </>
  )
 
  return (
    <>
      {/* ── MOBILE: hamburger button (top-left, always visible on small screens) ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className={`md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg shadow-md ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
      >
        <Menu size={22} />
      </button>
 
      {/* ── MOBILE: dark overlay behind drawer ── */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}
 
      {/* ── MOBILE: slide-in drawer ── */}
      <aside
        className={`md:hidden fixed top-0 left-0 h-screen w-72 flex flex-col z-50 transition-transform duration-300 ease-in-out
          ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {sidebarContent}
      </aside>
 
      {/* ── DESKTOP: normal fixed sidebar ── */}
      <aside className={`hidden md:flex fixed top-0 left-0 h-screen w-64 border-r flex-col z-50 transition-colors duration-300
        ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
        {sidebarContent}
      </aside>
    </>
  )
}