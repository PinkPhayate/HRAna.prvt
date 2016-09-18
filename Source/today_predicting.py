import pandas as pd
from bs4 import BeautifulSoup
import page_scraping as ps
import data_extracter as de
import score_circulater as sc
import sgd
from Library import view_operation as view

import csv, re, lxml, urllib2
ITERATION = 1000
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'

# ['rank', 'frame', 'num', 'age', 'odds', 'fav', 'wght', 'qntty', 'hid', 'race_id' , 'f', 'm', 'g', 'zr', 'pl', 'mi', 'target']
# ['frame', 'num', 'age', 'odds', 'fav', 'hid', 'race_id' , 'f', 'm', 'g']
def create_merged_df(rid):
    d = pd.read_csv('./../Data/' + str(rid) + '.csv', header=None)
    position_df = d.ix[:,0:1]

    # get 'sex' and 'age'
    # status_df = d.ix[:,6:6]
    status_df = d.ix[:,8:8]
    sa = status_df.apply(lambda x: str(x).split(' '), axis=1)
    sa = sa.apply(lambda x: x[4].split('/'))
    sa = sa.apply(lambda x: x[0])


    # get 'fav' and 'odds'
    fav = d.ix[:,9:9]
    of = fav.apply(lambda x: str(x).split(' '), axis=1)
    odds = of.apply(lambda x: x[4])
    fav = of.apply(lambda x: re.findall('\d+', x[5])[0] )
    fav = pd.concat([odds, fav], axis=1)

    df = pd.concat([position_df, sa, fav], axis=1)
    df.columns = ['frame', 'num','sexAge','odds','fav']

    df[['sex', 'age']] = df['sexAge'].str.extract('(.)(\d+)')
    dum = pd.get_dummies(df["sex"])
    size = dum.size/len(dum)
    if size == 2:
        dum.columns = ['f','m']
        df = pd.concat([df, dum], axis=1)
        df = df.drop("sex", axis=1)
        df['g'] = 0
    elif size == 3:
        dum.columns = ['f','m','g']
        df = pd.concat([df, dum], axis=1)
        df = df.drop("sex", axis=1)
    else:
        df = pd.concat([df, dum], axis=1)
    df = df.drop("sexAge", axis=1)

    hid_df = d[7]
    hid_df.columns = ['hid']
    df = pd.concat([df, hid_df], axis=1)
    return df

def create_history_df(hid_dfs):
    '''
        hid_dfs = dfs[['hid']]
        param -> hid_dfs
        return -> all history data about all horses
    '''
    history_df = pd.DataFrame([])
    # get all horse id
    # read file from Data/Horse
    for i, row in hid_dfs.iterrows():
        # print GREEN + 'origin race id: ' + str(row[0]) + ENDC
        # get imformation about each hourse
        d = pd.read_csv('./../Data/Horse/' + str(row[0]) + '.csv', header=None)
        df = d.ix[:,[7,8,10,11,14,15]]
        df['hid'] = row[0]

        # add origin_rid, and rank
        # merge imformations
        history_df = pd.concat([history_df, df], axis=0)

        # transport race field status ex) graw and meter
    history_df = history_df.dropna(axis=0)
    tmp = history_df[14].str.extract('(.)([0-9]+)')
    dum = pd.get_dummies(tmp.ix[:,0])
    history_df = pd.concat([history_df, dum], axis=1)

    # transport race field condition
    dum = pd.get_dummies(history_df.ix[:,5])
    history_df = pd.concat([history_df, dum], axis=1)
    # return merge informations
    # print history_df
    history_df.columns = ['frame', 'num', 'fav', 'rank', 'field','condition','hid', 'fld_stts1', 'fld_stts2', 'fld_cndt1', 'fld_cndt2', 'fld_cndt3', 'fld_cndt4']
    # print history_df
    history_df = history_df.convert_objects(convert_numeric=True)
    history_df = history_df.dropna(axis=0)



    return history_df




if __name__ == '__main__':
    '''
    MODEL1
    using data -> horse status
    train_year -> all years except eval_year
    eval_year  -> one year
    '''


    # Draw home view
    view.draw_title(version='1.1.0')
    view.draw_race_title("Stayer's Stakes")

    f = open('./../Resource/rid_list.csv', 'r')
    reader = csv.reader(f)
    for years in reader:
        pass


    # get all horse status data
    dfs = de.create_merged_df(years)
    # get all horse history data
    hid_dfs = dfs[['race_id', 'hid', 'rank']]
    history_dfs = de.create_history_df(hid_dfs)

    ''' get predict data'''
    # import today_predicting as tp
    rid = 201609040211
    # get predicted horse status data
    df = create_merged_df(rid)
    df.columns = ["frame", "num", "odds", "fav", "age", "f", "m", "g", "hid"]
    # get predicted horse history data
    hid_dfs = df[['hid']]
    history_df = create_history_df(hid_dfs)

    f = open('./../Result/sgd_default_prob.csv', 'wb')
    csvWriter = csv.writer(f)
    csv_data = []

    ta_sum = 0
    va_sum = 0


    # print history_df
    # need to change
    list = sc.circulate_today_score(history_dfs, history_df)
    circulated_scores = pd.DataFrame(list)
    print RED+"CIRCULATWD_SCORE_FROM_HISTORY"+ENDC
    print circulated_scores.sort(0,ascending=False)
    # need to change
    sum_list = sgd.predict_today_via_sgd(dfs,df)
    #
    # ta_sum += ta
    # va_sum += va
    # ta_sum_y = ta
    # va_sum_y = va
    #
    for i in range(0, ITERATION-1):
        list = sgd.predict_today_via_sgd(dfs,df)
        sum_list = [x+y for (x, y) in zip(sum_list, list)]
        # ta_sum += ta
        # va_sum += va
        # ta_sum_y += ta
        # va_sum_y += va

    # circulate average
    list = map(lambda x: float(x) / ITERATION, sum_list)
    print RED+"CIRCULATWD_SCORE_FROM_STATUS"+ENDC
    print list
    # print 'training accuracy =' + str( float(ta_sum_y) / ITERATION )
    # print 'validation accuracy =' + str( float(va_sum_y) / ITERATION )
    #
    # # save probability
    # pay_list = [race_id,]
    # pay_list.extend(list)
