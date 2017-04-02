# -*- coding: utf-8 -*-
import csv
import score_circulater as sc
import sgd
import pandas as pd
from sklearn.linear_model import SGDClassifier
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import accuracy_score
from sklearn.utils import column_or_1d



TDY_PARAMS = ['frame', 'num', 'fav', 'rank', 'fld_stts1', 'fld_stts2', 'fld_cndt1', 'fld_cndt2', 'fld_cndt3', 'fld_cndt4']
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

    clf = SGDRegressor(alpha=0.001, n_iter=100).fit(X, column_or_1d(y))
    # training data accuracy
    # predicts = clf.predict(X)
    # training_accuracy = accuracy_score(history_dfs[['org_rank']], predicts.tolist())
    # print GREEN+str(training_accuracy)+ENDC

    # predict target data
    eX = predict_df[TDY_PARAMS]

    predicts = clf.predict(eX)


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
    # fdf = history_dfs.ix[:,0:3]
    # bdf = history_dfs.ix[:,6:]
    # df = pd.concat([fdf, bdf], axis=1)
        # org_rid = "201506050111"
        # get hid_df used training or evaluate data
    train_df = history_dfs[ history_dfs['org_rid'] != int(org_rid) ]
    evalt_df = history_dfs[ history_dfs['org_rid'] == int(org_rid) ]

    # train_df = train_df.dropna(axis=0)
    # fdf = train_df.ix[:,0:2]
    # bdf = train_df.ix[:,5:]
    # X = pd.concat([fdf, bdf], axis=1)

    X = train_df[ALL_PARAMS]
    y = train_df[['org_rank']]
    # import re
    # for i, row in X.iterrows():
    #     for i in row:
    #         try: int(i)
    #         except: print row
            # if not isinstance(i,int) and not isinstance(i,float):
            #     print type(i)
            #     print i

    clf = SGDRegressor(alpha=0.001, n_iter=100).fit(X, column_or_1d(y))
    # training data accuracy
    predicts = clf.predict(X)
    # training_accuracy = accuracy_score(train_df[['org_rank']], predicts.tolist())

    # predict target data
    eX = evalt_df[ALL_PARAMS]
    predicts = clf.predict(eX)
    # validation_accuracy = accuracy_score(evalt_df[['org_rank']], predicts.tolist())

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
