import { useEffect, useState } from "react"

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            setFadeOut(true)
            setTimeout(onFinish, 500)
          }, 300)
          return 100
        }
        return prev + 2
      })
    }, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className={`fixed inset-0 z-[9999] bg-[#f8f9f5] flex flex-col items-center justify-center transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
      <div className="flex flex-col items-center gap-6">
        <img src="/src/logo.png" alt="Khet" className="w-24 h-24 object-contain animate-pulse" />
        <div>
          <h1 className="text-4xl font-bold text-green-800 text-center">Khet</h1>
          <p className="text-gray-500 text-sm text-center mt-1">Precision Agriculture Intelligence</p>
        </div>
        <div className="w-64 h-1.5 bg-gray-200 rounded-full overflow-hidden mt-4">
          <div
            className="h-full bg-green-600 rounded-full transition-all duration-100"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-400">
          {progress < 30 ? "Loading weather data..." :
           progress < 60 ? "Initializing AI model..." :
           progress < 90 ? "Preparing dashboard..." :
           "Almost ready..."}
        </p>
      </div>
      <div className="absolute bottom-8 text-xs text-gray-400">
        © {new Date().getFullYear()} Khet AI Intelligence
      </div>
    </div>
  )
}