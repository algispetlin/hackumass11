from flask import Flask, jsonify

app = Flask(__name__)

@app.route("/")
def status():
    return jsonify({ 'status': 'running' }), 200

if __name__ == "__main__":
    app.run()