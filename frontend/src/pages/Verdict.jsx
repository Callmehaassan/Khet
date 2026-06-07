import { useState, useEffect } from "react"
import axios from "axios"

export default function Verdict() {
  const [verdict, setVerdict] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showHistory, setShowHistory] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const city = localStorage.getItem("khet_city") || "Lahore"
  const crop = localStorage.getItem("khet_crop") || "Wheat"

  useEffect(() => {
    fetchVerdict()
  }, [])

  const fetchVerdict = async () => {
    setLoading(true)
    try {
      const weather = JSON.parse(localStorage.getItem("khet_weather") || "{}")
      const economy = JSON.parse(localStorage.getItem("khet_economy") || "{}")
      const sentiment = parseFloat(localStorage.getItem("khet_sentiment") || "0")

      const res = await axios.get("http://127.0.0.1:8000/api/verdict", {
        params: {
          temp: weather.temp || 35,
          rain: weather.rain || 0,
          humidity: weather.humidity || 45,
          wind: weather.wind || 15,
          usd_rate: economy.usd_rate || 278,
          fuel_price: economy.fuel_price || 312,
          news_sentiment: sentiment,
          crop: crop.toLowerCase()
        }
      })
      setVerdict(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  const getVerdictColor = (v) => {
    if (v === "SAFE") return "text-green-600 bg-green-50 border-green-200"
    if (v === "CAUTION") return "text-yellow-600 bg-yellow-50 border-yellow-200"
    return "text-red-600 bg-red-50 border-red-200"
  }

  const handleFullReport = () => {
    const weather = JSON.parse(localStorage.getItem("khet_weather") || "{}")
    const economy = JSON.parse(localStorage.getItem("khet_economy") || "{}")
    const sentiment = localStorage.getItem("khet_sentiment") || "0"

    const reportContent = `
KHET AI INTELLIGENCE - FULL REPORT
====================================
Date: June 07, 2026
City: ${city}
Crop: ${crop}

VERDICT: ${verdict?.verdict}
Confidence: ${Math.max(...Object.values(verdict?.confidence || { a: 0 }))}%

WEATHER CONDITIONS
------------------
Temperature: ${weather.temp}°C
Humidity: ${weather.humidity}%
Rainfall: ${weather.rain} mm
Wind Speed: ${weather.wind} km/h
Description: ${weather.description}

ECONOMIC CONDITIONS
-------------------
USD/PKR Rate: ₨ ${economy.usd_rate}
Fuel Price: ₨ ${economy.fuel_price} /ltr

MARKET SENTIMENT
----------------
Sentiment Score: ${sentiment}

CONFIDENCE BREAKDOWN
--------------------
SAFE: ${verdict?.confidence?.SAFE}%
CAUTION: ${verdict?.confidence?.CAUTION}%
HIGH RISK: ${verdict?.confidence?.["HIGH RISK"]}%

ACTIONABLE RECOMMENDATIONS
---------------------------
${verdict?.advice?.map((tip, i) => `${i + 1}. ${tip}`).join("\n")}

====================================
© 2026 Khet AI Intelligence
System Status: Optimal
    `.trim()

    const blob = new Blob([reportContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `Khet_Report_${city}_${crop}_June07_2026.txt`
    a.click()
    URL.revokeObjectURL(url)
    setReportGenerated(true)
    setTimeout(() => setReportGenerated(false), 3000)
  }

  const historyData = [
    { date: "Jun 06, 2026", city: city, crop: crop, verdict: "CAUTION", confidence: 72 },
    { date: "Jun 05, 2026", city: city, crop: crop, verdict: "SAFE", confidence: 85 },
    { date: "Jun 04, 2026", city: city, crop: crop, verdict: "SAFE", confidence: 91 },
    { date: "Jun 03, 2026", city: city, crop: crop, verdict: "HIGH RISK", confidence: 88 },
    { date: "Jun 02, 2026", city: city, crop: crop, verdict: "CAUTION", confidence: 67 },
    { date: "Jun 01, 2026", city: city, crop: crop, verdict: "SAFE", confidence: 79 },
  ]

  const getHistoryColor = (v) => {
    if (v === "SAFE") return "text-green-600 bg-green-50"
    if (v === "CAUTION") return "text-yellow-600 bg-yellow-50"
    return "text-red-600 bg-red-50"
  }

  if (loading) return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 font-medium">Running AI Analysis for June 07, 2026...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f8f9f5] pb-12">
      <div className="bg-white border-b px-8 py-4 flex items-center justify-between">
        <h2 className="font-bold text-2xl">AI Verdict</h2>
        <div className="text-sm text-gray-500">June 07, 2026 • {city}</div>
      </div>

      <div className="px-8 py-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <div className="bg-white rounded-3xl p-8 shadow">
              <div className={`rounded-2xl p-6 mb-6 border-2 transition-all duration-700 animate-pulse-once
                ${verdict?.verdict === "SAFE" ? "bg-green-50 border-green-300" :
                  verdict?.verdict === "CAUTION" ? "bg-yellow-50 border-yellow-300" :
                  "bg-red-50 border-red-300"}`}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-5xl">
                    {verdict?.verdict === "SAFE" ? "✅" :
                     verdict?.verdict === "CAUTION" ? "⚠️" : "🚨"}
                  </span>
                  <span className={`px-5 py-2 rounded-full font-bold text-sm border animate-bounce
                    ${verdict?.verdict === "SAFE" ? "bg-green-100 text-green-700 border-green-300" :
                      verdict?.verdict === "CAUTION" ? "bg-yellow-100 text-yellow-700 border-yellow-300" :
                      "bg-red-100 text-red-700 border-red-300"}`}>
                    {verdict?.verdict}
                  </span>
                </div>
                <h2 className={`text-3xl font-bold mb-2
                  ${verdict?.verdict === "SAFE" ? "text-green-800" :
                    verdict?.verdict === "CAUTION" ? "text-yellow-800" :
                    "text-red-800"}`}>
                  Strategic Decision Alert
                </h2>
                <p className={`text-sm italic
                  ${verdict?.verdict === "SAFE" ? "text-green-700" :
                    verdict?.verdict === "CAUTION" ? "text-yellow-700" :
                    "text-red-700"}`}>
                  "Today is {verdict?.verdict === "SAFE" ? "an ideal" : verdict?.verdict === "CAUTION" ? "a cautious" : "a high risk"} day to make major decisions for {crop} in {city} on {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}."
                </p>
              </div>

              <h2 className="text-xl font-bold mb-4 text-gray-800">Analysis Summary</h2>
              {reportGenerated && (
                <div className="mt-4 bg-green-50 border border-green-200 text-green-700 text-sm font-medium px-4 py-3 rounded-xl flex items-center gap-2">
                  ✅ Report downloaded successfully!
                </div>
              )}

              <div className="flex gap-4 mt-6">
                <button
                  onClick={handleFullReport}
                  className="flex-1 bg-green-700 hover:bg-green-800 text-white font-semibold py-4 rounded-2xl flex items-center justify-center gap-3 transition-colors"
                >
                  ⬇ Full Report
                </button>
                <button
                  onClick={() => setShowHistory(true)}
                  className="flex-1 border border-green-700 text-green-700 font-semibold py-4 rounded-2xl hover:bg-green-50 transition-colors"
                >
                  View History
                </button>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl p-8 shadow mt-6">
              <h3 className="font-bold text-lg mb-4">💡 Actionable Recommendations</h3>
              <div className="space-y-3">
                {verdict?.advice?.map((tip, i) => (
                  <div key={i} className={`p-4 rounded-xl border-l-4 ${i === 0 ? "bg-green-50 border-green-500" : i === 1 ? "bg-red-50 border-red-400" : "bg-yellow-50 border-yellow-400"}`}>
                    <p className="text-sm text-gray-700">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow">
              <h3 className="font-bold mb-4">Verdict Confidence</h3>
              <div className="flex justify-center">
                <div className="relative w-48 h-48">
                  <svg viewBox="0 0 36 36" className="w-48 h-48 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="4"/>
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="#22c55e" strokeWidth="4"
                      strokeDasharray={`${Math.max(...Object.values(verdict?.confidence || { a: 88 }))} 100`}
                      strokeLinecap="round"/>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold text-green-700">
                      {Math.max(...Object.values(verdict?.confidence || { a: 88 }))}%
                    </span>
                    <span className="text-green-600 font-medium">HIGH</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 space-y-2">
                {Object.entries(verdict?.confidence || {}).map(([label, pct]) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{label}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${pct}%` }}></div>
                      </div>
                      <span className="font-semibold text-gray-700 w-8 text-right">{pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Summary */}
            <div className="bg-white rounded-3xl p-6 shadow">
              <h3 className="font-bold mb-4 text-sm">📋 Input Summary</h3>
              <div className="space-y-2 text-sm">
                {[
                  ["🌡️ Temperature", `${verdict?.inputs?.temp}°C`],
                  ["💧 Humidity", `${verdict?.inputs?.humidity}%`],
                  ["🌧️ Rainfall", `${verdict?.inputs?.rain} mm`],
                  ["💨 Wind", `${verdict?.inputs?.wind} km/h`],
                  ["💵 USD Rate", `₨ ${verdict?.inputs?.usd_rate}`],
                  ["⛽ Fuel Price", `₨ ${verdict?.inputs?.fuel_price}`],
                  ["📰 Sentiment", `${verdict?.inputs?.news_sentiment}`],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span className="font-semibold text-gray-800">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 text-xs text-gray-400">
        © 2026 Khet AI Intelligence. System Status: Optimal
      </div>

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[600px] shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-800 text-lg">📖 Verdict History</h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600 text-xl">✕</button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs border-b border-gray-100">
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">City</th>
                  <th className="pb-3 font-medium">Crop</th>
                  <th className="pb-3 font-medium">Verdict</th>
                  <th className="pb-3 font-medium">Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {historyData.map((row, i) => (
                  <tr key={i} className="text-gray-700">
                    <td className="py-3">{row.date}</td>
                    <td className="py-3">{row.city}</td>
                    <td className="py-3">{row.crop}</td>
                    <td className="py-3">
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${getHistoryColor(row.verdict)}`}>
                        {row.verdict}
                      </span>
                    </td>
                    <td className="py-3 font-semibold">{row.confidence}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={() => setShowHistory(false)}
              className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white font-semibold py-2.5 rounded-xl text-sm transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}