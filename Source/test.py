# -*- coding: utf-8 -*-
from Model import race
import mysql_connector
import data_exchanger as de

rid = 201605020611
mysql_conn = mysql_connector.MYSQL_connector()
def test_add_extention_info():
    r = race.Race(rid, mysql_conn)
    for hid in r._hids:
        # print hid
        horse_sr = r.df[ r.df['hid']==hid ]
        # print horse_sr
        obj = horse_sr['jockey']
        print obj
        print type(obj)

def test__get_df_from_db():
    res = mysql_conn.select_data_by_rid(rid)
    df = de.beautify_data(res)
    print df







# test__get_df_from_db()
test_add_extention_info()
