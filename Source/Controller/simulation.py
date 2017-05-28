from Model import race
class Race_simulation (object):
    def __init__(self,race_models):
        self.number_of_race = len(race_models)
        self.race_models = race_models

        self.simulate()

    def find_target_model(self,i):
        for race_model in self.race_models
            if race_model not in i:
                return race_model


    def simulate(self):
        it = itertools.combinations(self.race_models, self.number_of_race-1)

        for i in it:
            find_target_model(i)

        for race_model in self.race_models
            if race model not in it:
                target_race = race_model

        for x in it*


        for (i, x) in enumerate(self.race_models):
            target_race = self.race_models[i]

            training_races =
