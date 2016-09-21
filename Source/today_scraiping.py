from bs4 import BeautifulSoup
import page_scraping as ps
from Library import view_operation as view
import csv, lxml, urllib2

def scraping(url, output_file):
    # read page source code
    f = open('./../Data/' + output_file, 'w')
    csvWriter = csv.writer(f)


    soup = BeautifulSoup(urllib2.urlopen(url), "lxml")
    # Extract status
    # title = soup.find('h1')
    # print title.text

    table = soup.find(class_='race_table_01 nk_tb_common shutuba_table')
    hid_list = []
    for tr in table.findAll('tr',''):
        list = []
        for td in tr.findAll('td',''):
            word = " ".join(td.text.rsplit())
            list.append( word.encode('utf-8') )

            # get hid only MAIN horse
            for link in td.findAll('a'):
                if 'target' not in link.attrs:  # if not MAIN horse, it doesn't have taget attribute.
                    break
                url = link.attrs['href']
                if "/horse/" in url: # if horse instead of /horse/, cannot point at only hid
                    tmp = url.split('/')
                    list.append(tmp[4])
                    hid_list.append(tmp[4])

        csvWriter.writerow(list)
    return hid_list

if __name__ == '__main__':
    # url -> http://race.netkeiba.com/?pid=race&id=c201609040211&mode=shutuba

    view.draw_title(version='1.1.0')
    view.draw_race_title("Stayer's Stakes")

    year = 201609040211
    url = 'http://race.netkeiba.com/?pid=race&id=c'+str(year)+'&mode=shutuba'
    output_file = str(year) + '.csv'
    # scrape RACE data
    hid_list = scraping(url, output_file=output_file)

    for hid in hid_list:
        ps.scrape_horse_history(hid)
