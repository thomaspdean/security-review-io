import pickle
import json
import yaml
from flask import Flask, request

app = Flask(__name__)


@app.route('/load-pickle', methods=['POST'])
def load_pickle():
    data = request.data
    obj = pickle.loads(data)
    return {'status': 'loaded', 'data': str(obj)}

@app.route('/load-yaml', methods=['POST'])
def load_yaml():
    data = request.data.decode('utf-8')
    obj = yaml.load(data)
    return {'status': 'loaded', 'data': obj}

@app.route('/load-json', methods=['POST'])
def load_json():
    data = request.data.decode('utf-8')
    obj = json.loads(data)
    return {'status': 'loaded', 'data': obj}

if __name__ == '__main__':
    app.run(debug=True)

