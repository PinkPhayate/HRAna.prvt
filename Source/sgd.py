import data_extracter as de
import pandas as pd
import numpy as np
import csv
from Predict import pay_algo as pay
from sklearn.linear_model import SGDClassifier
from Predict import pay_algo as pay
ALL_PARAMS = ['frame', 'num','age','odds','fav','wght','qntty','f','m','z','p','m']
ITERATION = 1
THRESHOLD = 0.5

def predict_via_sgd(dfs, race_id):
        evalt_df = dfs[dfs['race_id'] == race_id]
        train_df = dfs[dfs['race_id'] != race_id]

        train_df = oversampling(train_df)

        X = train_df[ALL_PARAMS]
        y = train_df[['target']]

        clf = SGDClassifier(loss="log", penalty="l2", class_weight="auto")
        clf.fit(X, y)

        eX = evalt_df[ALL_PARAMS]
        # ey = evalt_df[['target']]

        predicts = clf.predict(eX)
        print predicts
        return predicts.tolist()

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
    print len(mn_df)
    print len(mj_df)
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

    for race_id in years:
        print race_id
        # predict iteratly
        sum_list = predict_via_sgd(dfs,race_id)
        for i in range(0, ITERATION-1):
            list = predict_via_sgd(dfs,race_id)
            sum_list = [x+y for (x, y) in zip(sum_list, list)]
        # circulate average
        list = map(lambda x: float(x) / ITERATION, sum_list)

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

    # pay.collate_pred()
    pay.collate_pred(csv_data)
