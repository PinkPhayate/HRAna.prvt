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

def get_horse_history_df(hid):
    d = pd.read_csv(DB_DIR + 'Horse/' + hid + '.csv', header=0,index_col=0)
    df = d.ix[:,:17]
    col = ['date','race','whether','R','race_name','movie','all','frame','no','odds','fav','rank','jockey','hande','dart','law','distance']
    df.columns = col
    return df
