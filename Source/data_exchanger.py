# -*- coding: utf-8 -*-
import pandas as pd

# TODO: ダミー化
def _to_dummy(df):
    return df


# もっとスマートな表現があるはず・・・
def _to_list(res):
    df = pd.DataFrame([])
    for r in res:
        tmp = pd.DataFrame([r])
        df = pd.concat([df,tmp])
    return df

def beautify_data(res):
    tmp_df = _to_list(res)
    tmp_df = _to_dummy(tmp_df)
    return tmp_df
