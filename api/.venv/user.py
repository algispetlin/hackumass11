from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from database import base64, update_user, update_course, new_user, create_new_course, add_new_course, get_user_data, get_course_data, change_syllabi, delete_user_data, delete_course_data, remove_course_data, course_substring_search
import pdfminer
from pdfminer.high_level import extract_text

@app.route("/create-user", methods=["POST"])
def create_user():
    data = request.get_json()
    name = data["name"]
    email = data["email"]

    result = new_user(name, email)

    return ("", result) if (result == 400 or result == 404) else jsonify(result)

@app.route("/delete-user", methods=["POST"])
def delete_user():
    data = request.get_json()

    result = delete_user_data(data["userId"])

    return '', result

@app.route("/set-permission", methods=["POST"])
def set_permission():
    data = request.get_json()
    userId = data["userId"]
    permission = data["permission"]
    
    result = update_user(userId, "permission", permission)

    return '', result

@app.route("/get-user", methods=["POST"])
def get_user():
    data = request.get_json()
    email = data["email"]

    result = get_user_data(email)
    return result if result == 404 else jsonify(result), 200