from pymongo import MongoClient
from bson.objectid import ObjectId
import base64

client = MongoClient("mongodb+srv://apalabiyik:k1egQDy4x1GQHU0k@smartsyllabus.sxp4blm.mongodb.net/")
db = client["db"]
users = db["Users"]
courses = db["Courses"]

def course_substring_search(userId, query):
    try:
        regex_query = {"name": {"$regex": query, "$options": "i"}}
        results = courses.find(regex_query)

        user_courses = users.find_one({"_id": ObjectId(userId)})["courses"]
        filtered_results = []

        for course in results:
            if course not in user_courses:
                course['_id'] = str(course['_id'])
                filtered_results.append(course)

        return filtered_results
    except:
        return 400

def update_user(userId, key, value):
    try:
        users.update_one({
            "_id": ObjectId(userId)},
            {"$set": {key: value}
        })
        return 200
    except:
        return 400

def update_course(courseId, key, value):
    try:
        courses.update_one({
            "_id": ObjectId(courseId)},
            {"$set": {key: value}
        })
        return 200
    except:
        return 400

def new_user(name, email):
    try:
        users.insert_one({
            "_id": ObjectId(),
            "name": name,
            "email": email,
            "permission": "",
            "courses": []
        })
        return 200
    except:
        return 400

def delete_user_data(userId):
    try:
        users.delete_one({"_id": ObjectId(userId)})
        return 200
    except:
        return 400

def create_new_course(name, userId, pdf, txt):
    try:
        courses.insert_one({
            "_id": ObjectId(),
            "name": name,
            "instructor": {
                "name": users.find_one({"_id":ObjectId(userId)})["name"],
                "instructor_id": userId 
            },
            "syllabus": {
                "pdf": pdf,
                "txt": txt
            }
        })
        return 200
    except:
        return 400

def delete_course_data(courseId):
    try:
        courses.delete_one({"_id": ObjectId(courseId)})
        return 200
    except:
        return 400

def change_syllabi(courseId, pdf, txt):
    try:
        courses.update_one({
            "_id": ObjectId(courseId)},
            {"$set": {"syllabus": {"pdf": pdf, "txt": txt}}
        })
        return 200
    except:
        return 400

def add_new_course(userId, courseId):
    try:
        user = users.find_one({"_id": ObjectId(userId)})
        course = courses.find_one({"_id": ObjectId(courseId)})
    except:
        return 400

    user_courses = user["courses"]
    if courseId not in user_courses:
        user_courses.append(course)
        users.update_one({"_id": ObjectId(userId)}, {"$set": {"courses": user_courses}})
        return 200
    else:
        return 400
    
def remove_course_data(userId, courseId):
    try:
        user = users.find_one({"_id": ObjectId(userId)})
        course = courses.find_one({"_id": ObjectId(courseId)})
    except:
        return 400

    user_courses = user["courses"]
    if course in user_courses:
        user_courses.remove(course)
        users.update_one({"_id": ObjectId(userId)}, {"$set": {"courses": user_courses}})
        return 200
    else:
        return 400

def get_user_data(email):
    try:
        result = users.find_one({"email":email})
        result["_id"] = str(result["_id"])
        for course in result["courses"]:
            course["_id"] = str(course["_id"])
        return result
    except:
        return 404

def get_course_data(courseId):
    try:
        result = courses.find_one({"_id":ObjectId(courseId)})
        result["_id"] = courseId
        return result
    except:
        return 404
