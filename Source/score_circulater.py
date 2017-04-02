# -*- coding: utf-8 -*-
import csv
import score_circulater as sc
import sgd
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import accuracy_score
from sklearn.utils import column_or_1d


TDY_PARAMS = ["frame", "num", "odds", "fav", "age", "f", "m", "g", 'zr', 'pl', 'mi', 'wght']
# TDY_PARAMS = ['frame', 'num', 'fav', 'rank', 'fld_stts1', 'fld_stts2', 'fld_cndt1', 'fld_cndt2', 'fld_cndt3', 'fld_cndt4']
ALL_PARAMS = ['frame', 'num', 'fav', 'rank', 'org_rank', 'fld_stts1', 'fld_stts2', 'fld_stts3', 'fld_cndt1', 'fld_cndt2', 'fld_cndt3', 'fld_cndt4']
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'
def circulate_today_score(history_dfs, predict_df):
    '''
    circulate horse score
    @ param history_dfs -> all hoser's history data
    @ param race_id -> identify race number whether training/evaluate data.
    @ return -> score_df
    '''
    # train_df = history_dfs[ history_dfs['org_rid'] != int(org_rid) ]
    # evalt_df = history_dfs[ history_dfs['org_rid'] == int(org_rid) ]


    X = history_dfs[TDY_PARAMS]
    y = history_dfs[['org_rank']]

    model = RandomForestRegressor()
    model.fit(X, column_or_1d(y))

    predicts = model.predict(eX)


    # script to circulate average
    hids = predict_df['hid']
    hid=0
    counter=0
    sum=0.0
    list = []
    for i,j in zip(hids, predicts):
        # print hid,i
        if hid!=i and hid!=0:
            ave = sum/counter
            list.append(ave)
            counter=0
            sum=0.0
        hid=i
        sum += j
        counter+=1
    ave = sum/counter
    list.append(ave)

    return list
    # print pd.concat([eX, pred_df], axis=1)

    # validation_accuracy = accuracy_score(evalt_df[['org_rank']], predicts.tolist())

    # print predicts
    # return clf



def circulate_score(history_dfs, org_rid):
    '''
    circulate horse score
    @ param history_dfs -> all hoser's history data
    @ param race_id -> identify race number whether training/evaluate data.
    @ return -> score_df
    '''
    train_df = history_dfs[ history_dfs['org_rid'] != int(org_rid) ]
    evalt_df = history_dfs[ history_dfs['org_rid'] == int(org_rid) ]

    X = train_df[ALL_PARAMS]
    y = train_df[['org_rank']]

    model = RandomForestRegressor()
    model.fit(X, column_or_1d(y))

    # predict target data
    eX = evalt_df[ALL_PARAMS]
    predicts = model.predict(eX)

    # script to circulate average
    hids = evalt_df['hid']
    hid=0
    counter=0
    sum=0.0
    list = []
    for i,j in zip(hids, predicts):
        # print hid,i
        if hid!=i and hid!=0:
            ave = sum/counter
            list.append(ave)
            counter=0
            sum=0.0
        hid=i
        sum += j
        counter+=1
    ave = sum/counter
    list.append(ave)

    return list
