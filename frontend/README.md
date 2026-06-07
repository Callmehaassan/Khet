# 🌾 Khet (کھیت) — AI-Powered Crop Risk Intelligence

> Smart farming decisions powered by Machine Learning, Live APIs, and Real-time Data

![Khet Banner](https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1200&h=300&fit=crop)

## 📌 Overview

Khet is a full-stack AI web application designed to help Pakistani farmers make smarter, data-driven farming decisions. It combines live weather data, economic indicators, news sentiment analysis, and a KNN machine learning model to assess crop risk in real time.

## ✨ Features

- 🌡️ **Live Weather Data** — Real-time temperature, humidity, rainfall, and wind via OpenWeatherMap
- 💰 **Economic Indicators** — Live USD/PKR exchange rate and fuel prices
- 📰 **News Sentiment Analysis** — VADER-powered sentiment scoring on latest agriculture headlines
- 🤖 **KNN Risk Model** — K-Nearest Neighbors classifier trained on historical crop data
- 📊 **3-Day Forecast** — Weather outlook with interactive Recharts visualization
- 🌙 **Dark Mode** — Full dark/light theme toggle
- 📱 **Responsive UI** — Built with React + Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Recharts
- Axios
- React Router DOM

### Backend
- FastAPI (Python)
- Scikit-learn (KNN Model)
- VADER Sentiment
- OpenWeatherMap API
- NewsAPI
- ExchangeRate-API
- BeautifulSoup4

## 📁 Project Structure

khet/
├── backend/
│   ├── main.py
│   ├── routers/
│   │   ├── weather.py
│   │   ├── news.py
│   │   ├── economy.py
│   │   └── verdict.py
│   ├── ml/
│   │   ├── knn_model.py
│   │   └── training_data.csv
│   └── utils/
│       ├── sentiment.py
│       └── crop_advice.py
└── frontend/
└── src/
├── pages/
│   ├── Home.jsx
│   ├── Conditions.jsx
│   ├── Verdict.jsx
│   └── Outlook.jsx
└── components/
├── Sidebar.jsx
└── SplashScreen.jsx

## 🚀 Getting Started

### Prerequisites
- Python 3.12+
- Node.js v24+
- API Keys (OpenWeatherMap, NewsAPI, ExchangeRate-API)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Environment Variables
Create a `.env` file in the `backend/` folder:

OPENWEATHER_API_KEY=your_key_here
NEWS_API_KEY=your_key_here
EXCHANGE_API_KEY=your_key_here

## 🔗 Live Demo
Coming soon...

## 👨‍💻 Author
**Ali Hassan**
- GitHub: [@Callmehaassan](https://github.com/Callmehaassan)
- LinkedIn: [Ali Hassan](https://linkedin.com/in/ali-hassan-39b007248)

## 📄 License
MIT License — feel free to use and modify.

---
Built with ❤️ for Pakistani farmers