import data_exchanger as de
import logging
class Horse (object):
    def __init__(self, hid, rid, mysql_conn):
        # @param rid: 出場したレースのid
        self.rid = rid
        self.hid = hid
        self.mysql_conn = mysql_conn
        self.jockey = ""
        self.date = ""

    def put_race_date(self,date):
        self.date = date

    # レース当日のコンディションを取得
    # def get_today_params():
        # list = get_todat_list(self.hid)

    # 同じジョッキーが過去に何回騎乗したかを返すメソッド
    def get_times_same_jockey(self, jocker):
        res = self.mysql_conn.get_times_same_jockey(self.hid, jocker)
        if self.date != "":
            res = de.remove_after_data(res, self.date)
        return len(res)

    # その馬場で過去にどのくらいのレースをしたか
    def get_times_same_field(self, field_name):
        res = self.mysql_conn.get_times_same_field(self.hid, field_name)
        if self.date != "":
            res = de.remove_after_data(res, self.date)
        return len(res)

    # 同じ馬場の状態で過去にどれだけ走ったか
    def get_times_same_condition(self, course):
        res = self.mysql_conn.get_times_same_condition(self.hid, course)
        if self.date != "":
            res = de.remove_after_data(res, self.date)
        return len(res)


    # 過去のレース記録(df)
    # def get_history_records()
    #     # ヒストリーテーブルから対象レースの時間より前の記録をdfにする


class Horse_History(object):
    mysql_conn = None
    history_map = []
    df = None

    def __init__(self, hourse_id, mysql_conn):
        self.hid = hourse_id
        self.mysql_conn = mysql_conn
        self.__set_df()

    def __set_df(self):
        res = self.mysql_conn.select_race_by_hid(self.hid)
        if res is None or len(res) < 1:
            logging.warning('couldnt find any record, race_id: '+self.rid)
            return
        self.df = de.beautify_data(res)
        self.df['date'] = self.df['date'].apply( lambda x: de.convert_data_to_int(x))

    def get_previous_race(self, race_date: int):
        tmp_df = self.df[self.df['date'] < race_date]
        tmp_df = tmp_df.sort_values(by=["date"], ascending=True)
        tmp_df = tmp_df.reset_index(drop=True)
        return tmp_df
