from fastapi import APIRouter
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

API_KEY = os.getenv("NEWS_API_KEY")

@router.get("/news")
def get_news():
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
            source = article.get("source", {}).get("name", "Unknown")
            url_link = article.get("url", "")
            image = article.get("urlToImage", "")
            description = article.get("description", "")
            if title and title != "[Removed]":
                headlines.append({
                    "title": title,
                    "source": source,
                    "url": url_link,
                    "image": image,
                    "description": description
                })

        return {"articles": headlines[:10]}

    except:
        return {
            "articles": [
                {"title": "Pakistan wheat production stable this season", "source": "Dawn", "url": "", "image": "", "description": ""},
                {"title": "Farmers in Punjab report normal crop conditions", "source": "Tribune", "url": "", "image": "", "description": ""},
                {"title": "Agriculture ministry releases seasonal advisory", "source": "ARY", "url": "", "image": "", "description": ""}
            ]
        }