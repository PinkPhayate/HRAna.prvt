# -*- coding: utf-8 -*-
from Model import race
from Model import horse
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
    # ここ非同期処理に
    hids = r.put_hids()
    ei = _add_extention_info(race_objevct=r, hids=hids)
    # eiとdfをhidでinner join
    merged_df = pd.merge(r.df,ei, on='hid')
    r.merged_df = merged_df
    race_models.append(r)
    # ここまで非同期実行

df.to_csv('test.csv')




def _add_extention_info(race_objevct,hids):
    mysql_conn = mysql_connector.MYSQL_connector()
    df = pd.DataFrame([])
    for hid in hids:
        h = Horse(hid, rid, mysql_conn)
        sr = pd.DataFrame([])
        sr['jockey_time'] = h.get_times_same_jockey(race_objevct.jocker)
        sr['field_time'] = h.get_times_same_field(race_objevct.field_name)
        sr['hif'] = hid
        df = pd.concat([df, sr], axis=1)
    return df
