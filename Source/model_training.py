import data_extracter as de
import csv
from Simulation import pay_algo as pay
import score_circulater as sc
import sgd
ALL_PARAMS = ['rank', 'frame', 'num', 'age', 'odds', 'fav', 'wght', 'qntty', 'hid', 'race_id' , 'f', 'm', 'g', 'zr', 'pl', 'mi', 'target']
ITERATION = 100
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'

if __name__ == '__main__':
    '''
    MODEL1
    train_year -> all years except eval_year
    eval_year  -> one year
    '''

    f = open('./../Resource/rid_list.csv', 'r')
    reader = csv.reader(f)
    for years in reader:
        pass


    # get all horse status data
    dfs = de.create_merged_df(years)

    # get all horse history data
    # hid_dfs = dfs[['race_id', 'hid', 'rank']]
    # history_dfs = de.create_history_df(hid_dfs)




    f = open('./../Result/sgd_default_prob.csv', 'wb')
    csvWriter = csv.writer(f)
    csv_data = []

    ta_sum = 0
    va_sum = 0

    for race_id in years:
        print GREEN + str(race_id) + ENDC
        # circulate horse_score
        score_df = sc.circulate_score(dfs, race_id)
        # score_df = sc.circulate_score(history_dfs, race_id)
        # merge dfs and score_df
        # predict iteratly
        sum_list, ta, va = sgd.predict_via_sgd(dfs,race_id)
        ta_sum += ta
        va_sum += va
        ta_sum_y = ta
        va_sum_y = va
        for i in range(0, ITERATION-1):
            list, ta, va = sgd.predict_via_sgd(dfs,race_id)
            sum_list = [x+y for (x, y) in zip(sum_list, list)]
            ta_sum += ta
            va_sum += va
            ta_sum_y += ta
            va_sum_y += va
        # circulate average
        list = map(lambda x: float(x) / ITERATION, sum_list)
        print 'training accuracy =' + str( float(ta_sum_y) / ITERATION )
        print 'validation accuracy =' + str( float(va_sum_y) / ITERATION )

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
