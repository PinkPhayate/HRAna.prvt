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
    X = df.drop("rank", axis=1)
    return X, y

def execute_via_sgd(training_df, predict_df):
    X, y = make_dataset(training_df)
    # print(X)

    clf = SGDClassifier(loss="log",
                        penalty="l2",
                        class_weight="balanced",
                        n_iter=1000)
    clf.fit(X, column_or_1d(y))

    eX, y = make_dataset(predict_df)
    predicts = clf.predict(eX)
    return predicts.tolist()


def execute_simulation(training_df, predict_df):
    predicts = execute_via_sgd(training_df, predict_df)
    predict_df.reset_index(drop=True, inplace=True)
    df = pd.DataFrame(predicts)
    df.columns = [['pred']]
    logging_df = pd.concat([predict_df[['rank']], df], axis=1)
    return logging_df

    # 買う項目を絞る

def evaluate_average(logging_df):
    print(logging_df.groupby("rank").apply(lambda x: x.mean()))
