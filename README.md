# HorceRacingAnalistic

This reposutory works to get data from netkeiba.com(http://db.netkeiba.com/)
I'm trying to analyze race data bia SVM.

## How to get source code about race history

1. Open firefox and search 'http://db.netkeiba.com/'
2. save source file via "Ctrl + s"

## How to use

1. save page source code and put Resource repositry

  + page -> print race history

2. execute page_scraiping.py

  + scrape RACE data
  + scrape RATE data
  + normalize rate data
  + require WiFi


3. execute model_training.py

  + merge saved all RACE data
  + evaluate about model by simulator

4. save page source code and put Resource repository

5. execute today_scraiping.py

  + change to variable named 'year'
  + require WiFi

6. execute today_predicting.py

  + change file name of status information about target race
  + execute in terminal



## Required

  + module named 'Figlet'  (https://github.com/pwaller/pyfiglet)


## Algorithm
  + predicting via status -> SGDClassification
  + circulate score via history -> SGDRegressor


## 当日のレースで取得できる情報
  + 枠番  frame
  + 馬番  num
  + 性別  [f. m. g]
  + 年齢  age
  + 体重  whgt
  + 増減  [zr, pl, mi]
  + オッズ odds
  + 人気  fav
  