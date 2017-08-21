from nosql_connector import NOSQL_connector
import sys
import pandas as pd
from Controller.simulation import Race_simulation
from Model.race import Race_History, Race, Race_Today
from Model.horse import Horse_History
from mysql_connector import MYSQL_connector
import data_exchanger as de
import logging
from os import path
import history_race_analyzer as hisra

def create_today_model(race_id):
    nc = NOSQL_connector()
    mysql_conn = MYSQL_connector()
    race_today = Race_Today(race_id, mysql_conn)
    race_date = race_today.date
    # 出場馬をリスト化
    hids = nc.get_hids_by_rid(rid=race_id)
    race_today.set_hids(hids)

    # もしキャッシュがあれば
    df_file_path = './../Data/Cached/'+race_id+'.csv'
    if path.isfile(df_file_path) and None:
        race_today.history_df = pd.read_csv(df_file_path, index_col=0, header=0)
        return race_today

    # 出場馬の過去のレースを取得
    df = pd.DataFrame([])
    print('hourse which entry target of prediction race is those:')
    print(hids)
    for hid in hids:
        h = Horse_History(hourse_id=hid, mysql_conn=mysql_conn)
        history_rids_df = h.get_previous_race(race_date)
        history_rids_df = history_rids_df[-10:]

        # XXX ここでレースの年数を取り除き、stringにしたいが、strするとNaNになってしまう
        d = pd.DataFrame([])
        history_rids_df['urid'] = history_rids_df[['race_id']]\
            .apply(lambda x: x % 100000000)
        d = history_rids_df[['urid']]
        d.loc[:, 'race_id'] = history_rids_df[['race_id']]
        d.loc[:, 'rank'] = hids.index(hid) + 1
        d.loc[:, 'rid'] = race_id
        df = pd.concat([df, d], axis=0)
    df.to_csv(df_file_path)  # for cached
    race_today.history_df = df
    return race_today

def main(word, today_race_id=None):
    # 対象レースの過去のレースのidを取得
    nc = NOSQL_connector()
    rids = nc.get_rids_by_name(race_name=words[0])
    if not rids:
        logging.info('couldnt get rids from entered word: '+words[0])
        return
    logging.info("number of predict history race: " + str(len(rids)))
    print("number of predict history race: " + str(len(rids)))

    if today_race_id is None:
        return
    #  謎のコード
    # rids = rids.remove_rare_race('')
    race_models = hisra.get_race_models(rids)

    race_model = create_today_model(today_race_id)
    race_models.append(race_model)
    rids.append(today_race_id)

    # ダミー変数化
    hisra.formalize_dummy(race_models)

    rs = Race_simulation(rids=rids, race_models=race_models)
    rs.set_aid(1)
    rs.set_race_name(word[0])
    rs.simulate_today_history(today_race_id)


if __name__ == '__main__':
    words = [u'札幌記念']
    today_race_id = None
    args = sys.argv
    if 1 < len(args):
        today_race_id = args[1]
    for word in words:
        main(word, today_race_id=today_race_id)
