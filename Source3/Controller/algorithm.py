from Model import res
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

    printer = print_result.Printer(rid)
    # 単勝
    income = 0
    for no in buys:
        if no in odds.rval1.keys:
            income += odds.rval1[no]
            break
    printer.print_res(outcome, income)
    outcome = len(buys) * 100
    output_result(rid, income, outcome)

    # 複勝
    # ワイド
    # 三連複
