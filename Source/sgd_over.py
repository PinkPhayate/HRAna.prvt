import data_extracter as de
import today_scraiping as ts
import pandas as pd
import numpy as np
import csv
from Predict import pay_algo as pay
from sklearn.linear_model import SGDClassifier
from sklearn.metrics import accuracy_score
from sklearn.utils import column_or_1d
ALL_PARAMS = ['frame', 'num','age','odds','fav','f','m','g']
ITERATION = 100
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'


def predict_via_sgd(dfs, race_id):
    # train_df = dfs[dfs['race_id'] != race_id]
    train_df = dfs
    print train_df
    # evalt_df = dfs[dfs['race_id'] == race_id]
    evalt_df = ts.create_merged_df(race_id)
    print evalt_df

    X = train_df[ALL_PARAMS]
    y = train_df[['target']]
    clf = SGDClassifier(loss="log", penalty="l2", class_weight="auto", n_iter=1000)
    clf.fit(X, column_or_1d(y))

    eX = evalt_df[ALL_PARAMS]
    predicts = clf.predict(eX)
    return predicts.tolist()

if __name__ == '__main__':
    '''
    PREDICT RACE EILL BE HELD
    '''
    RID_TODAY = 201601020211
    # extract today race from web
    URL = 'http://race.netkeiba.com/?pid=race&id=c201601020211&mode=shutuba'
    ts.scraping(URL, str(RID_TODAY) + '.csv')

    # create df for training (all past race)
    df = pd.read_csv('./../Data/race_info.csv', header=None)
    dfs = de.create_merged_df(df[9])

    # start to analyze
    sum_list = predict_via_sgd(dfs,RID_TODAY)
    # predict iteratly
    for i in range(0, ITERATION-1):
        list = predict_via_sgd(dfs,RID_TODAY)
        sum_list = [x+y for (x, y) in zip(sum_list, list)]

    # circulate average
    list = map(lambda x: float(x) / ITERATION, sum_list)
    print list
