from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from chatbot import chatRespond
from database import base64
import pdfminer
from pdfminer.high_level import extract_text
from user import user_api
from course import course_api

app = Flask(__name__)
app.register_blueprint(user_api)
app.register_blueprint(course_api)
CORS(app)

@app.route("/")
def status():
    return jsonify({ 'status': 'running' }), 200

@app.route("/chat", methods=["POST"])
def ask_question():
    data = request.get_json()
    userId = data['userId']
    courseId = data['courseId']
    question = data['question']

    chat_data = chatRespond(userId, courseId, question)

    return jsonify(chat_data), 200

@app.route("/chat/debug", methods=["POST"])
def debug_chatgpt():
    data = request.get_json()
    user_id = data['user_id']
    course_id = data['course_id']
    question = data['question']

    chat_data = {"user_id": user_id, "course_id": course_id, "question": question}

    return jsonify(chat_data)

if __name__ == "__main__":
    app.run()