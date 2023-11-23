@app.route("/create-course", methods=["POST"])
def create_course():
    data = request.get_json()
    userId = data["userId"]
    name = data["name"]

    with open(data["syllabus"], "rb") as pdf:
        syllabus = base64.b64encode(pdf.read()).decode('utf-8')
    txt = extract_text(data["syllabus"])

    result = create_new_course(name, userId, syllabus, txt)

    return '', result

@app.route("/delete-course", methods=["POST"])
def delete_course():
    data = request.get_json()

    result = delete_course_data(data["courseId"])

    return '', result

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

    result = remove_course_data(userId, courseId)

    return '', result

@app.route("/change-syllabus", methods=["POST"])
def change_syllabus():
    data = request.get_json()
    courseId = data["courseId"]
    with open(data["syllabus"], "rb") as pdf:
        syllabus = base64.b64encode(pdf.read()).decode('utf-8')
    txt = extract_text(data["syllabus"])

    result = change_syllabi(courseId, syllabus, txt)

    return '', result
    
@app.route("/change-course-name", methods=["POST"])
def change_course_name():
    data = request.get_json()
    courseId = data["courseId"]
    name = data["name"]

    result = update_course(courseId, "name", name)

    return "", result

@app.route("/get-course", methods=["POST"])
def get_course():
    data = request.get_json()
    courseId = data["courseId"]

    return jsonify(get_course_data(courseId)), 200

@app.route("/course-search", methods=["POST"])
def course_search():
    data = request.get_json()
    userId = data["userId"]
    query = data["query"]

    result = course_substring_search(userId, query)
    return result if result == 400 else jsonify(course_substring_search(userId, query))