import pandas as pd
from Controller.simulation import Race_simulation
from Model.race import Race_History, Race
from Model.horse import Horse_History
from nosql_connector import NOSQL_connector
from mysql_connector import MYSQL_connector
import data_exchanger as de
import logging

mysql_conn = MYSQL_connector()

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
    # 出場馬の過去のレースを取得
    df = pd.DataFrame([])
    for hid in hids:
        h = Horse_History(hourse_id=hid, mysql_conn=mysql_conn)
        history_rids_df = h.get_previous_race(race_date)

        # XXX ここでレースの年数を取り除き、stringにしたいが、strするとNaNになってしまう
        d = pd.DataFrame([])
        history_rids_df['urid'] = history_rids_df[['race_id']].apply(lambda x: x % 100000000)
        d = history_rids_df[['urid']]
        d['rank'] = hids.index(hid) + 1
        d['rid'] = race_id
        df = pd.concat([df, d], axis=0)

    race_History.history_df = df
    return race_History

def formalize_dummy(race_models):
    mrg_df = pd.DataFrame([])
    for rmodel in race_models:
        hist_df = rmodel.history_df
        mrg_df = pd.concat([mrg_df, hist_df])
    # df = mrg_df['urid'].apply(lambda x: str(x))
    mrg_df.reset_index(drop=True, inplace=True)
    d = mrg_df.apply(lambda x: str(x[['urid']].values[0]), axis=1)
    dummy_df = pd.get_dummies(d, drop_first=True)
    mrg_df = pd.concat([mrg_df, dummy_df], axis=1)
    logging.info('length of columns: ' + str(len(mrg_df.columns)))
    for rmodel in race_models:
        rid = rmodel.rid
        ddf = mrg_df[mrg_df.apply(lambda x: int(x['rid']) == int(rid), axis=1)]
        ddf.drop('urid', axis=1, inplace=True)
        ddf.drop('rid', axis=1, inplace=True)
        rmodel.dummy_df = ddf.reset_index(drop=True)




# def g(race_id):
#     """
#     一年分のレースに出場した馬の過去のレースを振り返り、レースのdfを作成する
#     """
#     # mysql_conn = MYSQL_connector()
#     race_History = Race_History(race_id, mysql_conn)
#     if race_History.mrg_df is None:
#         logging.critical('this race was not in db: ' + race_id)
#         return
#     hids = race_History.get_hids()
#
#     # 対象レースのidを指定して出走馬の過去のレースを取得する
#     for rid in race_History.history_map:
#         # 各レースに対して、対象レースにでている馬の成績を取得
#         race_results = get_race_results(rid, hids)
#
#         # 上位なら１、下位なら0とか、アルゴリズムは適当に
#         # race_results = get_race_rank(race_results)
#         d = pd.DataFrame(race_results)
#         d.columns = [['rank']]
#         # レースidから、開催年を把握できないようにする   201704010211 => 04010211
#         unique_rid = rid % 100000000
#         # unique_ridとrace_rankのdfを作成
#         d['urid'] = str(unique_rid)
#         d['rid'] = rid
#         df = pd.concat([df, d], axis=0)
#     # df = de.convet_unique_rid_dummy(df)
#     race_History.set_history_df(df)
#     return race_History

def main(word):
    # 対象レースの過去のレースのidを取得
    # mysql_conn = MYSQL_connector()
    nc = NOSQL_connector()
    rids = nc.get_rids_by_name(race_name=words[0])
    if not rids:
        logging.info('couldnt get rids from entered word: '+word[0])
        return
    logging.info("number of predict history race: " + str(len(rids)))
    print("number of predict history race: " + str(len(rids)))
    df = pd.DataFrame([])
    race_models = []
    # rids = rids[:2]
    for rid in rids:
        r = create_history_model(rid)
        if r is not None:
            race_models.append(r)

    # ダミー変数化
    formalize_dummy(race_models)

    rs = Race_simulation(rids=rids, race_models=race_models)
    rs.simulate_history()




    # # 対象レースに登録している馬を評価していく。
    # evs = {}
    # hids = race_History.get_hids()
    # for hid in hids:
    #     h = Hoese(hid)
    #     rids = h.get_race_list()
    #     ev = 0
    #     for rid in rids:
    #         ev += d[rid] if rid in d.keys() else 0
    #     evs[hid] = ev
    # print(evs)

if __name__ == '__main__':
    words = [u'札幌記念']
    main(words)
