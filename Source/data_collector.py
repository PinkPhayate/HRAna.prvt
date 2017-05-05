import ConfigParser
import pandas as pd

inifile = ConfigParser.SafeConfigParser()
inifile.read("../config.ini")
DB_DIR = inifile.get("env","db_dir")


def get_race_ids():
    f = open(DB_DIR + 'race_id_list.csv', 'r')
    reader = csv.reader(f)
    for years in reader:
        pass
    return years


def get_horse_history_df(hid,target_race_id=None):
    d = pd.read_csv(DB_DIR + 'Horse/' + hid + '.csv', header=0,index_col=0)
    df = d.ix[:,:22]
    col = ['date','race','whether','R','race_name','race_id','movie','all','frame','no','odds','fav','rank','jockey','hande','dart','law','distance','fs1','fs2','fs3','fs4']
    df.columns = col

    col = ['date','race','whether','race_name','race_id','all','frame','no','odds','fav','rank','jockey','hande','dart','law','distance']
    df = df[col]
    if target_race_id is not None:
        df = _reduce_race_info(df, target_race_id)
    return df


def _reduce_race_info(df, target_race_id):
    print(df)
    tmp_df = df['race_id'].apply(lambda x: int(x))
    _df = df[ tmp_df < target_race_id]
    return _df
