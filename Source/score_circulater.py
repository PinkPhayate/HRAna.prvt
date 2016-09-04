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

def circulate_score(history_dfs, race_id):
    '''
    circulate horse score
    @ param history_dfs -> all hoser's history data
    @ param race_id -> identify race number whether training/evaluate data.
    @ return -> score_df
    '''
    # # get hid_df used training or evaluate data
    # train_df = history_dfs[history_dfs['race_id'] != race_id]
    # evalt_df = history_dfs[history_dfs['race_id'] == race_id]
    # # circulate h_score
    # X = train_df[ALL_PARAMS]
    # y = train_df[['target']]
    # clf = SGDClassifier(loss="log", penalty="l2", class_weight="auto", n_iter=1000)
    # clf.fit(X, column_or_1d(y))
    # # predict by evalt_df
    # eX = evalt_df[ALL_PARAMS]
    # # ey = evalt_df[['target']]
    #
    #
    # predicts = clf.predict(X)
    # training_accuracy = accuracy_score(train_df[['target']], predicts.tolist())
    #
    # predicts = clf.predict(eX)
    # return predicts
