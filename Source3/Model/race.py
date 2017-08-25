from Model import horse
import pandas as pd
import data_exchanger as de
import logging
from nosql_connector import NOSQL_connector

class Race(object):
    mysql_connv = None
    history_map = []
    date = ''
    rid = ''
    entry_horses_id = []
    df = None
    __ranked_pred = None
    __odds_dict = None

    def __init__(self, race_id, mysql_conn):
        self.mysql_conn = mysql_conn
        self.rid = int(race_id)
        self.__set_df()
        self.__set_date()
        self.__set_result_odds()

    def __set_df(self):
        res = self.mysql_conn.select_data_by_rid(self.rid)
        if res is None or len(res) < 1:
            logging.warning('couldnt find any record, race_id: '+str(self.rid))
            return
        self.df = de.beautify_data(res)
        # remove horse which canceled entry race
        self.df = self.df[self.df['rank'] != 0]
        # sort by ranking
        self.df = self.df.sort_values(by=["rank"], ascending=True)

    def __set_result_odds(self):
        nc = NOSQL_connector()
        odds_dict = nc.get_race_result(str(self.rid))
        self.__odds_dict = odds_dict



    def __set_date(self):
        if self.df is None:
            return
            print("self.df['date'][0]")
            print(self.df['date'])
        self.date = de.convert_data_to_int(self.df['date'][0])
        # TODO レース当日は今日の日付が取れていない
        # self.date = 20170820

    def get_rank_by_hid(self, hid):
        s = self.get_series_by_hid(hid)
        if 0 < len(s):
            s = s.ix[:, 0]
        return s['rank']

    def get_series_by_hid(self, hid):
        return self.df[self.df['hid'] == int(hid)]

    def merge_fav(self):
        if self.__ranked_pred is None or self.df is None:
            return
        if 'rank' not in self.__ranked_pred.columns:
            print('__ranked_pred has not rank column')
            return
        if 'rank' not in self.df:
            print('df has not rank column')
            return
        __mrg_df = pd.merge(self.df, self.__ranked_pred, on='rank')
        return __mrg_df[[ 'no', 'rank', 'fav', 'pred']]\
                            .sort_values(by=["pred"], ascending=True)


#     def __init__(self, rid, mysql_conn):
#         self.df = pd.DataFrame([])
#         self.rid = int(rid)
#         self._get_df_from_db(mysql_conn=mysql_conn)
#         self.course = None
#         self.course_status = None
#
#
    def get_hids(self):
        return list(self.df[['hid']].values.flatten())

    def set__ranked_pred(self, report_df):
        self.__ranked_pred = report_df

    def get__ranked_pred(self):
        return self.__ranked_pred


    def get_no_by_rank(self, rank):
        s = self.df[self.df.apply(lambda x: int(x['rank'])==int(rank), axis=1)]
        return s['no'].values[0]

    def get__odds_dict(self):
        return self.__odds_dict

#     def get_df(self):
#         return self.df
#
#     def _update_df(self, df):
#         self.df = pd.merge(self.df,df, on='hid')
#
#
#
#     def _get_df_from_db(self, mysql_conn):
#         res = mysql_conn.select_data_by_rid(self.rid)
#         if res is None:
#             logging.warning('couldnt find any record'+self.rid)
#             return
#         self.df = de.beautify_data(res)
#         self._hids = self.df['hid']
#
#     def investigate_race_info(self):
#         self._get_race_date()
#         self._get_race_course()
#         self._get_race_course_status()
#
#     def put_race_info(self, date, course, course_status):
#         self.date = date
#         self.course = course
#         self.course_status = course_status
#
#     def _get_race_date(self):
#         race_date = self.df.ix[0,'date']
#         self.date = de.convert_data_to_int(race_date)
#
#     def _get_race_course(self):
#         course = self.df.ix[0,'course']
#         # TODO:   もしsutoring型であれば消していいけど。。。
#         if type(course)==str:
#             self.course = course
#         else:
#             print( 'course is not string, type is : ' + str(type(course)))
#
#     def _get_race_course_status(self):
#         course_status = self.df.ix[0,'course_status']
#         # TODO:   もしsutoring型であれば消していいけど。。。
#         if type(course_status)==str:
#             self.course_status = course_status
#         else:
#             print('course_status is not string, type is : ' + str(type(course_status)))
#
#     def add_extention_info(self, mysql_conn):
#         df = pd.DataFrame([])
#         for hid in self._hids:
#             horse_sr = self.df[ self.df['hid']==hid ]
#             h = horse.Horse(hid, self.rid, mysql_conn)
#             # 対象となるレースの日付を入力することで、その後のレース情報を取得しない
#             h.put_race_date(self.date)
#             sr = pd.DataFrame([])
#             jockey = horse_sr['jockey'].values
#             h.jockey = jockey[0]
#             sr.loc[0,'jockey_time'] = h.get_times_same_jockey(h.jockey)
#             if self.course is not None:
#                 sr.loc[0,'course_time'] = h.get_times_same_condition(self.course)
#             if self.course_status is not None:
#                 sr.loc[0,'course_status_time'] = h.get_times_same_field(self.course_status)
#             sr['hid'] = hid
#             df = pd.concat([df, sr], axis=0)
#         self._update_df(df)


class Race_History(Race):
    # mysql_connv = None
    # history_map = []
    # date = ''
    # race_id = ''
    # entry_horses_id = []
    # df = None
    history_df = pd.DataFrame([])

    def __init__(self, race_id, mysql_conn):
        super(Race_History, self).__init__(race_id, mysql_conn)


    def __set_entry_horses_id(self):
        if self.df is None:
            self.__set_df()
        self.entry_horses_id = self.df['hid'].tolist()

    def retrieve_history_race(self):
        li = []
        if len(self.entry_horses_id) < 1:
            self.__set_entry_horses_id()
        for horse_id in self.entry_horses_id:
            history_races = self.__get_old_races(horse_id)
            li.extend(history_races)
        self.history_map = list(set(li))

    def __get_old_races(self, hid):
        res = self.mysql_conn.select_race_by_hid(hid)
        if res != "":
            res = de.remove_after_data(res, self.date)
        return list(res[['race_id']].values.flatten())

    def set_history_df(self, df):
        self.history_df = df

class Race_Today(Race):
    history_df = pd.DataFrame([])

    def __init__(self, race_id, mysql_conn):
        self.mysql_conn = mysql_conn
        self.rid = int(race_id)
        self.date = self.__get_today_data()

    def __formalize(self, str):
        return ('0'+str) if len(str) == 1 else str

    def __get_today_data(self):
        from datetime import datetime
        dt = datetime.now()
        year = str(dt.year)
        month = self.__formalize(str(dt.month))
        day = self.__formalize(str(dt.day))
        return int(year + month + day)

    def set_hids(self, hids):
        self.hids = hids
