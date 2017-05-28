import data_exchanger as de
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
