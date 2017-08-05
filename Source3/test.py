from Model import race
from Model.race import Race_History
from Model import res
import mysql_connector
import data_exchanger as de
import nosql_connector as nsc
from Controller import algorithm

rid = 201605020611
mysql_conn = mysql_connector.MYSQL_connector()
def test_add_extention_info():
    r = race.Race(rid, mysql_conn)
    for hid in r._hids:
        # print(hid
        horse_sr = r.df[ r.df['hid']==hid ]
        # print(horse_sr
        obj = horse_sr['jockey']
        print(obj)
        print(type(obj))

def test__get_df_from_db():
    res = mysql_conn.select_data_by_rid(rid)
    df = de.beautify_data(res)
    print(df)

def test_jockey_time():
    hid = 2013105840
    jockey = 'ルメール'
    times = mysql_conn.get_times_same_jockey(hid, jockey)
    print(times)
    print('time: ' + str( len(times) ))

def test_jockey_time():
    hid = 2013105840
    course_status = "芝"
    times = h.get_times_same_field(course_status)
    print(times)
    print('time: ' + str( len(times) ))

def remove_after_data():
    hid = 2013105840
    jockey = 'ルメール'
    res = mysql_conn.get_times_same_jockey(hid, jockey)
    date = 20160508
    res = de.remove_after_data(res, date)
    print(len(res))


def test_get_race_result_return():
    nosql_connector = nsc.NOSQL_connector()
    odds_dict = nosql_connector.get_race_result_return(rid)
    if odds_dict:
        print(odds_dict['単勝'])


def test_get_odds_dict():
    """
    Rasult_Oddsで生成されるrtvalがどのようになっているか調べるテスト
    """
    rid = 201605020611
    dict = algorithm.get_odds_dict(rid)
    print('dict[単勝]): '+str(dict['単勝']))
    print('dict[ワイド]): '+str(dict['ワイド']))

def test_race_rist_del():
    rids = [201605020611, 201505020611, 201405020611]
    race_models = []
    for rid in rids:
        r = race.Race(rid, mysql_conn)
        race_models.append(r)
    import copy
    models = copy.deepcopy(race_models)
    for i, race_model in enumerate(models):
        del race_models[i]
        print(race_models)
        break
    print(models)


class Race_History_Test(object):
    def __init__(self):
        self.mysql_conn = mysql_connector.MYSQL_connector()
        self.race_id = '201405020611'
        self.race_History = Race_History(self.race_id, mysql_conn)

    def test_get_old_races(self):
        self.race_History.retrieve_history_race()
        print(self.race_History.history_map)

# test__get_df_from_db()
# test_add_extention_info()
# test_jockey_time()
# test__get_df_from_db()
# remove_after_data()
# test_get_race_result_return()
# test_race_rist_del()
# test_Result_Odds_dict()

rht = Race_History_Test()
rht.test_get_old_races()
