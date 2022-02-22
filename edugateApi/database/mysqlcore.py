import pymysql
import random
import string

# import flaskext.mysql as mysql
# import mysql.connector as connector
password = 'edugate@db'


class dbHandler:
    def __init__(self):
        self.connection = pymysql.connect(user="root", password=password, database="edugatedb", host="localhost")

    @staticmethod
    def generate_banner_id():
        len = 8
        return "".join(random.choices(string.ascii_uppercase + string.digits, k=len))

    def store_banner(self, bannerblob):
        with self.connection as conn:
            with conn.cursor() as curse:
                # check if table exists
                sql = """
                SHOW TABLES LIKE 'banners';
                """
                curse.execute(sql)
                response = list(curse.fetchall())
                id = self.generate_banner_id()  # unique id
                if response is None:
                    # table not exists
                    sql = """
                    CREATE TABLE banners (banner_img blob , banner_id varchar(max) );
                    """
                    curse.execute(sql)

                    sql = """
                    INSERT INTO banners VALUE(?,?);
                    """
                    curse.execute(sql,(bannerblob,id))
                    return True
                else :
                    sql = """
                                       INSERT INTO banners VALUE(?,?);
                                       """
                    curse.execute(sql, (bannerblob, id))
                    return True

    def get_banners(self):
        with self.connection as conn:
            with conn.cursor() as curse:
                sql = """
                               SELECT count(*) FROM banners;
                               """
                curse.execute(sql)
                response = list(curse.fetchall())
                if response is None:
                    return response
                else :
                    sql = """
                    SELECT * FROM banners;
                    """
                    curse.execute(sql)
                    response = curse.fetchall()
                    data = []
                    for i in response:
                         data.append({"banner":i[0],"banner_id":i[1]})

                    return data


