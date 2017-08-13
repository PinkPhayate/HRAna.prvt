import copy
from Controller import algorithm as algo
from Model import race
from Controller import calculator
import pandas as pd


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
        for rid in self.rids:
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
                # logging_df.to_csv('./../Result/'+str(rid) + '.csv')
                detail_df = pd.concat([detail_df, logging_df], axis=1)

                sorted_result = calculator.evaluate_average(logging_df)

                print(sorted_result)
                sorted_result = sorted_result.reset_index(drop=True)
                report_df = pd.concat([report_df, sorted_result], axis=1)
            else:
                print('models has something wrong.')
        detail_df.to_csv('./../Result/'+self.race_name+'detail-report.csv')
        report_df.to_csv('./../Result/'+self.race_name+'result-report.csv')
