# -*- coding: utf-8 -*-
import data_extracter as de
import csv
from Simulation import pay_algo as pay
import score_circulater as sc
import sgd
import pandas as pd
from sklearn.linear_model import SGDClassifier
from sklearn.linear_model import SGDRegressor
from sklearn.metrics import accuracy_score
from sklearn.utils import column_or_1d



ALL_PARAMS = ['frame', 'num', 'fav', 'rank', 'org_rank', 'fld_stts1', 'fld_stts2', 'fld_stts3', 'fld_cndt1', 'fld_cndt2', 'fld_cndt3', 'fld_cndt4']
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'

# def predict_via_sgd(dfs, race_id):
#         evalt_df = dfs[dfs['race_id'] == race_id]
#         train_df = dfs[dfs['race_id'] != race_id]
#
#         # train_df = oversampling(train_df)
#
#         X = train_df[ALL_PARAMS]
#         y = train_df[['target']]
#
#         clf = SGDClassifier(loss="log", penalty="l2", class_weight="auto", n_iter=1000)
#
#         clf.fit(X, column_or_1d(y))
#
#         eX = evalt_df[ALL_PARAMS]
#         # ey = evalt_df[['target']]
#
#
#         predicts = clf.predict(X)
#         training_accuracy = accuracy_score(train_df[['target']], predicts.tolist())
#
#         predicts = clf.predict(eX)
#         validation_accuracy = accuracy_score(evalt_df[['target']], predicts.tolist())
#         # print predicts
#         return predicts.tolist(), training_accuracy, validation_accuracy

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

    print predicts
    return clf
    # print evalt_df[['org_rank']]
    # return predicts.tolist(), training_accuracy, validation_accuracy
    # print training_accuracy, validation_accuracy
