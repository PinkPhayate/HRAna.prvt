# coding: UTF-8
import pandas as pd
import csv,re,json

def collate_pred():
    f = open('./../../Result/sgd_default_prob.csv', 'r')
        dataReader = csv.reader(f)
            for row in dataReader:
                    s = pd.Series(row)
                            race_id = s[0]

                                    jf = open('./../../Data/odds_dict.json')
                                            data = json.load(jf, 'utf-8')
                                                    dict = data[race_id]
                                                            # d = dict[u'単勝']
                                                                    if dict.has_key(u'ワイド'):
                                                                                d = dict[u'ワイド']
                                                                                            num = d[u'num']
                                                                                                        num = num[0].split()
                                                                                                                    print num
                                                                                                                                odds = d[u'odds']
                                                                                                                                            odds = odds.split()
                                                                                                                                                        odds = map(lambda x: x.replace(',',''), odds)
                                                                                                                                                                    print int(odds[2])

