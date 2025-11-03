import pickle
import json
import yaml
from flask import Flask, request

app = Flask(__name__)

# VULNERABLE: Pickle deserialization of user input
@app.route('/load-pickle', methods=['POST'])
def load_pickle():
    data = request.data
    # CRITICAL: Never unpickle untrusted data - can execute arbitrary code
    obj = pickle.loads(data)
    return {'status': 'loaded', 'data': str(obj)}

# VULNERABLE: YAML deserialization without safe loader
@app.route('/load-yaml', methods=['POST'])
def load_yaml():
    data = request.data.decode('utf-8')
    # VULNERABLE: yaml.load without Loader can execute arbitrary code
    obj = yaml.load(data)
    return {'status': 'loaded', 'data': obj}

# LESS VULNERABLE: JSON is generally safe, but still validate structure
@app.route('/load-json', methods=['POST'])
def load_json():
    data = request.data.decode('utf-8')
    # JSON is safer, but still validate the structure
    obj = json.loads(data)
    return {'status': 'loaded', 'data': obj}

if __name__ == '__main__':
    app.run(debug=True)

