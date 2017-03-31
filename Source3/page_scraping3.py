import csv, re, json, lxml
import pandas as pd
from bs4 import BeautifulSoup
import urllib.request
def scrape_race_info(url, output_file):
    # read page source code
    f = open('./../Data/Race/' + output_file, 'w')
    csvWriter = csv.writer(f)
    soup = BeautifulSoup(urllib.request.urlopen(url), "lxml")
    # Extract status
    title = soup.find('h1')
    print( title.text )
    hid_list = []
    table = soup.find(class_='race_table_01 nk_tb_common')
    for tr in table.findAll('tr',''):
        list = []
        for td in tr.findAll('td',''):
            # get house status
            word = " ".join(td.text.rsplit())
            list.append( word.encode('utf-8') )

            # get hid
            for link in td.findAll('a'):
                # if 'href' in link.attrs:
                url = link.attrs['href']
                if "/horse/" in link.attrs['href']: # if horse instead of /horse/, cannot point at only hid
                    tmp = url.split('/')
                    list.append(tmp[2])
                    hid_list.append(tmp[2])


        csvWriter.writerow(list)
    f.close()
    return hid_list

def scrape_res(url, output_file):
    # read page source code
    f = open('./../Data/Result/res_'+ output_file, 'w')
    csvWriter = csv.writer(f)
    soup = BeautifulSoup(urllib.request.urlopen(url), "lxml")

    table = soup.find(class_='pay_block')
    for tr in table.findAll('tr',''):
        list = []
        th = tr.find('th').string
        list.append(th.encode('utf-8'))
        for td in tr.findAll('td',''):
            if td.string == None:
                td = td.get_text(separator=' ')
                # print td.encode('utf-8')
                list.append(td.encode('utf-8'))
            else:
                # print(td.string.encode('utf-8'))
                list.append(td.string.encode('utf-8'))
        csvWriter.writerow(list)
    f.close()

def scrape_rid():
    '''
    1. read page source
    2. scrape rid (race id)
    return -> race_id list
    '''
    # source = './../Resource/stayers'    # must get this page source by hand
    source = './../Resource/race_history'    # must get this page source by hand
    soup = BeautifulSoup(open(source), "lxml")
    table = soup.find("table", attrs = {"class": "nk_tb_common race_table_01"})
    list = []
    # limitter for 10 years
    for tr in table.findAll('tr'):
        if len(list) > 12:
            break

        for td in tr.findAll("td", attrs = {"class": "txt_l"}):
            # links = td.find_all('a')
            for link in td.findAll('a'):
                # if 'href' in link.attrs:
                url = link.attrs['href']
                if "race" in link.attrs['href']:
                    tmp = url.split('/')
                    list.append(tmp[4])

    with open('./../Resource/rid_list.csv', 'w') as f:
        writer = csv.writer(f, lineterminator='\n')
        writer.writerow(list)
    return list


def scrape_race_odds(years):
    odds_dict = {}
    for year in years:
        y = str(year)
        output_file = y + '.csv'
        f = open('./../Data/Result/res_'+ output_file, 'rb')
        dataReader = csv.reader(f)
        dict = {}
        for row in dataReader:
            odds = row[2]
            if ' ' in odds:
                odds = odds.split('　')
            num = row[1].replace('→','-')
            num = num.replace(' - ','-')
            if ' ' in num:
                num = num.split('　')
            dict[row[0]] = {'num':num,'odds': row[2]}

        odds_dict[y] = dict
    f = open("./../Data/odds_dict.json", "w")
    json.dump(odds_dict, f, ensure_ascii=False)
    f.close()

def scrape_horse_history(hid):
    print( hid )
    f = open('./../Data/Horse/'+ hid + '.csv', 'w')
    csvWriter = csv.writer(f)
    url = 'http://db.netkeiba.com/horse/' + hid + '/'
    # soup = BeautifulSoup(urllib2.urlopen(url), "html")
    # soup = soup.encode('utf-8')
    soup = BeautifulSoup(urllib.request.urlopen(url), "lxml")
    soup.prettify(formatter=lambda s: s.replace(u'\xa0', 'None'))
    history_df = pd.DataFrame([])

    table = soup.find("table", attrs = {"class": "db_h_race_results nk_tb_common"})
    # history_df = pd.DataFrame([])
    # tablr = table.encode('utf-8')
    for tr in table.findAll('tr'):
        list = []
        flg = True
        for td in tr.findAll("td"):
            word = " ".join(td.text.rsplit())
            list.append( word.encode('utf-8') )

        csvWriter.writerow(list)
    f.close()
    # return history_df.T    # return list
def scrape_rid():
    '''
    1. read page source
    2. scrape rid (race id)
    return -> race_id list
    '''
    # source = './../Resource/stayers'    # must get this page source by hand
    source = './../Resource/race-history.html'    # must get this page source by hand
    soup = BeautifulSoup(open(source, encoding='eucjp'), "lxml")
    table = soup.find("table", attrs = {"class": "nk_tb_common race_table_01"})
    list = []
    # limitter for 10 years
    for tr in table.findAll('tr'):
        if len(list) > 12:
            break

        for td in tr.findAll("td", attrs = {"class": "txt_l"}):
            # links = td.find_all('a')
            for link in td.findAll('a'):
                # if 'href' in link.attrs:
                url = link.attrs['href']
                if "race" in link.attrs['href']:
                    tmp = url.split('/')
                    list.append(tmp[4])

    with open('./../Resource/rid_list.csv', 'w') as f:
        writer = csv.writer(f, lineterminator='\n')
        writer.writerow(list)
    return list

def main():
    rids = scrape_rid()
    hid_list = []

    for year in rids:
        # url -> http://db.netkeiba.com/race/201501020211/
        url = 'http://db.netkeiba.com/race/' + year + '/'
        output_file = year + '.csv'
        # scrape RACE data
        old_rids = scrape_race_info(url, output_file)

        for old_rid in old_rids:
            scrape_horse_history(old_rid)
        # hid_list.extend(list)

        # scrape RATE data
        scrape_res(url, output_file)

    # normalize rate data
    scrape_race_odds(rids)
if __name__ == '__main__':
    main()
