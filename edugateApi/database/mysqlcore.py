import base64
from werkzeug.security import check_password_hash, generate_password_hash
import pymysql
import random
import string

# import flaskext.mysql as mysql
# import mysql.connector as connector
password = 'edugate@db'


class dbHandler:
    def __init__(self):
        self.connection = pymysql.connect(user="root", password=password, database="edugatedb", host="localhost")

    def connect(self):
        self.connection = pymysql.connect(user="root", password=password, database="edugatedb", host="localhost")

    @staticmethod
    def generate_banner_id():
        len = 8
        return "".join(random.choices(string.ascii_uppercase + string.digits, k=len))

    def store_banner(self, bannerblob):
        self.connect()  # init database
        with self.connection as conn:
            with conn.cursor() as curse:
                # check if table exists
                sql = """
                SHOW TABLES LIKE 'banners';
                """
                curse.execute(sql)
                response = list(curse.fetchall())
                # print("response :", response)
                # print("blob data :", bannerblob)
                id = self.generate_banner_id()  # unique id
                if not response:
                    # table not exists
                    sql = """
                    CREATE TABLE banners (banner_img LONGBLOB , banner_id varchar(10) );
                    """
                    curse.execute(sql)

                    sql = """
                    INSERT INTO banners (banner_img,banner_id)VALUES(%s,%s);
                    """
                    curse.execute(sql, (bannerblob, id))
                    print("query : ", curse.fetchall())
                    conn.commit()
                    return True
                else:
                    sql = """
                    INSERT INTO banners (banner_img,banner_id)VALUES(%s,%s);
                                       """
                    curse.execute(sql, (bannerblob, id))
                    print("query : ", curse.fetchall())
                    conn.commit()
                    return True

    def get_banners(self):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                               SELECT count(*) FROM banners;
                               """
                curse.execute(sql)
                response = list(curse.fetchall())
                if response is None:
                    return response
                else:
                    sql = """
                    SELECT * FROM banners;
                    """
                    curse.execute(sql)
                    response = curse.fetchall()
                    data = []
                    for i in response:
                        data.append({"banner": base64.b64encode(i[0]).decode(), "banner_id": i[1]})

                    return data

    def add_Questions(self, questionBuffer, filename, year, course, sem, lang):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                # check if table exists
                sql = """
                              SHOW TABLES LIKE 'questions';
                              """
                curse.execute(sql)
                response = list(curse.fetchall())
                # print("response :", response)
                # print("blob data :", questionBuffer)
                id = self.generate_banner_id()  # unique id
                if not response:

                    sql = """
                    CREATE TABLE questions (filename varchar(128) , file longblob , year varchar(5),course varchar(28),language varchar(28) , sem varchar(28));
                    """
                    curse.execute(sql)

                    sql = """
                    INSERT INTO questions VALUES(%s,%s,%s,%s,%s,%s);
                    """
                    args = (filename, questionBuffer, year, course, lang, sem)
                    curse.execute(sql, args)
                    conn.commit()
                    return True
                else:
                    sql = """
                                       INSERT INTO questions VALUES(%s,%s,%s,%s,%s,%s);
                                       """
                    args = (filename, questionBuffer, year, course, lang, sem)
                    curse.execute(sql, args)
                    conn.commit()
                    return True

    def get_questions(self, year, lang, course, sem):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                                              SELECT count(*) FROM questions;
                                              """
                curse.execute(sql)
                response = list(curse.fetchall())
                if response is None:
                    return response
                else:
                    sql = """
                    SELECT * FROM questions WHERE year = %s AND course = %s AND language = %s AND sem = %s;
                    """
                    args = (year, course, lang, sem)
                    curse.execute(sql, args)
                    response = curse.fetchall()
                    data = []
                    for i in list(response):
                        data.append({'fileName': i[0], 'file': base64.b64encode(i[1]).decode()})
                    return data

    def add_notes_mbl(self, course, sem, filename, file):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                # check if table exists
                sql = """
                                                     SHOW TABLES LIKE 'notes';
                                                     """
                curse.execute(sql)
                response = list(curse.fetchall())
                # print("response :", response)
                # print("blob data :", questionBuffer)
                id = self.generate_banner_id()  # unique id
                if not response:
                    sql = """
                           CREATE TABLE notes (course varchar(128) , semester varchar(12), filename varchar(128),
                           file LONGBLOB);
                           """

                    curse.execute(sql)

                    sql = """
                           INSERT INTO notes VALUES(%s,%s,%s,%s);
                           """
                    args = (course, sem, filename, base64.decodebytes(file))
                    curse.execute(sql, args)
                    conn.commit()
                    return True
                else:
                    sql = """
                                             INSERT INTO notes VALUES(%s,%s,%s,%s);
                                             """
                    args = (course, sem, filename, base64.decodebytes(file))
                    curse.execute(sql, args)
                    conn.commit()
                    return True

    def add_notes(self, course, sem, filename, file):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                # check if table exists
                sql = """
                                              SHOW TABLES LIKE 'notes';
                                              """
                curse.execute(sql)
                response = list(curse.fetchall())
                # print("response :", response)
                # print("blob data :", questionBuffer)
                id = self.generate_banner_id()  # unique id
                if not response:
                    sql = """
                    CREATE TABLE notes (course varchar(128) , semester varchar(12), filename varchar(128),
                    file LONGBLOB);
                    """

                    curse.execute(sql)

                    sql = """
                    INSERT INTO notes VALUES(%s,%s,%s,%s);
                    """
                    args = (course, sem, filename, file)
                    curse.execute(sql, args)
                    conn.commit()
                    return True
                else:
                    sql = """
                                      INSERT INTO notes VALUES(%s,%s,%s,%s);
                                      """
                    args = (course, sem, filename, file)
                    curse.execute(sql, args)
                    conn.commit()
                    return True

    def get_notes(self, course, sem):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                                                              SELECT count(*) FROM notes;
                                                              """
                curse.execute(sql)
                response = list(curse.fetchall())
                if response is None:
                    return response
                else:
                    sql = """
                    SELECT * FROM notes where course = %s AND semester = %s;
                    """
                    args = (course, sem)
                    curse.execute(sql, args)
                    response = list(curse.fetchall())
                    data = []
                    for i in response:
                        data.append({'notesName': i[2], 'notesPDF': base64.b64encode(i[3]).decode()})
                    return data

    def add_branches(self, branch, yors):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                # check if table exists
                sql = """
                                                             SHOW TABLES LIKE 'branches';
                                                             """
                curse.execute(sql)
                response = list(curse.fetchall())
                # print("response :", response)
                # print("blob data :", questionBuffer)
                id = self.generate_banner_id()  # unique id
                if not response:
                    sql = """
                    CREATE TABLE branches (branch varchar(28),yors varchar(12));
                    """
                    curse.execute(sql)

                    sql = """
                    INSERT INTO branches VALUES(%s,%s);
                    """
                    args = (branch, yors)
                    curse.execute(sql, args)
                    conn.commit()
                    return True
                else:
                    sql = """
                                       INSERT INTO branches VALUES(%s,%s);
                                       """
                    args = (branch, yors)
                    curse.execute(sql, args)
                    conn.commit()
                    return True

    def get_branches(self):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                                                                             SELECT count(*) FROM branches;
                                                                             """
                curse.execute(sql)
                response = list(curse.fetchall())
                if response is None:
                    return response
                else:
                    sql = """
                            SELECT * FROM branches;
                            """
                    curse.execute(sql)
                    response = list(curse.fetchall())
                    data = []
                    for i in response:
                        data.append({'branch': i[0], 'yors': i[1]})
                    return data

    @staticmethod
    def gen_uniqueid():
        len = 16
        return "".join(random.choices(string.ascii_uppercase + string.digits, k=len))

    def check_userexist(self, uname):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                SELECT * FROM admins WHERE uname = %s ;
                """
                curse.execute(sql, uname)
                response = list(curse.fetchall())
                print("user existence : ", response)
                if response is []:
                    return False
                else:
                    return True

    def new_admin(self, user, pwd):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                # check if table exists
                sql = """
                                                            SHOW TABLES LIKE 'admins';
                                                            """
                curse.execute(sql)
                response = list(curse.fetchall())
                # print("response :", response)
                # print("blob data :", questionBuffer)
                id = self.generate_banner_id()  # unique id
                if not response:
                    sql = """
                    CREATE TABLE admins(uid varchar(128) primary key, uname varchar(28),ups varchar(128),tkns varchar(128));
                    """
                    curse.execute(sql)
                    hashpass = generate_password_hash(pwd)
                    sql = """
                    INSERT INTO admins VALUES(%s,%s,%s,%s);
                    """
                    args = (self.gen_uniqueid(), user, hashpass, "")
                    curse.execute(sql, args)
                    conn.commit()
                    return True
                else:
                    hashpass = generate_password_hash(pwd)
                    sql = """
                                       INSERT INTO admins VALUES(%s,%s,%s,%s);
                                       """
                    args = (self.gen_uniqueid(), user, hashpass, "")
                    curse.execute(sql, args)
                    conn.commit()
                    return True

    def gen_login_token(self, user):
        ln = 6
        let = ''
        for i in user:
            if len(let) < 2:
                let += i
        return str(let).join(random.choices(string.ascii_uppercase + string.digits, k=ln))

    def login(self, user, pwd):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                SELECT ups,uid FROM admins where uname = %s ;
                """
                curse.execute(sql, user)
                response = list(curse.fetchall())
                print("login res1 : ", response)
                if response is []:
                    return [False]
                # check hash
                if check_password_hash(response[0][0], pwd):
                    tkn = self.gen_login_token(user)
                    sql = """
                    UPDATE admins SET tkns = %s WHERE uname = %s; 
                    """
                    args = (tkn, user)
                    curse.execute(sql, args)
                    conn.commit()
                    return [True, tkn, response[0][1]]
                else:
                    return [False]

    def log_out(self,uid):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                UPDATE admins SET tkns = NULL WHERE uid = %s;
                """
                curse.execute(sql,uid)
                return True

    def verify_secure(self, uid, tkn):
        self.connect()  # revoke
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                SELECT uname from admins where uid = %s AND tkn = %s;
                """
                args = (uid, tkn)
                curse.execute(sql, args)
                response = list(curse.fetchall())
                if response is []:
                    return False
                else:
                    return True

    def test(self):
        self.connect()
        with self.connection as conn:
            with conn.cursor() as curse:
                curse.execute("""
                INSERT INTO test VALUES(%s,%s); 
                """, ('test data', None))
                conn.commit()
                return True
