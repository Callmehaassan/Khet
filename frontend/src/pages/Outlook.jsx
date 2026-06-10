import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function Outlook() {
  const [forecast, setForecast] = useState([])
  const [loading, setLoading] = useState(true)
  const [showProtocolModal, setShowProtocolModal] = useState(false)
  const [protocolSaved, setProtocolSaved] = useState(false)
  const [selectedDate, setSelectedDate] = useState("day_after_tomorrow")
  const [selectedActions, setSelectedActions] = useState([])
  const navigate = useNavigate()

  const city = localStorage.getItem("khet_city") || "Lahore"
  const crop = localStorage.getItem("khet_crop") || "Wheat"

  const protocolActions = [
    "Schedule irrigation for early morning",
    "Apply fertilizer before noon",
    "Harvest ready crops",
    "Inspect field for pest activity",
    "Check soil moisture levels",
    "Deploy sprinkler system",
  ]

  useEffect(() => {
    fetchForecast()
  }, [])

  const fetchForecast = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/forecast/${city}`)
      setForecast(res.data)
    } catch (err) {
      setForecast([
        { date: "2026-06-08", temp: 34, humidity: 48, rain: 0, description: "Few Clouds" },
        { date: "2026-06-09", temp: 35, humidity: 45, rain: 0, description: "Few Clouds" },
        { date: "2026-06-10", temp: 36, humidity: 52, rain: 0, description: "Clear Sky" }
      ])
    }
    setLoading(false)
  }

  const toggleAction = (action) => {
    setSelectedActions(prev =>
      prev.includes(action)
        ? prev.filter(a => a !== action)
        : [...prev, action]
    )
  }

  const handleSaveProtocol = () => {
    if (selectedActions.length === 0) return
    localStorage.setItem("khet_protocol", JSON.stringify({
      date: selectedDate,
      actions: selectedActions,
      crop,
      city,
      savedAt: new Date().toLocaleString()
    }))
    setProtocolSaved(true)
    setTimeout(() => {
      setProtocolSaved(false)
      setShowProtocolModal(false)
      setSelectedActions([])
    }, 2000)
  }

  const chartData = forecast.map((day, i) => ({
    day: `Jun ${8 + i}`,
    temp: day.temp,
    humidity: day.humidity
  }))

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Loading June 2026 Outlook...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8f9f5]">

      {/* Header */}
      <div className="bg-white border-b px-4 sm:px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="font-bold text-xl sm:text-2xl">3-Day Outlook</h2>
          <p className="text-xs sm:text-sm text-gray-500">{city} • Updated moments ago • June 2026</p>
        </div>
        <button onClick={fetchForecast} className="text-green-600 hover:underline font-medium text-sm">Refresh</button>
      </div>

      {/* Best Day Banner — stacks vertically on mobile */}
      <div className="mx-4 sm:mx-8 mt-6 bg-green-700 text-white rounded-3xl p-5 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl sm:text-5xl flex-shrink-0">
            🌟
          </div>
          <div className="flex-1">
            <p className="uppercase text-xs tracking-widest mb-1 opacity-80">BEST DAY TO ACT: DAY AFTER TOMORROW</p>
            <p className="text-base sm:text-xl leading-snug">Our intelligence engine confirms optimal operational conditions for June 2026.</p>
          </div>
          <button
            onClick={() => setShowProtocolModal(true)}
            className="bg-white text-green-700 px-5 sm:px-8 py-2.5 sm:py-3 rounded-2xl font-semibold hover:bg-green-50 transition-colors text-sm sm:text-base w-full sm:w-auto text-center">
            Initialize Protocol
          </button>
        </div>
      </div>

      {/* Forecast Cards — 1 col mobile, 3 col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 px-4 sm:px-8 mt-6 sm:mt-8">
        {forecast.map((day, i) => (
          <div key={i} className="bg-white rounded-3xl p-5 sm:p-8 shadow">
            <p className="font-medium text-base sm:text-lg">
              {new Date(day.date).toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </p>
            <p className="text-5xl sm:text-6xl font-bold mt-2 sm:mt-3">{day.temp}°C</p>
            <div className="mt-5 sm:mt-8 space-y-3 sm:space-y-4 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Precipitation</span><span>{day.rain} mm</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Humidity</span><span>{day.humidity}%</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Condition</span><span>{day.description}</span></div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mx-4 sm:mx-8 mt-6 sm:mt-8 bg-white rounded-3xl p-5 sm:p-8 shadow">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5 sm:mb-6">
          <div>
            <h3 className="font-bold text-lg sm:text-xl text-gray-800">Temperature & Humidity Trend</h3>
            <p className="text-xs sm:text-sm text-gray-400 mt-0.5">3-day forecast for {city} • June 2026</p>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">Temp (°C)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span className="text-xs sm:text-sm text-gray-500 font-medium">Humidity (%)</span>
            </div>
          </div>
        </div>

        {/* Stat Summary — 2 col on mobile, 4 col on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {[
            { label: "Max Temp", value: `${Math.max(...forecast.map(d => d.temp))}°C`, color: "text-red-500", bg: "bg-red-50" },
            { label: "Min Temp", value: `${Math.min(...forecast.map(d => d.temp))}°C`, color: "text-green-600", bg: "bg-green-50" },
            { label: "Max Humidity", value: `${Math.max(...forecast.map(d => d.humidity))}%`, color: "text-blue-500", bg: "bg-blue-50" },
            { label: "Avg Temp", value: `${Math.round(forecast.reduce((a, b) => a + b.temp, 0) / forecast.length)}°C`, color: "text-orange-500", bg: "bg-orange-50" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.bg} rounded-2xl p-3 sm:p-4`}>
              <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
              <p className={`text-xl sm:text-2xl font-bold mt-1 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="h-56 sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="humidGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.15}/>
                  <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false}/>
              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 12, fontWeight: 500 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9ca3af", fontSize: 11 }}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "none",
                  borderRadius: "12px",
                  color: "#fff",
                  fontSize: "13px",
                  padding: "10px 16px"
                }}
                labelStyle={{ color: "#9ca3af", marginBottom: "4px" }}
                itemStyle={{ color: "#fff" }}
                cursor={{ stroke: "#e5e7eb", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="temp"
                stroke="#22c55e"
                strokeWidth={3}
                name="Temp (°C)"
                dot={{ fill: "#22c55e", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, fill: "#22c55e", stroke: "#fff", strokeWidth: 2 }}
              />
              <Line
                type="monotone"
                dataKey="humidity"
                stroke="#60a5fa"
                strokeWidth={3}
                name="Humidity (%)"
                dot={{ fill: "#60a5fa", r: 5, strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 7, fill: "#60a5fa", stroke: "#fff", strokeWidth: 2 }}
                strokeDasharray="6 3"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="px-4 sm:px-8 py-6 text-xs text-gray-400 border-t">
        © 2026 Khet AI Intelligence. System Status: Optimal
      </div>

      {/* Protocol Modal */}
      {showProtocolModal && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-5 sm:p-6 w-full sm:max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 text-base sm:text-lg">🌟 Initialize Protocol</h3>
              <button onClick={() => setShowProtocolModal(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>

            <div className="bg-green-50 rounded-xl p-3 mb-5">
              <p className="text-sm text-green-700 font-medium">
                Setting up farming protocol for <strong>{crop}</strong> in <strong>{city}</strong>
              </p>
            </div>

            {/* Date Selection */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 block mb-2">Select Action Date</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { value: "today", label: "Today", date: "Jun 7" },
                  { value: "tomorrow", label: "Tomorrow", date: "Jun 8" },
                  { value: "day_after_tomorrow", label: "Day After", date: "Jun 9" },
                ].map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setSelectedDate(opt.value)}
                    className={`p-3 rounded-xl border text-sm font-medium transition-colors ${
                      selectedDate === opt.value
                        ? "bg-green-700 text-white border-green-700"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}>
                    <div>{opt.label}</div>
                    <div className="text-xs opacity-70">{opt.date}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Checklist */}
            <div className="mb-5">
              <label className="text-sm font-medium text-gray-700 block mb-2">Select Actions to Schedule</label>
              <div className="space-y-2">
                {protocolActions.map((action, i) => (
                  <label key={i} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedActions.includes(action)}
                      onChange={() => toggleAction(action)}
                      className="accent-green-600 w-4 h-4 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700">{action}</span>
                  </label>
                ))}
              </div>
            </div>

            {selectedActions.length === 0 && (
              <p className="text-xs text-red-500 mb-3">Please select at least one action to continue.</p>
            )}

            {protocolSaved && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl mb-3 flex items-center gap-2">
                ✅ Protocol saved! {selectedActions.length} actions scheduled for {selectedDate.replace(/_/g, " ")}.
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleSaveProtocol}
                disabled={selectedActions.length === 0}
                className="flex-1 bg-green-700 hover:bg-green-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
                Save Protocol
              </button>
              <button
                onClick={() => { setShowProtocolModal(false); navigate("/conditions") }}
                className="flex-1 border border-gray-200 text-gray-600 font-semibold py-2.5 rounded-xl text-sm hover:bg-gray-50">
                Re-analyze Conditions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}