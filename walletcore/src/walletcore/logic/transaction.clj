(ns walletcore.logic.transaction 
  (:require [schema.core :as s]
            [walletcore.model.transaction :as model.transaction]
            [walletcore.model.account :as model.account]
            [clj-time.core :as t]))


(s/defn ->transaction :- model.transaction/Transaction
  [account-from :- model.account/Account
   account-to :- model.account/Account
   amount :- s/Num]
  {:id (random-uuid)
   :account-from account-from
   :account-to account-to
   :amount amount
   :created-at (t/now)})