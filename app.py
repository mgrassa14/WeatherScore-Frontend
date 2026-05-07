from flask import Flask, render_template, request, jsonify
import requests
from flask_cors import CORS

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

@app.route("/submit-location", methods=["POST"])
def submit_location():
    payload = request.get_json()

    print("POST /submit-location hit")
    print("Payload:", request.get_json())

    r = requests.post(CLOUD_FUNCTION_URL, json=payload)

    if r.status_code != 200:
        return jsonify({"error": "Cloud Function failed"}), 500

    result = r.json()
    return jsonify({"location_id": result["location_id"]})

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)

