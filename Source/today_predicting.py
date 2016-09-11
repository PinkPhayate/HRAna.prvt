import pandas as pd
from bs4 import BeautifulSoup
import page_scraping as ps
import csv, re, lxml, urllib2

def create_merged_df(rid):
    d = pd.read_csv('./../Data/' + str(rid) + '.csv', header=None)
    position_df = d.ix[:,0:1]

    # get 'sex' and 'age'
    # status_df = d.ix[:,6:6]
    status_df = d.ix[:,7:7]
    sa = status_df.apply(lambda x: str(x).split(' '), axis=1)
    sa = sa.apply(lambda x: x[4].split('/'))
    sa = sa.apply(lambda x: x[0])


    # get 'fav' and 'odds'
    fav = d.ix[:,8:8]
    of = fav.apply(lambda x: str(x).split(' '), axis=1)
    odds = of.apply(lambda x: x[4])
    fav = of.apply(lambda x: re.findall('\d+', x[5])[0] )
    fav = pd.concat([odds, fav], axis=1)

    df = pd.concat([position_df, sa, fav], axis=1)
    df.columns = ['frame', 'num','sexAge','odds','fav']

    df[['sex', 'age']] = df['sexAge'].str.extract('(.)(\d+)')
    dum = pd.get_dummies(df["sex"])
    size = dum.size/len(dum)
    if size == 2:
        dum.columns = ['f','m']
        df = pd.concat([df, dum], axis=1)
        df = df.drop("sex", axis=1)
        df['g'] = 0
    elif size == 3:
        dum.columns = ['f','m','g']
        df = pd.concat([df, dum], axis=1)
        df = df.drop("sex", axis=1)
    else:
        df = pd.concat([df, dum], axis=1)
    df = df.drop("sexAge", axis=1)
    return df


rid = 201609040211
df = create_merged_df(rid)
