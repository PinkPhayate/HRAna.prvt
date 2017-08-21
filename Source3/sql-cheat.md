- 実際の順位は10だが、ッヨソク結果では１位と評価されたレースをみるsql
select * from res as r left join history as h
	on r.race_id=h.race_id and r.rank=h.rank where r.rank=10 and r.pred=1

- とあるレースに参加したい馬の結果を確認する
select distinct pred,urid,race_id,rank,rid from res where urid=9050711

- どのuridに累計何頭出場しているか
select count(id) as c, urid from res group by urid
