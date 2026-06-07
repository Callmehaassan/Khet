from fastapi import APIRouter
import sys
import os

sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from ml.knn_model import predict_risk
from utils.crop_advice import get_advice

router = APIRouter()

@router.get("/verdict")
def get_verdict(
    temp: float,
    rain: float,
    humidity: float,
    wind: float,
    usd_rate: float,
    fuel_price: float,
    news_sentiment: float,
    crop: str
):
    prediction, prob_dict = predict_risk(
        temp=temp,
        rain=rain,
        humidity=humidity,
        wind=wind,
        usd_rate=usd_rate,
        fuel_price=fuel_price,
        news_sentiment=news_sentiment
    )

    advice = get_advice(crop, prediction)

    return {
        "verdict": prediction,
        "confidence": {
            "SAFE": round(prob_dict.get("SAFE", 0) * 100),
            "CAUTION": round(prob_dict.get("CAUTION", 0) * 100),
            "HIGH RISK": round(prob_dict.get("HIGH RISK", 0) * 100)
        },
        "advice": advice,
        "inputs": {
            "temp": temp,
            "rain": rain,
            "humidity": humidity,
            "wind": wind,
            "usd_rate": usd_rate,
            "fuel_price": fuel_price,
            "news_sentiment": news_sentiment,
            "crop": crop
        }
    }