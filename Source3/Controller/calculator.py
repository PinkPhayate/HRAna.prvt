import pandas as pd
from sklearn.linear_model import SGDClassifier
from sklearn.utils import column_or_1d


def divide_classification(y):
    pos_df = y[y < 4]
    neg_df = y[y > 3]
    df = pd.concat([pos_df, neg_df], axis=0)
    return df


def make_dataset(df):
    y = df['rank']
    y = divide_classification(y)
    X = df.drop('rank')
    return X, y


def execute_via_sgd(training_df, predict_df):
    X, y = make_dataset(training_df)

    clf = SGDClassifier(loss="log",
                        penalty="l2",
                        class_weight="auto",
                        n_iter=1000)
    clf.fit(X, column_or_1d(y))

    eX, y = make_dataset(predict_df)
    predicts = clf.predict(eX)
    return predicts.tolist()


def execute_simulation(training_df, predict_df):
    return execute_via_sgd(training_df, predict_df)
