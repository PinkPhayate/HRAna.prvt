import mysql_connector as sqlc
class Race(object):
    def __init__(self, rid):
        self.rid = int(rid)
        self._get_df()

    def get_hids(self, hids):
        self.hids = hids

    def get_df(self, df):
        self.df = df

    def get_df(self, history_df):
        self.history_df = history_df

    def _get_df(self):
        mysql_cnnector = sqlc.MYSQL_cnnector()
        self.df = mysql_cnnector.select_data_by_rid(self.rid)
