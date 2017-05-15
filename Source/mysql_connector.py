import pandas as pd
import MySQLdb
import re
import json
class MYSQL_cnnector(object):
    def __init__(self):
        self.try_to_connect()


    def try_to_connect(self):
        self.conn = MySQLdb.connect(
            host="localhost",
            db="hra",
            user="root",
            port=3306
        )
        self.cursor = self.conn.cursor()
        self.conn.set_character_set('utf8mb4')
        self.cursor.execute('SET NAMES utf8mb4;')
        self.cursor.execute('SET CHARACTER SET utf8mb4;')
        self.cursor.execute('SET character_set_connection=utf8mb4;')

    def select_data_by_rid(self, rid):
        # rid = str(rid)
        try:
            sql = ("""SELECT * FROM history where race_id = %s""" % rid)
            self.cursor.execute(sql)
            res = cursor.fetchall()
            return res[0]
        except:
            print('cannot execute query')
        finally:
            cursor.close()
            conn.close()
