from sklearn.linear_model import SGDClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import SGDClassifier
from sklearn import neighbors
from sklearn.metrics import accuracy_score
from sklearn.utils import column_or_1d
# ALL_PARAMS = ['frame', 'num','age','odds','fav','f','m','g']
ALL_PARAMS = ['frame', 'num', 'age', 'odds', 'fav', 'wght', 'qntty', 'f', 'm', 'g', 'zr', 'pl', 'mi']
TDY_PARAMS = ["frame", "num", "odds", "fav", "age", "f", "m", "g", 'zr', 'pl', 'mi', 'wght']
# TDY_PARAMS = ["frame", "num", "odds", "fav", "age"]
ITERATION = 100
THRESHOLD = 0.5
RED = '\033[93m'
GREEN = '\033[92m'
ENDC = '\033[0m'


def predict_via_rf(dfs, race_id):
        evalt_df = dfs[dfs['race_id'] == race_id]
        train_df = dfs[dfs['race_id'] != race_id]

        # train_df = oversampling(train_df)

        # X = train_df[ALL_PARAMS]
        X = train_df[TDY_PARAMS]
        y = train_df[['target']]
        # knn = neighbors.KNeighborsClassifier()
        # knn.fit(X,y)
        model = SGDClassifier(class_weight='balanced')
        # model = RandomForestRegressor()
        # model = RandomForestClassifier(class_weight="balanced")
        model.fit(X, column_or_1d(y))

        # eX = evalt_df[ALL_PARAMS]
        eX = evalt_df[TDY_PARAMS]
        # ey = evalt_df[['target']]


        # predicts = model.predict(X)
        # training_accuracy = accuracy_score(y, predicts.tolist())
        # predicts = knn.predict( eX )
        predicts = model.predict(eX)
        # validation_accuracy = accuracy_score(ey, predicts.tolist())

        return predicts.tolist()

def predict_today_via_sgd(dfs, predict_df):
    # print predict_df
        # evalt_df = dfs[dfs['race_id'] == race_id]
        # train_df = dfs[dfs['race_id'] != race_id]

        # train_df = oversampling(train_df)

    X = dfs[TDY_PARAMS]
    y = dfs[['target']]

    clf = SGDClassifier(loss="log", penalty="l2", class_weight="auto", n_iter=1000)

    clf.fit(X, column_or_1d(y))

    eX = predict_df[TDY_PARAMS]
    # ey = evalt_df[['target']]


    # predicts = clf.predict(X)
    # training_accuracy = accuracy_score(train_df[['target']], predicts.tolist())

    predicts = clf.predict(eX)
    # validation_accuracy = accuracy_score(evalt_df[['target']], predicts.tolist())
    # print predicts
    return predicts.tolist()
