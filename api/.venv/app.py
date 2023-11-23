from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from chatbot import chatRespond
from database import base64, update_user, update_course, new_user, create_new_course, add_new_course, get_user_data, get_course_data, change_syllabi, delete_user_data, delete_course_data, remove_course_data, course_substring_search
import pdfminer
from pdfminer.high_level import extract_text

app = Flask(__name__)
CORS(app)

@app.route("/")
def status():
    return jsonify({ 'status': 'running' }), 200

@app.route("/ask-question", methods=["POST"])
def ask_question():
    data = request.get_json()
    userId = data['userId']
    courseId = data['courseId']
    question = data['question']

    chat_data = chatRespond(userId, courseId, question)

    return jsonify(chat_data), 200

if __name__ == "__main__":
    app.run()