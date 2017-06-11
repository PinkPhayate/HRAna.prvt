import nosql_connector as nsc

class Rasult_Odds(object):
    def __init__(self, rid, nosql_connector):
        # nosql_connector = nsc.NOSQL_connector()
        odds_dict = nosql_connector.get_race_result_return(rid)

        array = odds_dict['単勝']
        self.rval1[array[0]] = int(array[1])

        array = odds_dict['複勝']
        self._set_rval_dict(array)

        array = odds_dict['枠連']
        self.rval3[array[0]] = int(array[1])

        array = odds_dict['馬連']
        self.rval4[array[0]] = int(array[1])

        array = odds_dict['馬単']
        self.rval5[array[0]] = int(array[1])

        array = odds_dict['ワイド']
        self._set_rval_dict(array)

        array = odds_dict['三連複']
        self.rval7[array[0]] = int(array[1])

        array = odds_dict['三連単']
        self.rval8[array[0]] = int(array[1])

    def _set_rval2_dict(self, array):
        keys = array[0]
        values = array[1]
        favs = array[2]

        it = min(len(keys), len(values))

        self.rval2 = {}
        for idx in range(0, it):
            self.rval2[keys[idx]] = values[idx]

    def _set_rval_dict(self, array):
        keys = array[0]
        values = array[1]
        favs = array[2]

        it = min(len(keys), len(values))

        self.rval2 = {}
        for idx in range(0, it):
            self.rval2[keys[idx]] = values[idx]

"""
{
{'単勝': ['4', '230', '1']},
{'複勝': [['4', '5', '18'], ['140', '210', '660'], ['1', '2', '11']]},
{'枠連': ['2-3', '460', '1']},
{'馬連': ['4-5', '940', '1']},
{'馬単': ['4-5', '1,470', '1']},
{'ワイド': [['4-5', '4-18', '5-18'], ['430', '1,990', '3,520'], ['1', '22', '43']]},
{'三連複': ['4-5-18', '11,190', '32']},
{'三連単': ['4-5-18', '33,030', '78'], }}
"""
