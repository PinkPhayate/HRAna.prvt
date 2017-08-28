import pandas as pd
import sys
from Controller.simulation import Race_simulation
from Model.race import Race_History, Race
from Model.horse import Horse_History
from nosql_connector import NOSQL_connector
from mysql_connector import MYSQL_connector
import data_exchanger as de
import logging
from os import path

import redis
POOL = redis.ConnectionPool(host='127.0.0.1', port=6379, db=0)
my_server = redis.Redis(connection_pool=POOL)
cachedable = False

args = sys.argv
if args is not None and "-c" in args:
    cachedable = True
cachedable = True
def get_race_results(rid, hid_list):

    race = Race(rid, mysql_conn)
    ranks = []
    for hid in race.get_hids():
        if hid in hid_list:
            rank = race.get_rank_by_hid(hid)
            ranks.append(rank)
    return ranks

def get_race_rank(ranks):
    li = map(lambda x: 1 if x < 4 else 0, ranks)
    c = list(li).count(1)
    return c

def __create_exp_var(df):
    d = pd.DataFrame([])
    df['urid'] = df.apply(lambda x: x % 100000000)
    d = df[['urid']]
    d.loc[:, 'race_id'] = df
    return d

def create_history_model(race_id):
    """
    一年分のレースに出場した馬の過去のレースを振り返り、レースのdfを作成する
    """
    mysql_conn = MYSQL_connector()
    race_History = Race_History(race_id, mysql_conn)
    if race_History.df is None:
        logging.critical('this race was not in db: ' + race_id)
        return
    race_date = race_History.date
    # 出場馬をリスト化
    hids = race_History.get_hids()

    # もしredisキャッシュがあれば
    if cachedable:
        try:
            cached_df = pd.read_msgpack(my_server.get(race_id))
            race_History.history_df = cached_df
            return race_History
        except:
            print('no cached - rid: ' + race_id)

    # ファイル形式のキャッシュ
    # df_file_path = './../Data/Cached/'+race_id+'.csv'
    # if path.isfile(df_file_path):
    #     race_History.history_df = pd.read_csv(df_file_path, index_col=0, header=0)
    #     return race_History

    # 出場馬の過去のレースを取得
    df = pd.DataFrame([])
    for hid in hids:
        h = Horse_History(hourse_id=hid, mysql_conn=mysql_conn)
        history_rids_df = h.get_previous_race(race_date)
        history_rids_df = history_rids_df[-10:]
        if len(history_rids_df) < 1:
            print('this horse has no record - rid: ' + str(hid))
        else:
            d = __create_exp_var(history_rids_df[['race_id']])
            d.loc[:, 'rank'] = hids.index(hid) + 1
            d.loc[:, 'rid'] = race_id
            df = pd.concat([df, d], axis=0)
    my_server.set(race_id, df.to_msgpack(compress='zlib'))  # for cached
    race_History.history_df = df
    return race_History

def remove_rare_race(mrg_df):
    df = mrg_df.copy()
    for k, v in df.iteritems():
        v = v.map(lambda x: int(x))
        sm = v.sum()
        if sm < 2:
            mrg_df.drop(k, axis=1, inplace=True)
    # return mrg_df

def formalize_dummy(race_models):
    mrg_df = None
    if cachedable:
        try:
            cached_df = pd.read_msgpack(my_server.get("dummy_d"))
            mrg_df = cached_df
        except:
            print('no cached - dummy_d: ')
    if mrg_df is None:
        mrg_df = pd.DataFrame([])
        for rmodel in race_models:
            hist_df = rmodel.history_df
            mrg_df = pd.concat([mrg_df, hist_df])
        # df = mrg_df['urid'].apply(lambda x: str(x))
        mrg_df.reset_index(drop=True, inplace=True)
        d = mrg_df.apply(lambda x: str(x[['urid']].values[0]), axis=1)
        dummy_df = pd.get_dummies(d, drop_first=True)
        mrg_df = pd.concat([mrg_df, dummy_df], axis=1)
        print('length of columns: ' + str(len(mrg_df.columns)))
        # removing minority race
        remove_rare_race(mrg_df)
        print('length of columns after removing rare: ' + str(len(mrg_df.columns)))
        my_server.set("dummy_d", mrg_df.to_msgpack(compress='zlib'))  # for cached

    # 再分割
    for rmodel in race_models:
        rid = rmodel.rid
        ddf = mrg_df[mrg_df.apply(lambda x: int(x['rid']) == int(rid), axis=1)]
        ddf.drop('urid', axis=1, inplace=True)
        ddf.drop('rid', axis=1, inplace=True)
        ddf.drop('race_id', axis=1, inplace=True)
        rmodel.dummy_df = ddf.reset_index(drop=True)

def get_race_models(rids):
    race_models = []

    for rid in rids:
        r = create_history_model(rid)
        if r is not None:
            race_models.append(r)
    return race_models

def main():
    # 対象レースの過去のレースのidを取得
    # mysql_conn = MYSQL_connector()
    nc = NOSQL_connector()
    rids = nc.get_rids_by_name(race_name=words[0])
    if not rids:
        logging.info('couldnt get rids from entered word: '+words[0])
        return
    logging.info("number of predict history race: " + str(len(rids)))
    print("number of predict history race: " + str(len(rids)))

    race_models = get_race_models(rids)

    # if today_race_id is not None:
    #     rids.append(today_race_id)

    # ダミー変数化
    formalize_dummy(race_models)

    rs = Race_simulation(rids=rids, race_models=race_models)
    rs.set_aid(6)
    word = words[0]
    rs.set_race_name(word[0])
    rs.simulate_history()
    rs.evaluate_prediction()
    # for rm in race_models:
    #     print(rm.merge_fav())


if __name__ == '__main__':
    words = [u'セントウルS']
    main()
