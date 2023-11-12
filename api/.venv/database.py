from pymongo import MongoClient
from bson.objectid import ObjectId
import base64

client = MongoClient("mongodb+srv://apalabiyik:k1egQDy4x1GQHU0k@smartsyllabus.sxp4blm.mongodb.net/")
db = client["db"]
users = db["Users"]
courses = db["Courses"]

def update_user(userId, key, value):
    users.update_one({
        "_id": ObjectId(userId)},
        {"$set": {key: value}
    })

def update_course(courseId, key, value):
    courses.update_one({
        "_id": ObjectId(courseId)},
        {"$set": {key: value}
    })

def new_user(name, email):
    users.insert_one({
        "_id": ObjectId(),
        "name": name,
        "email": email,
        "permission": "",
        "courses": []
    })

def delete_user_data(userId):
    users.delete_one({"_id": ObjectId(userId)})

def create_new_course(name, userId, pdf, txt):
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

def delete_course_data(courseId):
    courses.delete_one({"_id": ObjectId(courseId)})

def change_syllabi(courseId, pdf, txt):
    courses.update_one({
        "_id": ObjectId(courseId)},
        {"$set": {"syllabus": {"pdf": pdf, "txt": txt}}
    })

def add_new_course(userId, courseId):
    user = users.find_one({"_id": ObjectId(userId)})
    if not user:
        raise ValueError("User not found")
    
    course = courses.find_one({"_id": ObjectId(courseId)})
    if not course:
        raise ValueError("Course not found")

    user_courses = user["courses"]
    if courseId not in user_courses:
        user_courses.append(course)
        users.update_one({"_id": ObjectId(userId)}, {"$set": {"courses": user_courses}})
        return 200
    else:
        return 400
    
def remove_course_data(userId, courseId):
    user = users.find_one({"_id": ObjectId(userId)})
    if not user:
        raise ValueError("User not found")
    
    course = courses.find_one({"_id": ObjectId(courseId)})
    if not course:
        raise ValueError("Course not found")

    user_courses = user["courses"]
    if course in user_courses:
        user_courses.remove(course)
        users.update_one({"_id": ObjectId(userId)}, {"$set": {"courses": user_courses}})
        return 200
    else:
        return 400

def get_user_data(userId):
    result = users.find_one({"_id":ObjectId(userId)})
    result["_id"] = userId
    for course in result["courses"]:
        course["_id"] = str(course["_id"])
    return result

def get_course_data(courseId):
    result = courses.find_one({"_id":ObjectId(courseId)})
    result["_id"] = courseId
    return result
