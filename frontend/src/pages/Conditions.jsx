import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useDarkMode } from "../DarkModeContext"

export default function Conditions() {
  const [weather, setWeather] = useState(null)
  const [economy, setEconomy] = useState(null)
  const [news, setNews] = useState([])
  const [sentiment, setSentiment] = useState(0)
  const [loading, setLoading] = useState(true)
  const [showAllReports, setShowAllReports] = useState(false)
  const navigate = useNavigate()
  const { darkMode } = useDarkMode()

  const city = localStorage.getItem("khet_city") || "Lahore"
  const crop = localStorage.getItem("khet_crop") || "Wheat"

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [weatherRes, economyRes, newsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/api/weather/${city}`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/economy`),
        axios.get(`${import.meta.env.VITE_API_URL}/api/news`)
      ])
      setWeather(weatherRes.data)
      setEconomy(economyRes.data)
      setNews(newsRes.data.articles)

      const scores = newsRes.data.articles.map(a => {
        const positive = ["record", "increase", "stable", "good", "optimal", "boost"].some(w => a.title.toLowerCase().includes(w))
        const negative = ["fall", "drop", "crisis", "flood", "drought", "loss", "disruption"].some(w => a.title.toLowerCase().includes(w))
        return positive ? 0.3 : negative ? -0.3 : 0
      })
      const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0
      setSentiment(parseFloat(avg.toFixed(2)))
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const handleGetVerdict = () => {
    localStorage.setItem("khet_weather", JSON.stringify(weather))
    localStorage.setItem("khet_economy", JSON.stringify(economy))
    localStorage.setItem("khet_sentiment", sentiment)
    navigate("/verdict")
  }

  const getTempLabel = (temp) => temp > 40 ? "HIGH HEAT" : temp > 30 ? "WARM" : "NORMAL"
  const getRainLabel = (rain) => rain === 0 ? "LOW RAIN" : rain < 5 ? "LIGHT RAIN" : "HEAVY RAIN"
  const getSentimentLabel = (s) => s > 0.1 ? "POSITIVE" : s < -0.1 ? "NEGATIVE" : "NEUTRAL"
  const getSentimentColor = (s) => s > 0.1 ? "text-green-600 bg-green-50" : s < -0.1 ? "text-red-600 bg-red-50" : "text-gray-600 bg-gray-50"
  const getArticleBadge = (title) => {
    const positive = ["record", "increase", "stable", "good", "optimal", "boost"].some(w => title.toLowerCase().includes(w))
    const negative = ["fall", "drop", "crisis", "flood", "drought", "loss", "disruption", "alert"].some(w => title.toLowerCase().includes(w))
    if (positive) return { label: "POSITIVE", color: "bg-green-100 text-green-700" }
    if (negative) return { label: "ALERT", color: "bg-red-100 text-red-600" }
    return { label: "NEUTRAL", color: "bg-gray-100 text-gray-600" }
  }

  if (loading) return (
    <div className={`flex items-center justify-center min-h-screen ${darkMode ? "bg-gray-950" : "bg-[#f0f4f0]"}`}>
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className={`mt-4 font-medium ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Fetching live data...</p>
      </div>
    </div>
  )

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-950" : "bg-[#f0f4f0]"}`}>

      {/* Header */}
      <div className={`border-b px-8 py-4 flex items-center justify-between ${darkMode ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"}`}>
        <div className="flex items-center gap-4">
          <h2 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Today's Intelligence</h2>
          <div className={`flex gap-3 text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <span className="text-green-600 font-medium">{city}</span>
            <span>Karachi</span>
            <span>Islamabad</span>
            <span className="mx-2">|</span>
            <span className="text-green-600 font-medium">{crop}</span>
            <span>Rice</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={fetchData} className={`${darkMode ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}>🔄</button>
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center text-white text-xs">A</div>
          <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Administrator</span>
        </div>
      </div>

      <div className="px-8 py-6">

        {/* Metric Cards */}
        <div className="grid grid-cols-5 gap-4 mb-6">
          {[
            { label: "Temperature", value: `${weather?.temp}°C`, badge: getTempLabel(weather?.temp), badgeColor: "bg-red-100 text-red-600", icon: "🌡️" },
            { label: "Precipitation", value: `${weather?.rain}mm`, badge: getRainLabel(weather?.rain), badgeColor: "bg-blue-100 text-blue-600", icon: "🌧️" },
            { label: "USD/PKR", value: `${economy?.usd_rate} PKR`, badge: "RISING", badgeColor: "bg-orange-100 text-orange-600", icon: "💵" },
            { label: "Market Sentiment", value: sentiment, badge: getSentimentLabel(sentiment), badgeColor: getSentimentColor(sentiment), icon: "📊" },
            { label: "Diesel (Ltr)", value: economy?.fuel_price, badge: "ABOVE AVG", badgeColor: "bg-gray-100 text-gray-600", icon: "⛽" },
          ].map((item, i) => (
            <div key={i} className={`rounded-2xl p-4 shadow-sm ${darkMode ? "bg-gray-900" : "bg-white"}`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400 text-lg">{item.icon}</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.badgeColor}`}>{item.badge}</span>
              </div>
              <p className={`text-xs mb-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{item.label}</p>
              <p className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>{item.value}</p>
            </div>
          ))}
        </div>

        {/* Risk Profile Cards */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { title: "Weather Risk Profile", level: weather?.temp > 40 ? "High" : weather?.temp > 33 ? "Moderate" : "Low", desc: "Heat stress alert active for central Punjab region.", color: weather?.temp > 40 ? "text-red-500" : "text-yellow-500" },
            { title: "Economic Risk Index", level: economy?.usd_rate > 290 ? "High" : "Moderate", desc: "Currency volatility affecting fertilizer import costs.", color: economy?.usd_rate > 290 ? "text-red-500" : "text-yellow-500" },
            { title: "Market Sentiment", level: sentiment > 0.1 ? "Bullish" : sentiment < -0.1 ? "Bearish" : "Neutral", desc: "Strong export demand for Basmati varieties in EU.", color: sentiment > 0.1 ? "text-green-500" : sentiment < -0.1 ? "text-red-500" : "text-gray-500" },
          ].map((card, i) => (
            <div key={i} className={`rounded-2xl p-5 shadow-sm ${darkMode ? "bg-gray-900" : "bg-white"}`}>
              <p className={`font-semibold text-sm mb-4 ${darkMode ? "text-gray-200" : "text-gray-700"}`}>{card.title}</p>
              <div className="flex justify-center mb-3">
                <div className="relative w-32 h-16 overflow-hidden">
                  <svg viewBox="0 0 100 50" className="w-32 h-16">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={darkMode ? "#374151" : "#e5e7eb"} strokeWidth="8" strokeLinecap="round"/>
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke={card.color.includes("red") ? "#ef4444" : card.color.includes("yellow") ? "#eab308" : card.color.includes("green") ? "#22c55e" : "#9ca3af"} strokeWidth="8" strokeLinecap="round" strokeDasharray="70 126"/>
                    <circle cx="50" cy="50" r="3" fill={darkMode ? "#9ca3af" : "#374151"}/>
                  </svg>
                </div>
              </div>
              <p className={`text-center font-bold text-lg ${card.color}`}>{card.level}</p>
              <p className={`text-xs text-center mt-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{card.desc}</p>
            </div>
          ))}
        </div>

        {/* News Feed */}
        <div className={`rounded-2xl p-5 shadow-sm mb-6 ${darkMode ? "bg-gray-900" : "bg-white"}`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-bold ${darkMode ? "text-white" : "text-gray-800"}`}>Agriculture Intelligence Feed</h3>
            <button onClick={() => setShowAllReports(true)} className="text-sm text-green-600 font-medium hover:underline">
              View All Reports →
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {news.slice(0, 2).map((article, i) => (
              <div key={i} className={`border rounded-xl p-4 flex gap-3 ${darkMode ? "border-gray-700" : "border-gray-100"}`}>
                <div className="w-20 h-16 bg-green-100 rounded-lg flex-shrink-0 overflow-hidden">
                  {article.image ? <img src={article.image} alt="" className="w-full h-full object-cover" /> : <div className="w-full h-full bg-green-200"></div>}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded ${getArticleBadge(article.title).color}`}>
                      {getArticleBadge(article.title).label}
                    </span>
                    <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Source: {article.source}</span>
                  </div>
                  <p className={`text-sm font-semibold leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}>{article.title}</p>
                  <p className={`text-xs mt-1 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{article.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Get Verdict Button */}
        <button onClick={handleGetVerdict}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors">
          🧠 Get AI Verdict
        </button>
      </div>

      {/* Footer */}
      <div className={`px-8 py-4 border-t flex justify-between text-xs ${darkMode ? "border-gray-800 text-gray-600" : "border-gray-100 text-gray-400"}`}>
        <span>© 2024 Khet AI Intelligence. System Status: Optimal</span>
        <div className="flex gap-4">
          <span>Terms</span><span>Privacy</span><span>Support</span>
        </div>
      </div>

      {/* All Reports Modal */}
      {showAllReports && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`rounded-2xl p-6 w-[700px] max-h-[80vh] overflow-y-auto shadow-xl ${darkMode ? "bg-gray-900 border border-gray-700" : "bg-white"}`}>
            <div className="flex items-center justify-between mb-5">
              <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-800"}`}>📰 All Agriculture Reports</h3>
              <button onClick={() => setShowAllReports(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <div className="space-y-3">
              {news.map((article, i) => {
                const badge = getArticleBadge(article.title)
                return (
                  <div key={i} className={`border rounded-xl p-4 flex gap-4 transition-colors ${darkMode ? "border-gray-700 hover:bg-gray-800" : "border-gray-100 hover:bg-gray-50"}`}>
                    <div className="w-20 h-16 bg-green-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {article.image
                        ? <img src={article.image} alt="" className="w-full h-full object-cover" />
                        : <div className="w-full h-full bg-green-200 flex items-center justify-center text-2xl">🌾</div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${badge.color}`}>{badge.label}</span>
                        <span className={`text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>Source: {article.source}</span>
                      </div>
                      <p className={`text-sm font-semibold leading-tight ${darkMode ? "text-white" : "text-gray-800"}`}>{article.title}</p>
                      <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{article.description}</p>
                      {article.url && (
                        <a href={article.url} target="_blank" rel="noreferrer"
                          className="text-xs text-green-600 hover:underline mt-1 inline-block">
                          Read full article →
                        </a>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
            <button onClick={() => setShowAllReports(false)}
              className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}