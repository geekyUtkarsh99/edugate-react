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
    # args = request.files
    banner = request.files['banner'].stream.read()

    if banner is not None:
        response = mysql.store_banner(banner)
        if response:
            return make_response(jsonify({'message': 'banner added'})), 201
        else:
            return make_response(jsonify({'message': 'something went wrong'})), 500


@app.route('/getbanner', methods=['GET'])
def get_banner():
    response = mysql.get_banners()
    if response is not None:
        return make_response(jsonify({'status': 200, 'banners': response})), 200
    else:
        return make_response(jsonify({'status': 404, 'banners': []})), 404


@app.route('/addquestions', methods=['POST', 'GET'])
def addQues():
    args = request.form
    response = mysql.add_Questions(args.get('file'), args.get('filename'), args.get('year'), args.get('course'),
                                   args.get('sem')
                                   , args.get('lang'))
    if response:
        return make_response(jsonify({'message': 'questions added'})), 201
    else:
        return make_response(jsonify({'message': 'failed to  add'})), 500


@app.route('/getquestions', methods=['GET'])
def getQues():
    args = request.args
    response = mysql.get_questions(args['year'], args['language'], args['course'], args['sem'])
    if response is not None:
        return make_response(jsonify({'status': 200, 'questions': response})), 200
    else:
        return make_response(jsonify({'status': 404, 'questions': []})), 404


@app.route('/testdatabase', methods=['GET'])
def testDB():
    if mysql.test():
        return {'message': 'data inserted'}
    else:
        return {'message': 'data not inserted'}
