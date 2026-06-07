import { NavLink } from "react-router-dom"
import { Home, Sun, Brain, BarChart3, Settings, Moon } from "lucide-react"
import { useDarkMode } from "../DarkModeContext"

export default function Sidebar() {
  const { darkMode, setDarkMode } = useDarkMode()

  const links = [
    { to: "/", icon: Home, label: "Home" },
    { to: "/conditions", icon: Sun, label: "Today's Conditions" },
    { to: "/verdict", icon: Brain, label: "AI Verdict" },
    { to: "/outlook", icon: BarChart3, label: "3-Day Outlook" },
  ]

  return (
    <aside className={`fixed top-0 left-0 h-screen w-64 border-r flex flex-col z-50 transition-colors duration-300 ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
      <div className={`px-6 py-5 border-b ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <div className="flex items-center gap-3">
          <img src="/src/logo.png" alt="Khet Logo" className="w-10 h-10 object-contain" />
          <div>
            <h1 className={`font-bold text-lg leading-none ${darkMode ? "text-white" : "text-gray-900"}`}>Khet</h1>
            <p className={`text-xs mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Precision Agriculture</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {links.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
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

      <div className={`px-3 py-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full transition-all ${darkMode ? "bg-gray-800 text-yellow-400 hover:bg-gray-700" : "bg-gray-50 text-gray-600 hover:bg-gray-100"}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <div className={`px-3 py-3 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <button className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium w-full ${darkMode ? "text-gray-400 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-50"}`}>
          <Settings size={18} />
          Settings
        </button>
      </div>

      <div className={`px-6 py-4 border-t ${darkMode ? "border-gray-800" : "border-gray-100"}`}>
        <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>© {new Date().getFullYear()} Khet AI Intelligence</p>
        <p className="text-xs text-green-600 font-medium mt-0.5">System Status: Optimal</p>
      </div>
    </aside>
  )
}