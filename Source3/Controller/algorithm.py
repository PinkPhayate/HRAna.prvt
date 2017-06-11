from Model import res
import nosql_connector as nsc
import print_result

THRESHOLD = 0.5
def get_bought_horse_id(predicts, threshold):
    buy_list = []
    for i,ev_value in enumerate(predicts):
        if ev_value > threshold:
            buy_list.append(i)
    return buy_list

"""
予測クラスターが1のもの(1~3位)にはいる可能性がある馬
を全て買う
"""
def select_horse_algo1(rid, predicts):
    buys = get_bought_horse_id(predicts, THRESHOLD)
    nosql_connector = nsc.NOSQL_connector()
    odds = res.Rasult_Odds(rid=rid, nosql_connector=nosql_connector)
    dict = odds.odds_dict

    printer = print_result.Printer(rid)
    # 単勝
    income = 0
    rtval = dict['単勝']
    print('right: ' + str(rtval.keys[0]))
    print('pay: ' + str(buys))
    for no in buys:
        if no in rtval.keys:
            income += rtval[no]
            break
    printer.print_res('単勝', len(buys) * 100, income)

    # 複勝
    #
    # ワイド
    rtval = dict['ワイド']
    print('right: ' + str(rtval))
    print('buy: ', end='')
    print(list(itertools.combinations(buys, 2)))
    for element in itertools.combinations(buys, 2):
        i = element.sorted[0]
        j = element.sorted[1]
        string = i+'-'+j
        if string in rtval.keys:
            income += rtval[string]
            print('get return value: '+income)
    printer.print_res('ワイド', len(buys) * 100, income)
    # 三連複
