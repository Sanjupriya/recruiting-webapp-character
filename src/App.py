from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data= None


@app.route('/api/character', methods=['POST'])
def save_char_data():
    data = request.get_json() 
    return jsonify({'message': 'Character saved successfully', 'data': data}), 200

@app.route('/api/character', methods=['GET'])
def get_char_data():
    if data is not None:
        return jsonify(data), 200  
    else:
        return jsonify({"error": "No character data found"}), 404 

if __name__ == '__main__':
    app.run(port=5003,debug=True)
