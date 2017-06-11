import copy
from Controller import algorithm as algo
from Model import race
from Controller import calculator


class Race_simulation (object):
    def __init__(self, rids, race_models):
        self.rids = rids
        self.number_of_race = len(race_models)
        self.race_models = race_models

        self.simulate(predict_rid, training_rids)


    def find_training_dfs(self, predict_rid):
        models = copy.deepcopy(self.race_models)
        for i, model in enumerate(models):
            rid = model.rid
            if predict_rid == rid:
                del models[i]
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
            df = pd.concat(df, model.df)
        return df

    def simulate(self, predict_rid, training_rids):
        for predict_model in race_models:
            predict_df = self.get_df(predict_model)
            # get trainig_model
            training_model = self.find_training_model(predict_model)
            training_df = self.get_df(training_model)
            predicts = calculator.execute_simulation(training_df, predict_df)
