from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    # render_template looks in the /templates folder by default
    return render_template('location.html')

@app.route('/results')
def result():
    # render_template looks in the /templates folder by default
    return render_template('results.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)

