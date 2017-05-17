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
df = pd.DataFrame([])
for rid in rids:
    #TODO: 各レースのデータフレームを取得するところを非同期にする
    r = race.Race(rid, mysql_conn)
    df = pd.concat([df, r.df], axis=0)
df.to_csv('test.csv')

# dfのカラム付け
# 文字列データのダミーデータ化
#
