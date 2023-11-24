from flask import Flask, request
from users import new_user, get_user_data, set_user, add_new_course, remove_course_data, delete_user_data, course_substring_search
from flask import Blueprint

user_api = Blueprint("user_api", __name__)

@user_api.route("/user/create", methods=["POST"])
def create():
    data = request.get_json()

    return new_user(data["user_id"], data["name"], data["email"])

@user_api.route("/user/<user_id>", methods=["GET"])
def get(user_id):

    return get_user_data(user_id)

@user_api.route("/user/set", methods=["PATCH"])
def set():
    data = request.get_json()

    return set_user(data["user_id"], data["key"], data["value"])

@user_api.route("/user/courses/add", methods=["PATCH"])
def add_course():
    data = request.get_json()

    return add_new_course(data["user_id"], data["course_id"])

@user_api.route("/user/courses/remove", methods=["PATCH"])
def remove_course():
    data = request.get_json()

    return remove_course_data(data["user_id"], data["course_id"])

@user_api.route("/user/courses/search", methods=["POST"])
def course_search():
    data = request.get_json()

    return course_substring_search(data["user_id"], data["query"])

@user_api.route("/user/delete/<user_id>", methods=["DELETE"])
def delete(user_id):

    return delete_user_data(user_id)
