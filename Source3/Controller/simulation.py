import copy
from Controller import algorithm as algo
from Model import race
from Controller import calculator
import nosql_connector as nsc
import pandas as pd
from mysql_connector import MYSQL_connector

class Race_simulation (object):
    def __init__(self, rids, race_models):
        """
        @param rids: list(str)
        @param race_models: list(Race)
        """
        self.rids = rids
        self.number_of_race = len(race_models)
        self.race_models = race_models
        self.race_name = None
        self.analyze_id = None
        self.SELECT_CNDT = 5

    def set_aid(self, aid):
        self.analyze_id = aid

    def find_training_models(self, predict_rid: str):
        models = copy.deepcopy(self.race_models)
        for i, model in enumerate(models):
            rid = model.rid
            if int(predict_rid) == rid:
                del models[i]
                return models
        error_message = 'cant find training race model in all models.' \
                        'predict_rid= ' + predict_rid
        print(error_message)
        return None

    def find_predict_models(self, predict_rid: str):
        models = []
        # models = copy.deepcopy(self.race_models)
        for i, model in enumerate(self.race_models):
            rid = model.rid
            if int(predict_rid) == rid:
                models.append(model)
        if len(models) > 0:
            return models
        error_message = 'cant find predict race model in all models.' \
                        'predict_rid= ' + predict_rid
        print(error_message)
        return None

    def merge_df(self):
        df = pd.DataFrame([])
        for race_model in self.race_models:
            tmp_df = race_model.get_df()
            df = pd.DataFrame([df, tmp_df])
        return df

    def get_trainingrids(self):
        # todo implement¡
        print()

    def get_trainig_df(self):
        # to implement
        print()

    def get_df(self, models):
        df = pd.DataFrame([])
        for model in models:
            df = pd.concat([df, model.df])
        return df

    def get_history_df(self, models):
        df = pd.DataFrame([])
        for model in models:
            df = pd.concat([df, model.dummy_df])
        return df

    def simulate(self):
        for rid in self.rids:
            # get target model
            predict_models = self.find_predict_models(rid)
            predict_df = self.get_df(predict_models)
            # get trainig_model
            training_models = self.find_training_models(rid)
            training_df = self.get_df(training_models)
            if predict_models is not None and training_models is not None:
                calculator.execute_simulation(training_df, predict_df)
            else:
                print('models has something wrong.')

    def formalize_dummy(self):
        df = self.get_df(models=self.models)
        df = df.reset_index(drop=True)
        dummy_df = pd.get_dummies(df[['urid']], drop_first=True)
        df = pd.concat([df, dummy_df], axis=1)

    def set_race_name(self, race_name):
        self.race_name = race_name

    def simulate_history(self):
        detail_df = pd.DataFrame([])
        report_df = pd.DataFrame([])
        for rmodel in self.race_models:
            rid = rmodel.rid
            print('target race: ' + str(rid))
            # get target model
            predict_models = self.find_predict_models(rid)
            predict_df = self.get_history_df(predict_models)
            predict_df.reset_index(drop=True, inplace=True)
            # get trainig_model
            training_models = self.find_training_models(rid)
            training_df = self.get_history_df(training_models)
            training_df.reset_index(drop=True, inplace=True)
            if predict_models is not None and training_models is not None:
                logging_df = calculator.execute_simulation(training_df, predict_df)
                # for debug
                detail_df = pd.concat([detail_df, logging_df], axis=1)
                tmp = rmodel.history_df.reset_index(drop=True)
                detail_df = pd.concat([detail_df, tmp], axis=1)
                # tmp = rmodel.df.reset_index(drop=True)
                analyzed_df = pd.concat([logging_df[['pred']], tmp], axis=1)
                self.add_analyze_db(analyzed_df)

                sorted_result = calculator.evaluate_average(logging_df)

                print(sorted_result)
                sorted_result = sorted_result.reset_index(drop=True)
                report_df = pd.concat([report_df, sorted_result], axis=1)
                rmodel.set__ranked_pred(sorted_result)
            else:
                print('models has something wrong.')
        detail_df.to_csv('./../Result/'+self.race_name+'detail-report-'\
                                                    + str(self.analyze_id)+'.csv')
        report_df.to_csv('./../Result/'+self.race_name+'result-report-'\
                                                    + str(self.analyze_id)+'.csv')

    def simulate_today_history(self, today_race_id):
        detail_df = pd.DataFrame([])
        report_df = pd.DataFrame([])

        # get target model
        predict_model = self.find_predict_models(today_race_id)
        predict_df = self.get_history_df(predict_model)
        predict_df.reset_index(drop=True, inplace=True)

        # get trainig_model
        training_models = self.find_training_models(today_race_id)
        training_df = self.get_history_df(training_models)
        training_df.reset_index(drop=True, inplace=True)
        if predict_model is not None and training_models is not None:
            logging_df = calculator.execute_simulation(training_df, predict_df)

            # for debug
            detail_df = pd.concat([detail_df, logging_df], axis=1)
            tmp = predict_model[0].history_df.reset_index(drop=True)
            detail_df = pd.concat([detail_df, tmp], axis=1)
            # tmp = rmodel.df.reset_index(drop=True)
            analyzed_df = pd.concat([logging_df[['pred']], tmp], axis=1)
            self.add_analyze_db(analyzed_df)

            sorted_result = calculator.evaluate_average(logging_df)

            print(sorted_result)
            sorted_result = sorted_result.reset_index(drop=True)
            report_df = pd.concat([report_df, sorted_result], axis=1)
            predict_model.set__ranked_pred(sorted_result)
            # predict_model[0].set_ranked_pred(report_df)
        else:
            print('models has something wrong.')
        detail_df.to_csv('./../Result/'+self.race_name+'detail-report-'
                                                    + str(self.analyze_id)+'.csv')
        report_df.to_csv('./../Result/'+self.race_name+'result-report-'
                                                    + str(self.analyze_id)+'.csv')

    def add_analyze_db(self, df):
        detail_df = df.copy()
        detail_df.loc[:, 'aid'] = int(self.analyze_id)
        detail_df['race_id'] = detail_df['race_id'].apply(lambda x: str(x))
        detail_df['rid'] = detail_df['rid'].apply(lambda x: str(x))
        mysql_conn = MYSQL_connector()
        mysql_conn.insert_db(detail_df)

    def evaluate_prediction(self):
        for rmodel in self.race_models:
            pred_df = rmodel.merge_fav()
            __odds_dict = self.__select_odds(rmodel)
            if pred_df is None and __odds_dict is None:
                print('race (id: ' + str(rmodel.id) + ') couldnt get odds')
            else:
                pred_df = pred_df[pred_df['rank'] < self.SELECT_CNDT]
                selected_hourses = pred_df[0 < pred_df['rank']]
                li = selected_hourses[['no']].to_list()
                self.__get_race_odds(li)

    def __get_race_odds(self, li):
        import itertools
        rtval = self.__set_result_odds()
        if rtval is None:
            return
        __income, __collect = 0, 0
        for element in itertools.permutations(li, 2):
            i = element.sorted[0]
            j = element.sorted[1]
            string = i+'-'+j
            if string in rtval[0]:
                index = rtval[0].count(string)
                __income += int(rtval[1][index])
                __collect += 1
        print('number of collect pair: ' + __collect)
        print('get return value: '+__income)

    def __select_odds(self, rmodel):
        odds_dict = rmodel.get__odds_dict()
        if odds_dict is not None:
            return odds_dict['ワイド']
        return None
