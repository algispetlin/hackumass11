from pymongo import MongoClient

client = MongoClient("mongodb+srv://apalabiyik:k1egQDy4x1GQHU0k@smartsyllabus.sxp4blm.mongodb.net/")
db = client["db"]
courses = db["Courses"]
print(courses.find_one())