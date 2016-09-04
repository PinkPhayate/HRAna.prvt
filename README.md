# HorceRacingAnalistic

This reposutory works to get data from netkeiba.com(http://db.netkeiba.com/)
I'm trying to analyze race data bia SVM.

## How to get source about race history

1. Open firefox and search 'http://db.netkeiba.com/'
2. save source file via "Ctrl + s"

## How to use

1. save page source code and put Resource repositry

  + page -> print race history

2. execute page_scraiping.py

  + scrape RACE data
  + scrape RATE data
  + normalize rate data


3. execute model_training.py

  + merge saved all RACE data
  + evaluate about model by simulator
