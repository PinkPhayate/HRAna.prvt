# -*- coding: utf-8 -*-
import MySQLdb
import re
import json
import logging

class MYSQL_connector(object):
    args = {
        "host": "127.0.0.1",
        "database": "hra",
        "user": "root",
        "password": "root",
        "port": 3333
    }

    def __init__(self):
        self.try_to_connect()

    def try_to_connect(self):
        self.conn = MySQLdb.connect(
            user='root',
            passwd='root',
            port=3333,
            host='127.0.0.1',
            db='HRA'
        )

        self.cursor = self.conn.cursor()
        self.conn.set_character_set('utf8mb4')
        self.cursor.execute('SET NAMES utf8mb4;')
        self.cursor.execute('SET CHARACTER SET utf8mb4;')
        self.cursor.execute('SET character_set_connection=utf8mb4;')
        self.remove_redundant_record()
        print('connect to mysql')

    def remove_redundant_record(self):
        sql = """DELETE FROM history WHERE uid NOT IN (SELECT min_id from\
         (SELECT MIN(uid) min_id FROM history GROUP BY race_id, hid) tmp)"""
        self.cursor.execute(sql)
        self.conn.commit()
        logging.info("removed redundant records")
        # res = self.cursor.fetchall()

    def select_data_by_rid(self, rid):
        # rid = str(rid)
        try:
            sql = ("""SELECT * FROM history where race_id = %s""" % rid)
            logging.info(sql)
            self.cursor.execute(sql)
            res = self.cursor.fetchall()
            logging.info(res)
            return res
        except:
            logging.warning('cannot execute query')
            self.try_to_connect()

    def select_race_by_hid(self, hid):
        # rid = str(rid)
        try:
            sql = ("""SELECT * FROM history where hid = %s""" % hid)
            # print(sql)
            logging.info(sql)
            self.cursor.execute(sql)
            res = self.cursor.fetchall()
            # print(res)
            return res
        except:
            logging.warning('cannot execute query')
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
            print(query)
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

    def insert_db(self, df):
        con = MySQLdb.connect(**self.args)
        con.set_character_set('utf8')
        con.cursor().execute('SET NAMES utf8;')
        con.cursor().execute('SET CHARACTER SET utf8;')
        con.cursor().execute('SET character_set_connection=utf8;')
        table_name = "res"
        df.to_sql(table_name,
                  con=self.conn,
                  flavor='mysql',
                  index=False,
                  if_exists='append')
