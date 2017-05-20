# -*- coding: utf-8 -*-
import MySQLdb
import re
import json

conn = MySQLdb.connect(
    host="localhost",
    db="hra",
    user="root",
    port=3306
)
cursor = conn.cursor()
conn.set_character_set('utf8mb4')
cursor.execute('SET NAMES utf8mb4;')
cursor.execute('SET CHARACTER SET utf8mb4;')
cursor.execute('SET character_set_connection=utf8mb4;')

hid, jockey = '2011105000', '川田将雅'
rid = '201309040605'

def execution(query, args):
    cursor.execute(query, args)
    res = cursor.fetchall()
    print 'response: '+str(res)

# sql = ("""SELECT * FROM %s where hid = %%s and jockey = %%s""" % ('history',))
# cursor.execute(sql, (hid, jockey))
# res = cursor.fetchall()
# print 'response: '+str(res)


sql = ("""SELECT * FROM %s where hid = %%s and jockey = %%s""" % ('history',))
args = (hid, jockey)
execution(query=sql, args=args)
