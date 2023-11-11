from openai import OpenAI
from highlight import highlight_text_in_pdf

def create_completion_with_file(client, txt_file_path, user_prompt):
    with open(txt_file_path, 'r', encoding='utf-8') as file:
      file_content = file.read()

    # Create the completion request
    completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are an academic assistant, specialized in addressing questions specifically related to the current course. Your responses are tailored to the course content and syllabus, and you provide sources from the course material. You focus solely on assisting with course-related queries."},
            {"role": "user", "content": file_content},
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

def chatRespond(course, question, txt="in/220.txt", pdf="in/220.pdf"):
  prompt = """
  Using the uploaded syllabus for [%s], answer [%s]. Answer the question directly and succinctly and wrap in <>. 

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

  completion = create_completion_with_file(OpenAI(), txt, prompt)
  answer_quotes = completion.choices[0].message.content
  answer = extract(answer_quotes, "<", ">")[0]
  quotes = extract(answer_quotes, "{", "}")

  return {"answer": answer, "highlighted": highlight_text_in_pdf(pdf, quotes)}
