import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("OPENWEATHER_API_KEY")

CITY_MAP = {
    "Lahore": "Lahore,PK",
    "Karachi": "Karachi,PK",
    "Islamabad": "Islamabad,PK",
    "Multan": "Multan,PK",
    "Faisalabad": "Faisalabad,PK",
    "Peshawar": "Peshawar,PK",
    "Quetta": "Quetta,PK",
    "Hyderabad": "Hyderabad,PK"
}

def get_weather(city):
    city_query = CITY_MAP.get(city, city)
    url = f"http://api.openweathermap.org/data/2.5/weather?q={city_query}&appid={API_KEY}&units=metric"
    
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        
        return {
            "temp": round(data["main"]["temp"]),
            "humidity": data["main"]["humidity"],
            "wind": round(data["wind"]["speed"] * 3.6),
            "rain": data.get("rain", {}).get("1h", 0),
            "description": data["weather"][0]["description"].title()
        }
    except Exception as e:
        return {
            "temp": 35,
            "humidity": 45,
            "wind": 15,
            "rain": 0,
            "description": "Data Unavailable"
        }

def get_forecast(city):
    city_query = CITY_MAP.get(city, city)
    url = f"http://api.openweathermap.org/data/2.5/forecast?q={city_query}&appid={API_KEY}&units=metric&cnt=24"
    
    try:
        response = requests.get(url, timeout=10)
        data = response.json()
        
        forecast = []
        seen_dates = []
        
        for item in data["list"]:
            date = item["dt_txt"].split(" ")[0]
            if date not in seen_dates:
                seen_dates.append(date)
                forecast.append({
                    "date": date,
                    "temp": round(item["main"]["temp"]),
                    "humidity": item["main"]["humidity"],
                    "rain": item.get("rain", {}).get("3h", 0),
                    "description": item["weather"][0]["description"].title()
                })
            if len(forecast) == 3:
                break
        
        return forecast
    except Exception as e:
        return [
            {"date": "Day 1", "temp": 35, "humidity": 45, "rain": 0, "description": "Data Unavailable"},
            {"date": "Day 2", "temp": 36, "humidity": 43, "rain": 0, "description": "Data Unavailable"},
            {"date": "Day 3", "temp": 37, "humidity": 41, "rain": 0, "description": "Data Unavailable"}
        ]