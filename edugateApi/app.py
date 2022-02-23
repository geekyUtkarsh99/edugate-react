from flask import Flask, request, abort, jsonify, make_response
import database.mysqlcore as mysqlcore

app = Flask(__name__, static_folder='../build', static_url_path='/')
mysql = mysqlcore.dbHandler()


@app.route('/')
def init():  # put application's code here
    return app.send_static_file('index.html')


@app.route('/addbanner', methods=['POST', 'GET'])
def add_banner():
    """
    {
    banner:banner_base64Image
    }
    """
    args = request.json
    banner = args['banner']

    if banner is not None:
        response = mysql.store_banner(banner)
        if response:
            return make_response(jsonify({'message': 'banner added'})), 201
        else:
            return make_response(jsonify({'message': 'something went wrong'})), 503


@app.route('/getbanner', methods=['GET'])
def get_banner():
    try:
        response = mysql.get_banners()
        if response is not None:
            return make_response(jsonify({'status': 200, 'banners': response})), 200
        else:
            return make_response(jsonify({'status': 404, 'banners': []})), 404

    except Exception as e:
        abort(404, e)
