import data_extracter as de
import pandas as pd
import numpy as np
import csv
from Predict import pay_algo as pay
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import accuracy_score
from sklearn.utils import column_or_1d
ALL_PARAMS = ['frame', 'num','age','odds','fav','wght','qntty','f','m','z','p','m']
ITERATION = 100
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'


def predict_via_sgd(dfs, race_id):
        evalt_df = dfs[dfs['race_id'] == race_id]
        train_df = dfs[dfs['race_id'] != race_id]

        train_df = oversampling(train_df)

        X = train_df[ALL_PARAMS]
        y = train_df[['target']]

        clf = SGDClassifier(loss="log", penalty="l2", class_weight="auto")
        clf.fit(X, column_or_1d(y))

        eX = evalt_df[ALL_PARAMS]
        # ey = evalt_df[['target']]


        predicts = clf.predict(X)
        training_accuracy = accuracy_score(train_df[['target']], predicts.tolist())

        predicts = clf.predict(eX)
        validation_accuracy = accuracy_score(evalt_df[['target']], predicts.tolist())
        # print predicts
        return predicts.tolist(), training_accuracy, validation_accuracy

def oversampling(dfs):
    pos_df = dfs[dfs['target'] == 1]
    neg_df = dfs[dfs['target'] == 0]
    if len(pos_df) > len(neg_df):
        mn_df = neg_df
        mj_df = pos_df
    else:
        mn_df = pos_df
        mj_df = neg_df

    nnk = len(mj_df) - len(mn_df)
    sampler = np.random.permutation(len(mn_df))
    new_df = mn_df.take(sampler[:nnk])

    mn_df = pd.concat([mn_df, new_df], axis=0)
    dfs = pd.concat([mn_df, mj_df], axis=0)
    return dfs

if __name__ == '__main__':
    '''
    MODEL1
    train_year -> all years except eval_year
    eval_year  -> one year
    '''
    df = pd.read_csv('./../Data/race_info.csv', header=None)
    years = df[9]
    # predict_via_sgd( years )
    dfs = de.create_merged_df(years)
    f = open('./../Result/sgd_default_prob.csv', 'wb')
    csvWriter = csv.writer(f)
    csv_data = []

    ta_sum = 0
    va_sum = 0

    for race_id in years:
        print GREEN + str(race_id) + ENDC
        # predict iteratly
        sum_list, ta, va = predict_via_sgd(dfs,race_id)
        ta_sum += ta
        va_sum += va
        ta_sum_y = ta
        va_sum_y = va
        for i in range(0, ITERATION-1):
            list, ta, va = predict_via_sgd(dfs,race_id)
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
    # pay.collate_pred()
    pay.collate_pred(csv_data)
