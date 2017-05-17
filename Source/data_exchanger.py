# -*- coding: utf-8 -*-
import pandas as pd
FIELD_LIST = ['良','稍','不','重']
COLUMNS = ['uid','date','whether','race','race_name1','race_id1','all','frame','no','odds','fav','rank','jockey','hande','course','course_status','distance','hid']



# もっとスマートな表現があるはず・・・
def _to_list(res):
    df = pd.DataFrame([])
    for r in res:
        tmp = pd.DataFrame([r])
        df = pd.concat([df,tmp])
    return df


def _add_columns(tmp_df):
    tmp_df.columns = COLUMNS
    return tmp_df


def beautify_data(res):
    tmp_df = _to_list(res)
    tmp_df = _add_columns(tmp_df)
    tmp_df = _to_dummy(tmp_df)
    return tmp_df


def _to_dummy(df):
    dmy1 = _convert_course_status2dummy(df['course'])
    dmy2 = _add_columns_ft(df['course_status'])
    df = pd.concat([df, dmy1, dmy2],axis=1)s

    return df

#  convert field status
def _convert_course_status2dummy(d):
    [_validate_course(x) for x in d]
    dmy = pd.get_dummies(d)
    k = len(FIELD_LIST)-len(dmy.columns)
    for i in range(k):
        dmy = add_columns_fs(dmy)
    return dmy

def _add_columns_fs(dmy):
    if '良' not in dmy.columns:
        dmy['良'] = 0.0
    if '稍' not in dmy.columns:
        dmy['稍'] = 0.0
    if '不' not in dmy.columns:
        dmy['不'] = 0.0
    if '重' not in dmy.columns:
        dmy['重'] = 0.0
    return dmy

def _add_columns_ft(dmy):
    if 'ダ' not in dmy.columns:
        dmy['ダ'] = 0.0
    if '芝' not in dmy.columns:
        dmy['芝'] = 0.0
    return dmy

def _validate_course(e):
    if e == '良':
        return '0'
    elif e == '稍':
        return '1'
    elif e == '不':
        return '2'
    elif e == '重':
        return '3'
    else :
        print (' ==========unexpected field status==========: ' + e)
        return '4'

# @FOR TEST
# filename = './../DATA/Horse/2012103129.csv'
# beautify_df(filename)
