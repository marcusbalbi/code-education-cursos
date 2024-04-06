(ns walletcore.adapters.transaction 
  (:require [schema.core :as s]
            [walletcore.model.transaction :as model.transaction]
            [walletcore.dto.transaction :as dto.transaction]
            [walletcore.model.account :as model.account]
            [clj-time.format :as t]))

(s/defn model-transaction->output-new-transaction :- dto.transaction/OutputNewTransaction
  [transaction :- model.transaction/Transaction]
  (-> transaction
      (update :id str)
      (select-keys [:id])))


(s/defn model-transaction->database-transaction :- dto.transaction/DatabaseTransaction
  [transaction :- model.transaction/Transaction]
  (as-> transaction $
    (update $ :id str)
    (assoc $ :account-id-from (-> (get-in $ [:account-from :id]) str))
    (assoc $ :account-id-to (->(get-in $ [:account-to :id]) str))
    (update $ :created-at str)
    (dissoc $ :account-from :account-to)))

(s/defn database-transaction->model-transaction :- model.transaction/Transaction
  [transaction :- dto.transaction/DatabaseTransaction
   account-from :- model.account/Account
   account-to :- model.account/Account]
  (as-> transaction $
    (update $ :id parse-uuid)
    (update $ :created-at t/parse)
    (assoc $ :account-from account-from)
    (assoc $ :account-to account-to)
    (dissoc $ :account-id-from :account-id-to)))