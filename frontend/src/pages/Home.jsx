import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useDarkMode } from "../DarkModeContext"

const CITIES = ["Lahore", "Karachi", "Islamabad", "Multan", "Faisalabad", "Peshawar", "Quetta", "Hyderabad"]
const CROPS = ["Wheat", "Rice", "Sugarcane", "Cotton", "Maize"]

export default function Home() {
  const [city, setCity] = useState("Lahore")
  const [crop, setCrop] = useState("Wheat")
  const [showSensorModal, setShowSensorModal] = useState(false)
  const [humidityThreshold, setHumidityThreshold] = useState(60)
  const [irrigationTime, setIrrigationTime] = useState("06:00")
  const [saved, setSaved] = useState(false)
  const navigate = useNavigate()
  const { darkMode } = useDarkMode()

  const today = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })

  const handleAnalyze = () => {
    localStorage.setItem("khet_city", city)
    localStorage.setItem("khet_crop", crop)
    navigate("/conditions")
  }

  const handleSaveSensors = () => {
    localStorage.setItem("khet_humidity_threshold", humidityThreshold)
    localStorage.setItem("khet_irrigation_time", irrigationTime)
    setSaved(true)
    setTimeout(() => { setSaved(false); setShowSensorModal(false) }, 1500)
  }

  return (
    <div className={`min-h-screen w-full overflow-x-hidden ${darkMode ? "bg-gray-950" : "bg-[#f0f4f0]"}`}>

      {/* Top Nav — hidden on mobile (hamburger handles nav), visible on desktop */}
      <div className={`hidden md:flex px-8 py-3 items-center justify-between border-b ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200"}`}>
        <div className="flex items-center gap-8">
          <span className={`font-bold text-base ${darkMode ? "text-white" : "text-gray-900"}`}>Khet</span>
          <div className="flex gap-5 text-sm">
            {["Lahore", "Karachi", "Wheat", "Cotton"].map(item => (
              <span key={item} className={`hover:text-green-600 cursor-pointer transition-colors ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{item}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className={`text-xs font-semibold ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{today}</p>
            <p className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>DASHBOARD ACCESS</p>
          </div>
          <div className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center text-white text-sm font-bold">A</div>
        </div>
      </div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center w-full"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>

        <div className="relative z-10 flex flex-col justify-center px-4 sm:px-6 md:px-10 py-10 md:h-[480px]">
          <div className="inline-flex items-center gap-2 bg-green-500 text-white text-xs font-bold px-4 py-1.5 rounded-full mb-5 w-fit">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE MARKET DATA ACTIVE
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight max-w-xl mb-3 drop-shadow-lg">
            Make Smarter Farming Decisions with AI
          </h1>
          <p className="text-gray-200 max-w-md text-sm mb-6 md:mb-8 leading-relaxed">
            Weather, economy, market sentiment, and crop intelligence combined into one platform for the modern agricultural enterprise.
          </p>

          {/* Selection Card */}
          <div className={`backdrop-blur-sm rounded-2xl shadow-2xl p-5 md:p-6 w-full max-w-xl border ${darkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-white/50"}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-4">
              <div>
                <label className={`block text-xs font-bold tracking-widest mb-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>SELECT CITY</label>
                <div className="relative">
                  <select value={city} onChange={e => setCity(e.target.value)}
                    className={`w-full border-2 rounded-xl px-3 md:px-4 py-2.5 focus:outline-none focus:border-green-500 text-sm appearance-none font-medium ${darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-800"}`}>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <span className={`absolute right-3 top-3 pointer-events-none text-xs ${darkMode ? "text-gray-400" : "text-gray-400"}`}>▾</span>
                </div>
              </div>
              <div>
                <label className={`block text-xs font-bold tracking-widest mb-2 ${darkMode ? "text-gray-300" : "text-gray-500"}`}>SELECT CROP</label>
                <div className="relative">
                  <select value={crop} onChange={e => setCrop(e.target.value)}
                    className={`w-full border-2 rounded-xl px-3 md:px-4 py-2.5 focus:outline-none focus:border-green-500 text-sm appearance-none font-medium ${darkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-800"}`}>
                    {CROPS.map(c => <option key={c}>{c}</option>)}
                  </select>
                  <span className={`absolute right-3 top-3 pointer-events-none text-xs ${darkMode ? "text-gray-400" : "text-gray-400"}`}>▾</span>
                </div>
              </div>
            </div>
            <button onClick={handleAnalyze}
              className="w-full bg-green-700 hover:bg-green-800 active:scale-95 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 text-base transition-all duration-200 shadow-lg shadow-green-900/30">
              <span>⊞</span> Analyze My Conditions
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards Row */}
      <div className="px-4 sm:px-6 md:px-8 py-6 md:py-8 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">

        {/* Soil Health */}
        <div className={`rounded-3xl p-5 sm:p-6 md:p-7 shadow-lg ${darkMode ? "bg-gray-900" : "bg-white"}`}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>Soil Health Index</p>
              <p className="text-green-500 text-sm font-medium mt-0.5">↗ +2.4% from last week</p>
            </div>
            <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center text-xl flex-shrink-0">🌱</div>
          </div>
          <div className="flex items-center justify-center py-4">
            <div className="relative w-36 h-36">
              <svg className="w-36 h-36 -rotate-90" viewBox="0 0 36 36">
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke={darkMode ? "#374151" : "#e5e7eb"} strokeWidth="3.5"/>
                <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none" stroke="#16a34a" strokeWidth="3.5" strokeDasharray="75, 100" strokeLinecap="round"/>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-3xl font-extrabold ${darkMode ? "text-white" : "text-gray-800"}`}>75%</span>
                <span className="text-xs text-green-600 font-bold tracking-widest">OPTIMAL</span>
              </div>
            </div>
          </div>
          <div className={`rounded-xl p-3 text-center text-xs font-medium ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-50 text-gray-500"}`}>
            Soil moisture levels are within optimal range for {crop} cultivation
          </div>
        </div>

        {/* Market Price */}
        <div className={`rounded-3xl p-5 sm:p-6 md:p-7 shadow-lg ${darkMode ? "bg-gray-900" : "bg-white"}`}>
          <div className="flex justify-between items-start mb-4">
            <p className={`text-xs font-bold tracking-widest uppercase ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Market Price</p>
            <span className="bg-amber-400 text-amber-900 text-xs font-extrabold px-3 py-1 rounded-full flex-shrink-0">
              {crop.toUpperCase()}
            </span>
          </div>
          <p className={`text-4xl sm:text-5xl font-extrabold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>Rs. 4,500</p>
          <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>/mnd (per maund)</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-red-500 text-sm font-semibold">↘ -0.5% market dip</span>
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>7-day trend</span>
              <span className="text-red-500">Declining</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-green-500 to-red-400 rounded-full"></div>
            </div>
          </div>
          <div className={`mt-4 rounded-xl p-3 ${darkMode ? "bg-gray-800" : "bg-amber-50"}`}>
            <p className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-amber-700"}`}>
              💡 Prices expected to recover by next week based on seasonal trends.
            </p>
          </div>
        </div>

        {/* Next Harvest */}
        <div className="bg-gradient-to-br from-green-700 to-green-900 rounded-3xl p-5 sm:p-6 md:p-7 shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-8 translate-x-8"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <p className="text-xs font-bold tracking-widest text-green-200 uppercase">Next Harvest</p>
              <div className="w-9 h-9 bg-white/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🕒</div>
            </div>
            <p className="text-5xl sm:text-6xl font-extrabold leading-none">18</p>
            <p className="text-2xl sm:text-3xl font-bold text-green-200 mt-1">Days</p>
            <p className="text-green-300 text-sm mt-3">Expected yield: 45 maunds per acre</p>
            <div className="mt-4 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="h-full w-[70%] bg-white/60 rounded-full"></div>
            </div>
            <p className="text-green-300 text-xs mt-1">70% of growing season complete</p>
            <button
              onClick={() => navigate("/verdict")}
              className="mt-5 w-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold tracking-widest py-2.5 rounded-xl transition-colors border border-white/20">
              PREDICTIVE AI STATUS →
            </button>
          </div>
        </div>
      </div>

      {/* Irrigation Strategy */}
      <div className="px-4 sm:px-6 md:px-8 pb-8">
        <div className={`rounded-3xl p-5 md:p-6 shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-5 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border border-blue-100">
            💧
          </div>
          <div className="flex-1">
            <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>Irrigation Strategy</p>
            <p className={`text-sm mt-0.5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Smart sprinklers activated based on 6PM humidity forecast.</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-semibold">System Active — Next cycle at 18:00</span>
            </div>
          </div>
          <button onClick={() => setShowSensorModal(true)}
            className={`w-full md:w-auto border-2 text-sm font-bold px-6 py-3 rounded-xl transition-all flex-shrink-0 ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"}`}>
            CONFIGURE SENSORS
          </button>
        </div>
      </div>

      {/* Sensor Modal */}
      {showSensorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className={`rounded-2xl p-6 w-full max-w-sm shadow-2xl ${darkMode ? "bg-gray-900 border border-gray-700" : "bg-white"}`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>💧 Configure Sensors</h3>
              <button onClick={() => setShowSensorModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-5">
              <div>
                <label className={`text-sm font-medium block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Humidity Threshold</label>
                <input type="range" min="20" max="100" value={humidityThreshold}
                  onChange={e => setHumidityThreshold(e.target.value)} className="w-full accent-green-600"/>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>20%</span>
                  <span className="font-bold text-green-600">{humidityThreshold}%</span>
                  <span>100%</span>
                </div>
              </div>
              <div>
                <label className={`text-sm font-medium block mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Irrigation Start Time</label>
                <input type="time" value={irrigationTime} onChange={e => setIrrigationTime(e.target.value)}
                  className={`w-full border rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-500 ${darkMode ? "bg-gray-800 border-gray-600 text-white" : "border-gray-200"}`}/>
              </div>
              <div className="bg-green-50 rounded-xl p-3">
                <p className="text-xs text-green-700">
                  💧 Sprinklers activate when humidity drops below <strong>{humidityThreshold}%</strong> at <strong>{irrigationTime}</strong>.
                </p>
              </div>
              {saved && (
                <div className="bg-green-100 text-green-700 text-sm font-medium text-center py-2 rounded-xl">
                  ✅ Configuration saved successfully!
                </div>
              )}
              <div className="flex gap-3">
                <button onClick={handleSaveSensors}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                  Save Configuration
                </button>
                <button onClick={() => setShowSensorModal(false)}
                  className={`flex-1 border font-semibold py-2.5 rounded-xl text-sm ${darkMode ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}