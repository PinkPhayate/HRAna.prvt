# -*- coding: utf-8 -*-
import data_extracter as de
import csv
from Simulation import pay_algo as pay
import score_circulater as sc
# import sgd
import rf
from Library import view_operation as view
import ConfigParser

ITERATION = 10
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'
inifile = ConfigParser.SafeConfigParser()
inifile.read("../config.ini")
DB_DIR = inifile.get("env","db_dir")
if __name__ == '__main__':
    '''
    MODEL1
    using data -> horse status
    train_year -> all years except eval_year
    eval_year  -> on e year
    '''
    # Draw home view
    view.draw_title(version= inifile.get("env","version") )
    print '======================================='
    view.draw_race_title("Centaur's S")
    print '======================================='

    # get race list -> years
    f = open(DB_DIR + 'race_id_list.csv', 'r')
    reader = csv.reader(f)
    for years in reader:
        pass


    # get all horse status data
    dfs = de.create_merged_df(years)

    # get all horse history data
    hid_dfs = dfs[['race_id', 'hid', 'rank']]
    history_dfs = de.create_history_df(hid_dfs)
    # history_dfs.to_csv('./../Log/hid_dfs.csv')

    # 今回のジョッキーを取得
    # そのジョッキーを元に過去の回数をカウント
    #　必要なリソース: 今回のジョッキー、今回出場する馬のid
    tmp_df = dfs[['race_id', 'hid', 'jockey']]
    de.count_race_with(tmp_df)





    f = open('./../Result/sgd_default_prob.csv', 'wb')
    csvWriter = csv.writer(f)
    csv_data = []

    ta_sum = 0
    va_sum = 0

    years = years[:5]

    for race_id in years:
        print GREEN + str(race_id) + ENDC
        # circulate horse_score
        # list = sc.circulate_score(history_dfs, race_id)
        # print list
        # merge dfs and score_df
        # predict iteratly
        sum_list = rf.predict_via_rf(dfs,race_id)
        # ta_sum += ta
        # va_sum += va
        # ta_sum_y = ta
        # va_sum_y = va
        for i in range(0, ITERATION-1):
            list = rf.predict_via_rf(dfs,race_id)
            print list
            sum_list = [x+y for (x, y) in zip(sum_list, list)]
            #
            # ta_sum += ta
            # va_sum += va
            # ta_sum_y += ta
            # va_sum_y += va
        # circulate average
        list = map(lambda x: float(x) / ITERATION, sum_list)
        print list
        # print 'training accuracy =' + str( float(ta_sum_y) / ITERATION )
        # print 'validation accuracy =' + str( float(va_sum_y) / ITERATION )

        # save probability
        pay_list = [race_id,]
        pay_list.extend(list)

        ## make dicision to pay or not
        # pay_list = [race_id,]
        # for index in range(1,len(list)):
        #         if list[index] >= THRESHOLD:
        #         pay_list.append(index)
        # print pay_list
        csvWriter.writerow(pay_list)
        csv_data.append(pay_list)
    f.close

    print 'training accuracy =' + str( float(ta_sum) / (ITERATION*len(years)) )
    print 'validation accuracy =' + str( float(va_sum) / (ITERATION*len(years)) )
    pay.collate_pred(csv_data)
