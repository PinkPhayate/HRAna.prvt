# -*- coding: utf-8 -*-
import pandas as pd
import data_exchanger as de
from Model import horse

class Race(object):
    def __init__(self, rid, mysql_conn):
        self.df = pd.DataFrame([])
        self.rid = int(rid)
        self._get_df_from_db(mysql_conn=mysql_conn)
        self.course = None
        self.course_status = None


    def get_hids(self):
        return self._hids

    def get_df(self):
        return self.df

    def _update_df(self, df):
        self.df = pd.merge(self.df,df, on='hid')



    def _get_df_from_db(self, mysql_conn):
        res = mysql_conn.select_data_by_rid(self.rid)
        self.df = de.beautify_data(res)
        self._hids = self.df['hid']

    def investigate_race_info(self):
        self._get_race_date()
        self._get_race_course()
        self._get_race_course_status()

    def put_race_info(self, date, course, course_status):
        self.date = date
        self.course = course
        self.course_status = course_status

    def _get_race_date(self):
        race_date = self.df.ix[0,'date']
        self.date = de.convert_data_to_int(race_date)

    def _get_race_course(self):
        course = self.df.ix[0,'course']
        # TODO:   もしsutoring型であれば消していいけど。。。
        if type(course)==str:
            self.course = course
        else:
            print 'course is not string, type is : ' + str(type(course))

    def _get_race_course_status(self):
        course_status = self.df.ix[0,'course_status']
        # TODO:   もしsutoring型であれば消していいけど。。。
        if type(course_status)==str:
            self.course_status = course_status
        else:
            print 'course_status is not string, type is : ' + str(type(course_status))

    def add_extention_info(self, mysql_conn):
        df = pd.DataFrame([])
        for hid in self._hids:
            horse_sr = self.df[ self.df['hid']==hid ]
            h = horse.Horse(hid, self.rid, mysql_conn)
            h.put_race_date(self.date)
            sr = pd.DataFrame([])
            jockey = horse_sr['jockey'].values
            h.jockey = jockey[0]
            sr.loc[0,'jockey_time'] = h.get_times_same_jockey(h.jockey)
            if self.course is not None:
                sr.loc[0,'course_time'] = h.get_times_same_condition(self.course)
            if self.course_status is not None:
                sr.loc[0,'course_status_time'] = h.get_times_same_field(self.course_status)
            sr['hid'] = hid
            print sr
            df = pd.concat([df, sr])
        self._update_df(df)
