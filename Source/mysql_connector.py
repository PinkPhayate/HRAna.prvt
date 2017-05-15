import MySQLdb
import re
import json
class MYSQL_connector(object):
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
        print('connect to mysql')

    def select_data_by_rid(self, rid):
        # rid = str(rid)
        try:
            sql = ("""SELECT * FROM history where race_id = %s""" % rid)
            self.cursor.execute(sql)
            res = self.cursor.fetchall()
            return res[0]
        except:
            print('cannot execute query')
            self.try_to_connect()

    def _execute_query(self, sql):
        try:
            self.cursor.execute(sql)
            res = self.cursor.fetchall()
            # TODO  二件以上ある場合はどうなるの
            return res[0]
        except:
            print('cannot execute query')
            print(sql)
            self.try_to_connect()

    def get_times_same_jockey(self, hid, jocker):
        sql = ("""SELECT * FROM history where horse_id = %s and jocker = %s""" % (hid, jocker))
        return self._execute_query(self, sql)

    def get_times_same_field(self, course):
        sql = ("""SELECT * FROM history where horse_id = %s and course = %s""" % (hid, course))
        return self._execute_query(self, sql)
