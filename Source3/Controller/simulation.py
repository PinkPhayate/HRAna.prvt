import algorithm as algo
import race
from scikit import sgd
import calculator


class Race_simulation (object):
    def __init__(self, rids, race_models):
        self.rids = rids
        self.number_of_race = len(race_models)
        self.race_models = race_models

        self.simulate()

    def find_target_model(self, i):
        for race_model in self.race_models:
            if race_model not in i:
                return race_model

    def merge_df(self):
        df = pd.DataFrame([])
        for race_model in self.race_models:
            tmp_df = race_model.get_df()
            df = pd.DataFrame([df, tmp_df])
        return df

    def get_trainingrids(self):
        # todo implement
        print()

    def get_trainif_df(self):
        # to implement
        print()


    def simulate(self, predict_rid, training_rids):
        training_df = self.get_trainif_df(training_rids)
        predict_df = self.get_predict_df(predict_rid)

        predicts = calculator.execute_simulation(training_df, predict_df)
