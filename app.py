from flask import Flask, render_template, request, jsonify
import requests
from flask_cors import CORS
import os

CLOUD_FUNCTION_URL = "https://calculate-accuracy-700897000697.us-central1.run.app"

app = Flask(__name__)
CORS(app)  

@app.route('/')
def home():
    # render_template looks in the /templates folder by default
    return render_template('location.html')

@app.route('/results')
def result():
    # render_template looks in the /templates folder by default
    return render_template('results.html')

@app.route("/api/results")
def api_results():
    location_id = request.args.get("location_id")

    if not location_id:
        return {"error": "Missing location_id"}, 400

    with engine.connect() as conn:
        rows = conn.execute("""
            SELECT provider, accuracy, ranking
            FROM accuracy_results
            WHERE location_id = %s AND horizon = 1
            ORDER BY ranking ASC
        """, (location_id,)).fetchall()

    results = [
        {
            "provider": r.provider,
            "accuracy": float(r.accuracy),
            "ranking": r.ranking
        }
        for r in rows
    ]

    return {"results": results}

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)


