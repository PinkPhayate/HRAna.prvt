# -*- coding: utf-8 -*-
from Model import race
import mysql_connector
import pandas as pd

# mysqlのインスタンスを作成
mysql_conn = mysql_connector.MYSQL_connector()

# 対象レースの過去のレースのidを取得
# TODO nosqlから分析レースの過去のridを含むリストを取ってくるメソッド
rids = [201602010211,201606040811]

# モデル作成のためのデータフレーム作成
# 1レースにつきhorseクラス一つ
# 1年につき
df = pd.DataFrame([])
race_models = []
for rid in rids:
    #TODO: 各レースのデータフレームを取得するところを非同期にする
    r = race.Race(rid, mysql_conn)
    race_models.append(r)
    df = pd.concat([df, r.df], axis=0)

# dfのカラム付け
# 文字列データのダミーデータ化
#
