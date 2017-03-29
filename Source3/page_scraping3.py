import csv
from bs4 import BeautifulSoup
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

scrape_rid()
