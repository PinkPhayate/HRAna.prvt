import pandas as pd

class Race(object):
    def __init__(self, rid, mysql_conn):
        self.df = pd.DataFrame([])
        self.rid = int(rid)
        self._get_df(mysql_conn=mysql_conn)

    def get_hids(self, hids):
        self.hids = hids

    # def get_df(self, df):
    #     self.df = df
    #
    # def get_df(self, history_df):
    #     self.history_df = history_df

    def _get_df(self, mysql_conn):
        res = mysql_conn.select_data_by_rid(self.rid)
        self.df = pd.DataFrame([res])
