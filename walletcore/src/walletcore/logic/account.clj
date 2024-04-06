(ns walletcore.logic.account
  (:require [clj-time.core :as t]
            [schema.core :as s]
            [walletcore.model.account :as model.account]
            [walletcore.model.client :as model.client]))

(s/defn credit :- model.account/Account
  [account :- model.account/Account
   amount :- s/Num]
  (as-> account $
    (update $ :balance +  amount)
    (update $ :balance bigdec)
    (assoc $ :updated-at (t/now))))

(s/defn debit :- model.account/Account
  [account :- model.account/Account
   amount :- s/Num]
  (as-> account $
    (update $ :balance - amount)
    (update $ :balance bigdec)
    (assoc $ :updated-at (t/now))))

(s/defn has-funds? [account :- model.account/Account
                    amount  :- s/Num]
  (> (:balance account) amount))

(s/defn ->account :- model.account/Account
  [client :- model.client/Client]
  {:id (random-uuid)
   :client-id (:id client)
   :balance 0
   :created-at (t/now)
   :updated-at (t/now)})
