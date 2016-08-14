import numpy as np
class SMOTE(object):
    def __init__(self, N):
        self.N = N
        self.T = 0
        self.nnk = 10

    # cv -> y(0,1)???
    def oversampling(self, smp, cv):
        mino_idx = np.where(cv==1)[0]
        mino_smp = smp[mino_idx,:]  # 値が1のX

        mino_nn = []

        for idx in mino_idx:    # 値が1のもののindexを一つずつ
            near_dist = np.array([])
            near_idx = np.zeros(nnk)    #nnk個の0ベクトルが帰る
            for i in xrange(len(smp)):  # smp数分繰り返す i=(0, len(sample))
                if idx != i:    # idxとiが等しいと距離は0になってしまうから
                    dist = self.dist(smp[idx,:], smp[i,:])

                    if len(near_dist)<nnk:  # 想定ご近所さん数まで到達していなければ問答無用でlistに追加
                        tmp = near_dist.tolist()
                        tmp.append(dist)
                        near_dist = np.array(tmp)   # near_distにdistを追加する
                    elif sum(near_dist[near_dist > dist])>0:
                        near_dist[near_dist==near_dist.max()] = dist
                        near_idx[near_dist==near_dist.max()] = i
            mino_nn.append(near_idx)
        return self.create_synth( smp, mino_smp, np.array(mino_nn, dtype=np.int) )

    def dist(self, smp_1, smp_2):
        return np.sqrt( np.sum((smp_1 - smp_2)**2) )

    def create_synth(self, smp, mino_smp, mino_nn):
        self.T = len(mino_smp)
        if self.N < 100:
            self.T = int(self.N*0.01*len(mino_smp))
            self.N = 100
        self.N = int(self.N*0.01)

        # np.floor -> 小数点以下切り捨て
        # np.random.uniform -> sizeで指定されている数の0以上1以下のデータを生成
        #　rs　= (0,1)間のデータと　mino_smpをかけたものがTの長さ分
        rs = np.floor( np.random.uniform(size=self.T)*len(mino_smp) )

        synth = []
        for n in xrange(self.N):
            for i in rs:    # mino_sampleの長さ分繰り替えされる
                nn = int(np.random.uniform(size=1)[0]*nnk)
                dif = smp[mino_nn[i,nn],:] - mino_smp[i,:]
                gap = np.random.uniform(size=len(mino_smp[0]))
                tmp = mino_smp[i,:] + np.floor(gap*dif)
                tmp[tmp<0]=0
                synth.append(tmp)
        return synth
