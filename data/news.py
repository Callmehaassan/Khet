import requests
import os
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("NEWS_API_KEY")

def get_agriculture_news():
    url = "https://newsapi.org/v2/everything"
    
    params = {
        "q": "Pakistan agriculture farming crops wheat rice",
        "language": "en",
        "sortBy": "publishedAt",
        "pageSize": 10,
        "apiKey": API_KEY
    }
    
    try:
        response = requests.get(url, params=params, timeout=10)
        data = response.json()
        
        headlines = []
        for article in data.get("articles", []):
            title = article.get("title", "")
            if title and title != "[Removed]":
                headlines.append(title)
        
        return headlines[:10]
    
    except Exception as e:
        return [
            "Pakistan wheat production stable this season",
            "Farmers in Punjab report normal crop conditions",
            "Agriculture ministry releases seasonal advisory"
        ]