import pandas as pd
import numpy as np
from sklearn.neighbors import KNeighborsClassifier
from sklearn.preprocessing import StandardScaler
import os

def train_model():
    path = os.path.join(os.path.dirname(__file__), "training_data.csv")
    df = pd.read_csv(path)
    
    features = ["temp", "rain", "humidity", "wind", "usd_rate", "fuel_price", "news_sentiment"]
    X = df[features]
    y = df["risk"]
    
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)
    
    model = KNeighborsClassifier(n_neighbors=5)
    model.fit(X_scaled, y)
    
    return model, scaler, features

def predict_risk(temp, rain, humidity, wind, usd_rate, fuel_price, news_sentiment):
    model, scaler, features = train_model()
    
    input_data = np.array([[temp, rain, humidity, wind, usd_rate, fuel_price, news_sentiment]])
    input_scaled = scaler.transform(input_data)
    
    prediction = model.predict(input_scaled)[0]
    probabilities = model.predict_proba(input_scaled)[0]
    classes = model.classes_
    
    prob_dict = dict(zip(classes, probabilities))
    
    return prediction, prob_dict