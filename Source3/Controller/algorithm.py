from Model import res
import nosql_connector as nsc
import print_result as pr

THRESHOLD = 0.5
def get_bought_horse_no(predicts, threshold):
    buy_list = []
    for i,ev_value in enumerate(predicts):
        if ev_value > threshold:
            buy_list.append(i)
    return buy_list


def get_odds_dict(rid):
    nosql_connector = nsc.NOSQL_connector()
    odds = res.Rasult_Odds(rid=rid, nosql_connector=nosql_connector)
    dict = odds.odds_dict
    return dict

def select_horse_algo1(rid, predicts):
    """
    予測クラスターが1のもの(1~3位)にはいる可能性がある馬
    を全て買う
    """

    dict = get_odds_dict(rid)    # 買う馬の番号を取得

    buys = get_bought_horse_no(predicts, THRESHOLD)
    printer = pr.Printer(rid)
    # 単勝
    income = 0
    rtval = dict['単勝']
    print('actual : ' + str(rtval.keys[0]))
    print('predict: ' + str(buys))
    for no in buys:
        if no in rtval.keys:
            income += rtval[no]
            break
    printer.print_res('単勝', len(buys) * 100, income)

    # 複勝
    #
    # ワイド
    rtval = dict['ワイド']
    print('actual : ' + str(rtval))
    print('predict: ', end='')
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
