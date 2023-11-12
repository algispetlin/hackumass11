from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from chatbot import chatRespond
from database import base64, update_user, update_course, new_user, create_new_course, add_new_course, get_user_data, get_course_data, change_syllabi, delete_user_data, delete_course_data, remove_course_data
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

@app.route("/create-user", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data["name"]
    email = data["email"]

    new_user(name, email)

    return '', 200

@app.route("/create-course", methods=["POST"])
def create_course():
    data = request.get_json()
    userId = data["userId"]
    name = data["name"]

    with open(data["syllabus"], "rb") as pdf:
        syllabus = base64.b64encode(pdf.read()).decode('utf-8')
    txt = extract_text(data["syllabus"])

    create_new_course(name, userId, syllabus, txt)

    return '', 200

@app.route("/delete-user", methods=["POST"])
def delete_user():
    data = request.get_json()
    delete_user_data(data["userId"])

    return '', 200

@app.route("/delete-course", methods=["POST"])
def delete_course():
    data = request.get_json()
    delete_course_data(data["courseId"])

    return '', 200

@app.route("/set-permission", methods=["POST"])
def set_permission():
    data = request.get_json()
    userId = data["userId"]
    permission = data["permission"]
    update_user(userId, "permission", permission)

    return '', 200

@app.route("/add-course", methods=["POST"])
def add_course():
    data = request.get_json()
    userId = data["userId"]
    courseId = data["courseId"]

    result = add_new_course(userId, courseId)

    return "", result

@app.route("/remove-course", methods=["POST"])
def remove_course():
    data = request.get_json()
    userId = data["userId"]
    courseId = data["courseId"]

    remove_course_data(userId, courseId)

    return '', 200

@app.route("/change-syllabus", methods=["POST"])
def change_syllabus():
    data = request.get_json()
    courseId = data["courseId"]
    with open(data["syllabus"], "rb") as pdf:
        syllabus = base64.b64encode(pdf.read()).decode('utf-8')
    txt = extract_text(data["syllabus"])

    change_syllabi(courseId, syllabus, txt)

    return '', 200
    
@app.route("/change-course-name", methods=["POST"])
def change_course_name():
    data = request.get_json()
    courseId = data["courseId"]
    name = data["name"]
    update_course(courseId, "name", name)

    return "", 200

@app.route("/get-user", methods=["POST"])
def get_user():
    data = request.get_json()
    userId = data["userId"]

    return jsonify(get_user_data(userId)), 200

@app.route("/get-course", methods=["POST"])
def get_course():
    data = request.get_json()
    courseId = data["courseId"]

    return jsonify(get_course_data(courseId)), 200


if __name__ == "__main__":
    app.run()