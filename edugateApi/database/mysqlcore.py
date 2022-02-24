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
                print("response :",response)
                print("blob data :",bannerblob)
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
                    return True
                else:
                    sql = """
                    INSERT INTO banners (banner_img,banner_id)VALUES(%s,%s);
                                       """
                    curse.execute(sql, (bannerblob, id))
                    print("query : ",curse.fetchall())
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
                        data.append({"banner": i[0], "banner_id": i[1]})

                    return data

    def test(self):
        self.connect()
        with self.connection as conn:
            with conn.cursor() as curse:
                curse.execute("""
                INSERT INTO test VALUES(%s,%s); 
                """,('test data',None))
                return True
