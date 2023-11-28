from openai import OpenAI
from highlight import update_highlight
from bson.objectid import ObjectId
from database import db

courses = db["Courses"]

def create_completion_with_file(client, file, user_prompt):
    # Create the completion request
    completion = client.chat.completions.create(
        model="gpt-4-32k",
        messages=[
            {"role": "system", "content": "You are an academic assistant, specialized in addressing questions specifically related to the current course. Your responses are tailored to the course content and syllabus, and you provide sources from the course material. You focus solely on assisting with course-related queries."},
            {"role": "user", "content": file},
            {"role": "user", "content": user_prompt}
        ]
    )
    return completion

def extract(s, l, r):
  result = []
  sentence = ""
  flag = False
  for c in s:
    if c == l:
      sentence = ""
      flag = True
    elif c == r:
      flag = False
      result.append(sentence)
    elif flag:
      sentence += c
  return result

def chatRespond(user_id, course_id, question):
  valid = True
  try:
    course = courses.find_one({"_id":ObjectId(course_id)})["name"]
  except:
    raise Exception(f"Invalid user_id: {user_id}")
  
  try:
    txt = courses.find_one({"_id":ObjectId(course_id)})["syllabus"]["txt"]
    pdf = courses.find_one({"_id":ObjectId(course_id)})["syllabus"]["pdf"]
  except:
    raise Exception(f"Invalid course_id: {course_id}")

  prompt = """
  Using the uploaded syllabus for [%s], answer [%s]. Answer the question and wrap in <>. 

  Afterward, in a new line, please quote directly, ensuring the quotes are formatted correctly without additional spaces, missed commas, or typographical errors.

  Each quote should be surrounded by curly braces and each new line in a quote is a new quote.
  For example:
  Food:
  apple
  banana
  Result: {Food:}{apple}{banana}

  Your response should follow this convention:
  <Answer>{quote1}{quote2}...{quoteN}

  This is an example response:
  <An apple is the tastiest fruit>{most people love apples}{apples are sweet}

  The whole response should be in one line""" % (course, question)

  try:
    completion = create_completion_with_file(OpenAI(), txt, prompt)
    answer_quotes = completion.choices[0].message.content
    answer = extract(answer_quotes, "<", ">")[0]
    quotes = extract(answer_quotes, "{", "}")
  except:
    valid = False

  update_highlight(user_id, pdf, quotes)

  return {"answer": answer, "valid": valid}
