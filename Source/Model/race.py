# -*- coding: utf-8 -*-
import pandas as pd
import data_exchanger as de

class Race(object):
    def __init__(self, rid, mysql_conn):
        self.df = pd.DataFrame([])
        self.rid = int(rid)
        self._get_df(mysql_conn=mysql_conn)
        self._get_hids(self.df['hids'])

    def _get_hids(self, hids):
        self._hids = hids

    def put_hids(self):
        return self._hids



    # def get_df(self, df):
    #     self.df = df
    #
    # def get_df(self, history_df):
    #     self.history_df = history_df

    def _get_df(self, mysql_conn):
        res = mysql_conn.select_data_by_rid(self.rid)
        self.df = de.beautify_data(res)
