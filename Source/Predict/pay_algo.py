# coding: UTF-8
import pandas as pd
import csv,re,json,itertools
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'

def collate_pred():
    f = open('./../../Result/sgd_default_prob.csv', 'r')
    dataReader = csv.reader(f)
    for row in dataReader:
        s = pd.Series(row)
        num, odds = get_valid_comb(s[0])

        balance = 0
        index = 0

        res = s[1:].astype(float)
        res = res[res > THRESHOLD]
        list = res.index
        print len(list)


        if len(list) > 1:
            l = list.tolist()
            for element in itertools.combinations(l, 2):
                index += 1
                comb = str(element[0]) + '-' + str(element[1])
                if comb in num:
                    balance += odds[num.index(comb)]
                    print GREEN + 'RETURN' + str( odds[num.index(comb)] ) + ENDC

        balance  -= index * 100
        print RED + 'TOTAL: ' + str(balance) + ENDC


def get_valid_comb(race_id):
    jf = open('./../../Data/odds_dict.json')
    data = json.load(jf, 'utf-8')
    dict = data[race_id]
    # d = dict[u'単勝']
    num = []
    odds = []
    if dict.has_key(u'ワイド'):
        d = dict[u'ワイド']
        num = d[u'num']
        num = num[0].split()
        # print num
        odds = d[u'odds']
        odds = odds.split()
        odds = map(lambda x: x.replace(',',''), odds)
        odds = map(int,odds)
        # print odds
    return num, odds


if __name__ == '__main__':
    collate_pred()
