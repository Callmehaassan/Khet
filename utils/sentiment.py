from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

analyzer = SentimentIntensityAnalyzer()

def get_sentiment_score(headlines):
    if not headlines:
        return 0.0
    
    scores = []
    for headline in headlines:
        score = analyzer.polarity_scores(headline)["compound"]
        scores.append(score)
    
    average = sum(scores) / len(scores)
    return round(average, 3)