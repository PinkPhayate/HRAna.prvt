# -*- coding: utf-8 -*-
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
            return res
        except:
            print('cannot execute query')
            self.try_to_connect()

    def _execute_query(self, sql):
        try:
            self.cursor.execute(sql)
            res = self.cursor.fetchall()
            # print res
            # TODO  二件以上ある場合はどうなるの
            return res
        except:
            print('cannot execute query')
            print(sql)
            self.try_to_connect()

    def _execute_query_with_2params(self, query, args):
        try:
            self.cursor.execute(query, args)
            return self.cursor.fetchall()
        except:
            print('cannot execute query')
            print(sql)
            self.try_to_connect()


    def get_times_same_jockey(self, hid, jockey):
        args = (hid,jockey)
        sql = ("""SELECT * FROM %s where hid = %%s and jockey = %%s""" % ('history',))
        res = self._execute_query_with_2params(sql,args)
        return res
        # return self._execute_query(self, sql)

    def get_times_same_field(self, hid, course_status):
        args = (hid,course_status)
        sql = ("""SELECT * FROM %s where hid = %%s and course_status = %%s""" % ('history',))
        res = self._execute_query_with_2params(sql,args)
        return res

    def get_times_same_condition(self, hid, course):
        args = (hid,course)
        sql = ("""SELECT * FROM %s where hid = %%s and course = %%s""" % ('history',))
        res = self._execute_query_with_2params(sql,args)
        return res
