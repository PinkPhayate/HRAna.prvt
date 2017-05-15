class Horse (object):
    def __init__(self, hid, rid, mysql_conn):
        # @param hid: 出場したレースのid
        self.rid = rid
        self.hid = hid
        self.mysql_conn = mysql_conn

    # 同じジョッキーが過去に何回騎乗したかを返すメソッド
    def get_times_same_jockey(self, jocker)
    # その競馬場で過去にどのくらいのレースをしたか
    def get_times_same_field(self, field_name)
    # 過去のレース記録(df)
    def get_history_records()
        # ヒストリーテーブルから対象レースの時間より前の記録をdfにする
    # 出場したレースの日付をもらうメソッド
    def _get_race_time()
