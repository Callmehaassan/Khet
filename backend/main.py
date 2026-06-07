from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import weather, news, economy, verdict

app = FastAPI(title="Khet API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(weather.router, prefix="/api")
app.include_router(news.router, prefix="/api")
app.include_router(economy.router, prefix="/api")
app.include_router(verdict.router, prefix="/api")

@app.get("/")
def root():
    return {"status": "Khet API is running"}