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
import history_race_analyzer as hhra

import redis
POOL = redis.ConnectionPool(host='127.0.0.1', port=6379, db=0)
my_server = redis.Redis(connection_pool=POOL)
cachedable = False

def get_rank_in_current_and_last_race(race_model, target):
    mysql_conn = MYSQL_connector()
    hids = race_model.df.apply(lambda x: str(x[['hid']].values[0]), axis=1)
    rid = race_model.rid
    __df = pd.DataFrame([])
    for hid in hids:
        h = Horse_History(hourse_id=hid, mysql_conn=mysql_conn)
        curr_rank = h.df[h.df['race_id']==rid][['rank']]
        idx = curr_rank.index.values[0]
        if 0 < idx and idx+target < len(h.df):
            pre_rank = h.df.ix[idx+target, 'rank']
            if 0 < int(pre_rank):
                d = pd.Series([curr_rank.values[0][0], int(pre_rank)],\
                                                            index=['curr','prev'])
                __df = pd.concat([__df, d], axis=1)
    return __df.T

def analye_pre_rank(mrg_df, target):
    from pandas.tools.plotting import scatter_matrix
    import matplotlib.pyplot as plt
    print('---describe---')
    print(mrg_df.describe())
    plt.figure()
    scatter_matrix(mrg_df)
    plt.savefig("./../Data/Image/"+words[0]+"correlation-image-before"+str(target)+".png")
    print('auto-correlation' + str(target))
    print(mrg_df.corr())



def main(target: int):
    # target = 1
    # 対象レースの過去のレースのidを取得
    # mysql_conn = MYSQL_connector()
    nc = NOSQL_connector()
    rids = nc.get_rids_by_name(race_name=words[0])
    if not rids:
        return
    print("number of predict history race: " + str(len(rids)))

    race_models = hhra.get_race_models(rids)
    mrg_df = pd.DataFrame([])
    for rm in race_models:
        print(rm.rid)
        df = get_rank_in_current_and_last_race(race_model=rm, target=target)
        mrg_df = pd.concat([mrg_df, df], axis=0)
        mrg_df.reset_index(drop=True, inplace=True)
    analye_pre_rank(mrg_df, target)

if __name__ == '__main__':
    words = [u'セントウルS']
    args = sys.argv
    if args is not None and "-c" in args:
        cachedable = True
    for i in range(2,4):
        main(i)
