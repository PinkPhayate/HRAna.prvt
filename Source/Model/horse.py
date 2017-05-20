# -*- coding: utf-8 -*-
class Horse (object):
    def __init__(self, hid, rid, mysql_conn):
        # @param rid: 出場したレースのid
        self.rid = rid
        self.hid = hid
        self.mysql_conn = mysql_conn

    # レース当日のコンディションを取得
    # def get_today_params():
        # list = get_todat_list(self.hid)

    # 同じジョッキーが過去に何回騎乗したかを返すメソッド
    def get_times_same_jockey(self, jocker):
        times = self.mysql_conn.get_times_same_jockey(self.hid, jocker)
        print len(timess)
        return len(timess)

    # その競馬場で過去にどのくらいのレースをしたか
    def get_times_same_field(self, field_name):
        times = self.mysql_conn.get_times_same_field(self.hid, field_name)
        print len(timess)
        return len(timess)

    # 過去のレース記録(df)
    # def get_history_records()
    #     # ヒストリーテーブルから対象レースの時間より前の記録をdfにする
