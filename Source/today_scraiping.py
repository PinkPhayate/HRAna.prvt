import pandas as pd
import csv, re
import urllib2
from bs4 import BeautifulSoup
import lxml

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


def scraping(url, output_file):
    # read page source code
    f = open('./../Data/' + output_file, 'w')
    csvWriter = csv.writer(f)


    soup = BeautifulSoup(urllib2.urlopen(url), "lxml")
    # Extract status
    # title = soup.find('h1')
    # print title.text

    table = soup.find(class_='race_table_01 nk_tb_common shutuba_table')
    for tr in table.findAll('tr',''):
        list = []
        for td in tr.findAll('td',''):
            word = " ".join(td.text.rsplit())
            list.append( word.encode('utf-8') )
        csvWriter.writerow(list)

if __name__ == '__main__':
    output_file = '201601020211.csv'
    url = 'http://http://race.netkeiba.com/?pid=race&id=c201601020511&mode=shutuba'
    scraping(url, output_file=output_file)
