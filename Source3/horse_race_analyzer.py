from Controller import simulation
from Model import race
from Model import horse
import mysql_connector
import pandas as pd

# mysqlのインスタンスを作成
mysql_conn = mysql_connector.MYSQL_connector()

# 対象レースの過去のレースのidを取得
# TODO nosqlから分析レースの過去のridを含むリストを取ってくるメソッド
rids = [201605020611]


# モデル作成のためのデータフレーム作成
# 1レースにつき複数のhorseクラス
# 1年につき
df = pd.DataFrame([])
race_models = []
for rid in rids:
    # TODO 各レースのデータフレームを取得するところを非同期にする
    # レースの結果、出走した馬あたりの情報はinitで取得しておく
    r = race.Race(rid, mysql_conn)
    # TODO: もし、まだ結果のわからないデータを予測するなら、このメソッドで取得する情報は手入力しないといけない
    r.investigate_race_info()
    # 各馬の情報を随時足して行く
    r.add_extention_info(mysql_conn=mysql_conn)
    race_models.append(r)
    # r.df.to_csv("test.csv")

simulation.Race_simulation(rids=rids, race_models=race_models)
