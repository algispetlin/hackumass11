from flask import Flask, request, jsonify, Response
from flask_cors import CORS
from database import base64
from courses import set_course, new_course, get_course_data, delete_course_data
import pdfminer
from pdfminer.high_level import extract_text
from flask import Blueprint

course_api = Blueprint("course_api", __name__)

@course_api.route("/course/create", methods=["POST"])
def create():
    data = request.get_json()

    return new_course(data["name"], data["user_id"], data["syllabus"])

@course_api.route("/course/<course_id>", methods=["GET"])
def get_course(course_id):

    return get_course_data(course_id)

@course_api.route("/course/set", methods=["PATCH"])
def set():
    data = request.get_json()

    return set_course(data["course_id"], data["key"], data["value"])

@course_api.route("/course/delete/<course_id>", methods=["DELETE"])
def delete(course_id):

    return delete_course_data(course_id)
