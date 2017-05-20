# -*- coding: utf-8 -*-
from Model import race
import mysql_connector
def test_add_extention_info():
    rid = 201309040605
    mysql_conn = mysql_connector.MYSQL_connector()
    r = race.Race(rid, mysql_conn)
    for hid in r._hids:
        horse_sr = r.df[ r.df['hid']==hid ]
        print horse_sr
        obj = horse_sr.ix[0,'芝']
        print obj
        print type(obj)

test_add_extention_info()
