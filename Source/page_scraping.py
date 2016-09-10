# coding: UTF-8
from bs4 import BeautifulSoup
import csv, re, json, urllib2, lxml

def scrape_race_info(url, output_file):
    # read page source code
    f = open('./../Data/Race/' + output_file, 'w')
    csvWriter = csv.writer(f)
    soup = BeautifulSoup(urllib2.urlopen(url), "lxml")
    # Extract status
    title = soup.find('h1')
    print title.text

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


        csvWriter.writerow(list)
    f.close()

def scrape_res(url, output_file):
    # read page source code
    f = open('./../Data/Result/res_'+ output_file, 'w')
    csvWriter = csv.writer(f)
    soup = BeautifulSoup(urllib2.urlopen(url), "lxml")

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
    source = './../Resource/cent'    # must get this page source by hand
    soup = BeautifulSoup(open(source), "lxml")
    table = soup.find("table", attrs = {"class": "nk_tb_common race_table_01"})
    list = []
    for tr in table.findAll('tr'):
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
    # hid = '2011104344'
    url = 'http://db.netkeiba.com/horse/' + hid + '/'
    soup = BeautifulSoup(urllib2.urlopen(url), "lxml")

    table = soup.find("table", attrs = {"class": "db_h_race_results nk_tb_common"})
    history_list = []
    for tr in table.findAll('tr'):
        list = []
        for td in tr.findAll("td"):

            # get race id
            for link in td.findAll('a'):
                url = link.attrs['href']
                if "race" in link.attrs['href']:
                    tmp = url.split('/')
                    list.append(tmp[2])
            # get status
            td = td.get_text(separator=' ')
            # print td
            list.append(td.encode('utf-8'))

        if len(list) > 0:
            history_list.append(list)
    print history_list[0]
    return list

if __name__ == '__main__':
    # scrape_horse_history('2011104344')
    '''
    This program works for getting information about each registered horses in each year.
    crawle each page about race.
    '''
    # get race id
    rids = scrape_rid()

    for year in rids:
        # year = str(year)
        # url -> http://db.netkeiba.com/race/201501020211/
        url = 'http://db.netkeiba.com/race/' + year + '/'
        output_file = year + '.csv'
        # scrape RACE data
        html_doc = scrape_race_info(url, output_file)

        # scrape RATE data
        res_doc = scrape_res(url, output_file)

    # normalize rate data
    scrape_race_odds(rids)
