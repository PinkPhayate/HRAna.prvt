# coding: UTF-8
import pandas as pd
import csv
import urllib2
from bs4 import BeautifulSoup
import lxml
import evaluate_pred as ep

def get_race_list():
    df = pd.read_csv('./../Data/race_info.csv', header=None)
    years = df[9]
    return years.tolist()


def scraping(url, output_file):
    # read page source code
    f = open('./../Data/' + output_file, 'w')
    csvWriter = csv.writer(f)
    soup = BeautifulSoup(urllib2.urlopen(url), "lxml")
    table = soup.find(class_='db_main_race fc')

    # Extract status
    title = soup.find('h1')
    print title.text

    table = soup.find(class_='race_table_01 nk_tb_common')
    for tr in table.findAll('tr',''):
        list = []
        for td in tr.findAll('td',''):
            word = " ".join(td.text.rsplit())
            list.append( word.encode('utf-8') )
        # print list
        csvWriter.writerow(list)
    f.close()

def scrape_horse( hid ):
    # read page source code
    f = open('./../Data/horse/'+ hid + '.csv', 'w')
    csvWriter = csv.writer(f)
    url = 'http://db.netkeiba.com/horse/'+hid +'/'
    soup = BeautifulSoup(urllib2.urlopen(url), "lxml")
    table = soup.find(class_='db_main_race fc')
    for tr in table.findAll('tr',''):
        list = []
        for td in tr.findAll('td',''):
            list.append(td.string.encode('utf-8'))
        csvWriter.writerow(list)
    f.close()
