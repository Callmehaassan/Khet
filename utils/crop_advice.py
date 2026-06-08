ADVICE = {
    "wheat": {
        "SAFE": [
            "Ideal conditions for wheat cultivation. Proceed with sowing.",
            "Soil moisture levels are favorable. Irrigation can be reduced.",
            "Market prices are stable. Good time to plan harvest sales."
        ],
        "CAUTION": [
            "Monitor temperature closely. Avoid sowing in peak afternoon heat.",
            "Currency fluctuation may affect fertilizer import costs.",
            "Keep an eye on wind speeds. Secure young crops if needed."
        ],
        "HIGH RISK": [
            "Extreme heat detected. Delay sowing and increase irrigation.",
            "Economic conditions unfavorable. Hold off on large investments.",
            "Consider crop insurance given current risk levels."
        ]
    },
    "rice": {
        "SAFE": [
            "Good rainfall and humidity levels. Excellent conditions for rice.",
            "Water availability is sufficient for paddy cultivation.",
            "Market sentiment is positive. Plan your harvest accordingly."
        ],
        "CAUTION": [
            "Monitor rainfall patterns. Waterlogging risk if rain increases.",
            "Humidity levels may encourage fungal growth. Apply preventive measures.",
            "Fuel price rise may increase pumping costs. Optimize irrigation."
        ],
        "HIGH RISK": [
            "Drought conditions detected. Heavy irrigation required immediately.",
            "High temperatures may cause grain sterility. Take protective action.",
            "Consult local agriculture department for emergency advisories."
        ]
    },
    "sugarcane": {
        "SAFE": [
            "Warm temperatures are favorable for sugarcane growth.",
            "Good conditions for ratoon crop development.",
            "Stable economic conditions support sugarcane investment."
        ],
        "CAUTION": [
            "Wind speeds may damage tall cane. Consider propping or earthing up.",
            "Monitor soil moisture. Sugarcane needs consistent water supply.",
            "Rising fuel costs may impact harvesting and transport expenses."
        ],
        "HIGH RISK": [
            "Extreme heat may cause water stress. Increase irrigation frequency.",
            "Economic instability detected. Delay expansion plans.",
            "High risk period. Consult your local Kissan helpline immediately."
        ]
    },
    "cotton": {
        "SAFE": [
            "Conditions are favorable for cotton boll development.",
            "Low humidity reduces risk of fungal infections.",
            "Good time to apply growth regulators for yield improvement."
        ],
        "CAUTION": [
            "Watch for whitefly activity in warm, dry conditions.",
            "Currency fluctuation affects pesticide import costs.",
            "Moderate winds may affect spray application. Choose calm mornings."
        ],
        "HIGH RISK": [
            "Extreme heat may cause boll shedding. Provide shade netting if possible.",
            "High economic risk. Avoid taking new loans for crop expansion.",
            "Contact agriculture extension officer for urgent advisory."
        ]
    },
    "maize": {
        "SAFE": [
            "Good temperature range for maize germination and growth.",
            "Adequate conditions for pollination. Expect normal yields.",
            "Stable market prices. Good time to plan forward contracts."
        ],
        "CAUTION": [
            "Monitor for armyworm activity during warm humid periods.",
            "Inconsistent rainfall may affect grain filling stage.",
            "Fuel price increase may raise harvesting costs. Plan accordingly."
        ],
        "HIGH RISK": [
            "Heat stress during tasseling can severely reduce yield.",
            "Unfavorable economic conditions. Minimize input expenditure.",
            "Seek immediate guidance from local agriculture department."
        ]
    }
}

def get_advice(crop, risk):
    crop = crop.lower()
    risk = risk.upper()
    
    if crop in ADVICE and risk in ADVICE[crop]:
        return ADVICE[crop][risk]
    
    return [
        "Monitor conditions closely.",
        "Consult your local agriculture extension officer.",
        "Stay updated with weather forecasts."
    ]