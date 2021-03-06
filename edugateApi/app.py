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
    file = request.files['file'].stream.read()
    response = mysql.add_Questions(file, args.get('filename'), args.get('year'), args.get('course'),
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


@app.route('/addnotes', methods=['POST', 'GET'])
def add_notes():
    args = request.form
    file = request.files['file'].stream.read()

    response = mysql.add_notes(args['course'], args['sem'], args['filename'], file)
    if response:
        return make_response(jsonify({'message': 'added'})), 201
    else:
        return make_response(jsonify({'message': 'failed to add'})), 500


@app.route('/addnotesmbl', methods=['GET', 'POST'])
def add_notes_mbl():
    args = request.args
    filecontent = request.json['file']
    response = mysql.add_notes_mbl(args['course'], args['sem'], args['filename'], str(filecontent).encode())
    if response:
        return make_response(jsonify({'message': 'added'})), 201
    else:
        return make_response(jsonify({'message': 'failed to add'})), 500


@app.route('/getnotes', methods=['GET'])
def get_notes():
    args = request.args
    response = mysql.get_notes(args['course'], args['sem'])
    if response is not None:
        return make_response(jsonify({'status': 200, 'notes': response})), 200
    else:
        return make_response(jsonify({'status': 404, 'notes': []})), 400


@app.route('/addbranch', methods=['GET'])
def add_branch():
    args = request.args
    response = mysql.add_branches(str(args['branch']).upper(), args['sem'],args['year'])
    if response:
        return make_response(jsonify({'message': 'added'})), 201
    else:
        return make_response(jsonify({'message': 'failed to add'})), 500


@app.route('/getbranch', methods=['GET'])
def get_branch():
    response = mysql.get_branches()

    if response is not None:
        return make_response(jsonify({'status': 200, 'branch': response})), 200
    else:
        return make_response(jsonify({'status': 404, 'branch': []})), 404


@app.route('/adduser', methods=['GET'])
def add_user():
    args = request.args
    if mysql.check_userexist(args['user']):
        response = mysql.new_admin(args['user'], args['pwd'])
        if response:
            return make_response(jsonify({'message': 'added'})), 201
        else:
            return make_response(jsonify({'message': 'something went wrong'})), 500
    else:
        return make_response(jsonify({'message': 'user exists'})), 500


@app.route('/login', methods=['POST', 'GET'])
def login():
    args = request.args
    response = mysql.login(args['uname'], args['pwd'])
    if response[0]:
        return make_response(jsonify({'tkn': response[1], 'uid': response[2], 'status': 200})), 200
    else:
        return make_response(jsonify({'tkn': '', 'uid': '', 'status': 500})), 500


@app.route('/logout', methods=['GET'])
def log_out():
    args = request.args
    response = mysql.log_out(args['uid'])
    if response:
        return make_response(jsonify({'message': 'log out'})), 200
    else:
        return make_response(jsonify({'message': 'unable to logout'})), 500


@app.route('/testdatabase', methods=['GET'])
def testDB():
    if mysql.test():
        return {'message': 'data inserted'}
    else:
        return {'message': 'data not inserted'}
