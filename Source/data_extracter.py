# -*- coding: utf-8 -*-
import pandas as pd
import page_scraping as ps
import re

def create_merged_df(years):
    df = pd.DataFrame([])
    for race_id in years:
        d = pd.read_csv('./../Data/Race/' + str(race_id) + '.csv', header=None)
        d = d.ix[:,:15]
        d['race_id'] = race_id
        df = pd.concat([df, d], axis=0)

    df.columns = ['rank', 'frame', 'num', 'name', 'hid', 'sexAge', 'hande', 'jockey', 'time', 'diff', 'time_index', 'path', 'last', 'odds', 'fav', 'w', 'race_id']
    df[['sex', 'age']] = df['sexAge'].str.extract('(.)([1-9]+)')
    df[['wght','gl', 'qntty']] = df['w'].str.extract('([\d]{3})\((.?)([\d]+)\)')
    df = df[['rank', 'frame', 'num', 'sex', 'age', 'odds', 'fav', 'wght', 'gl', 'qntty', 'hid', 'race_id']]


    dum = pd.get_dummies(df["sex"])
    size = dum.size/len(dum)
    if size == 2:
        dum.columns = ['f','m']
        df = pd.concat([df, dum], axis=1)
        df = df.drop("sex", axis=1)
    elif size == 3:
        dum.columns = ['f','m','g']
        df = pd.concat([df, dum], axis=1)
        df = df.drop("sex", axis=1)
    else:
        df = pd.concat([df, dum], axis=1)

    dum = pd.get_dummies(df["gl"])
    df = pd.concat([df, dum], axis=1)
    df = df.drop("gl", axis=1)

    # classify
    pos_df = df[df['rank'] < 4]
    pos_df['target'] = 1
    neg_df = df[df['rank'] > 3]
    neg_df['target'] = 0
    df = pd.concat([pos_df, neg_df], axis=0)
    df.columns = ['rank', 'frame', 'num', 'age', 'odds', 'fav', 'wght', 'qntty', 'hid', 'race_id' , 'f', 'm', 'g', 'zr', 'pl', 'mi', 'target']
    df = df.dropna(axis=0)
    return df
    # ALL_PARAMS = ['frame', 'num','age','odds','fav','f','m','g', 'target']
    # return df[ALL_PARAMS]

def create_history_df(hid_dfs):
    '''
        hid_dfs = dfs[['race_id', 'hid', 'rank']]
    '''
    history_df = pd.DataFrame([])
    for hid_ser in hid_dfs:

        # horse history
        df = ps.scrape_horse_history("12345")
        df = df.ix[:,[0,4,7]]
        # translate date which enable to compare    ex) 2015/11/11 -> 20151111
        days = df.apply(lambda x: x[0].translate(None, "/"), axis=1)
        df = df.ix[:,1:]
        df = pd.concat([df, days], axis=1)
        history_df = pd.concat([history_df, df], axis=0)


        print df
        history_df = history_df.append(df)
    hid_dfs = pd.merge(hid_dfs, history_df, on='hid')

    return hid_dfs
