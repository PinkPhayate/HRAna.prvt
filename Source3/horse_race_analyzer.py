from Controller import simulation
from Model import race
from Model import horse
import mysql_connector
import nosql_connector
import pandas as pd
import logging
from Model.race import Race, Race_History

def main(word):
    # 対象レースの過去のレースのidを取得
    mysql_conn = mysql_connector.MYSQL_connector()
    nc = nosql_connector.NOSQL_connector()
    rids = nc.get_rids_by_name(race_name=words[0])
    if not rids:
        logging.info('couldnt get rids from entered word: '+word[0])
        return
    logging.info(rids)
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
        # r.investigate_race_info()
        # 各馬の情報を随時足して行く
        # r.add_extention_info(mysql_conn=mysql_conn)
        race_models.append(r)
        # r.df.to_csv("test.csv")
    rs = simulation.Race_simulation(rids=rids, race_models=race_models)
    rs.simulate()

if __name__ == '__main__':
    words = [u'NHKマイル']
    main(words)
