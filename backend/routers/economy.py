from fastapi import APIRouter
import requests
import os
from dotenv import load_dotenv

load_dotenv()

router = APIRouter()

API_KEY = os.getenv("EXCHANGE_API_KEY")

@router.get("/economy")
def get_economy():
    usd_rate = get_usd_rate()
    fuel_price = get_fuel_price()

    return {
        "usd_rate": usd_rate,
        "fuel_price": fuel_price
    }

def get_usd_rate():
    try:
        url = f"https://v6.exchangerate-api.com/v6/{API_KEY}/latest/USD"
        response = requests.get(url, timeout=10)
        data = response.json()
        return round(data["conversion_rates"]["PKR"], 2)
    except:
        return 278.50

def get_fuel_price():
    try:
        url = "https://www.ogra.org.pk/natural-gas-prices"
        headers = {"User-Agent": "Mozilla/5.0"}
        response = requests.get(url, headers=headers, timeout=10)
        from bs4 import BeautifulSoup
        soup = BeautifulSoup(response.text, "html.parser")
        tables = soup.find_all("table")
        if tables:
            rows = tables[0].find_all("tr")
            for row in rows:
                cols = row.find_all("td")
                if len(cols) >= 2:
                    price_text = cols[-1].get_text(strip=True)
                    price_text = price_text.replace(",", "").replace("Rs", "").strip()
                    if price_text.replace(".", "").isdigit():
                        return round(float(price_text), 2)
    except:
        pass
    return 312.00