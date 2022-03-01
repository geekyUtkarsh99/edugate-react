import base64

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
        self.connect()
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
        self.connect()
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
        self.connect()
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

    def add_notes(self, course, sem, filename, file):
        self.connect()
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
        self.connect()
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

    def add_branches(self, branch):
        self.connect()
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
                    CREATE TABLE branches (branch varchar(28));
                    """
                    curse.execute(sql)

                    sql = """
                    INSERT INTO branches VALUES(%s);
                    """
                    curse.execute(sql, branch)
                    conn.commit()
                    return True
                else:
                    sql = """
                                        INSERT INTO branches VALUES(%s);
                                        """
                    curse.execute(sql, branch)
                    conn.commit()
                    return True

    def get_branches(self):
        self.connect()
        with self.connection as conn:
            with conn.cursor() as curse:
                self.connect()
                with self.connection as conn:
                    with conn.cursor() as curse:
                        sql = """
                                                                             SELECT count(*) FROM branches;
                                                                             """
                        curse.execute(sql)
                        response = list(curse.fetchall())
                        if response is None:
                            return response
                        else :
                            sql = """
                            SELECT * FROM branches;
                            """
                            curse.execute(sql)
                            response = list(curse.fetchall())
                            data = []
                            for i in response:
                                data.append(i[0])
                            return data

    def test(self):
        self.connect()
        with self.connection as conn:
            with conn.cursor() as curse:
                curse.execute("""
                INSERT INTO test VALUES(%s,%s); 
                """, ('test data', None))
                conn.commit()
                return True
