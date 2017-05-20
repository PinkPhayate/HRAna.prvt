# -*- coding: utf-8 -*-
import pandas as pd
import data_exchanger as de
from Model import horse

class Race(object):
    def __init__(self, rid, mysql_conn):
        self.df = pd.DataFrame([])
        self.rid = int(rid)
        self._get_df_from_db(mysql_conn=mysql_conn)

    def get_hids(self):
        return self._hids

    def get_df(self):
        return self.df

    def _update_df(df):
        self.df = pd.merge(self.df,df, on='hid')



    def _get_df_from_db(self, mysql_conn):
        res = mysql_conn.select_data_by_rid(self.rid)
        self.df = de.beautify_data(res)
        self._hids = self.df['hid']
        race_date = self.df['date']
        # print len(race_date)
        # print (race_date[0])
        self.date = de.convert_data_to_int(race_date[0])

    def add_extention_info(self, mysql_conn):
        df = pd.DataFrame([])
        for hid in self._hids:
            horse_sr = self.df[ self.df['hid']==hid ]
            h = horse.Horse(hid, self.rid, mysql_conn)
            sr = pd.DataFrame([])
            print horse_sr['jockey']
            sr['jockey_time'] = h.get_times_same_jockey(horse_sr['jockey'][0])
            # sr['field_time'] = h.get_times_same_field(horse_sr['course_status'][0])
            sr['hid'] = hid
            df = pd.concat([df, sr], axis=1)
        self._update_df(df)
