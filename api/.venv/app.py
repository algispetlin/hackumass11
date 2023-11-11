from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from chatbot import chatRespond

app = Flask(__name__)
CORS(app)

@app.route("/")
def status():
    return jsonify({ 'status': 'running' }), 200

@app.route("/ask-question", methods=["POST"])
def ask_question():
    data = request.get_json()
    id = data['courseId']
    question = data['question']

    chat_data = chatRespond(id, question)

    return jsonify(chat_data), 200


if __name__ == "__main__":
    app.run()