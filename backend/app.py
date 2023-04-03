# backend/app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/query', methods=['POST'])
def query():
    data = request.get_json()

    # Call the OpenAI API here
    response = {
        'result': f"OpenAI API response for '{data['text']}'"
    }

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
