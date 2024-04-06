(ns walletcore.adapters.account 
  (:require [schema.core :as s]
            [walletcore.dto.account :as dto.account]
            [walletcore.model.account :as model.account]
            [clj-time.format :as t]))


(s/defn model-account->output-new-account :- dto.account/OutputNewAccount
  [account :- model.account/Account]
  (-> account
      (update :id str)
      (select-keys [:id])))


(s/defn model-account->database-account :- dto.account/DatabaseAccount
  [account :- model.account/Account]
  (as-> account $
    (update $ :id str)
    (update $ :client-id str)
    (update $ :created-at str)
    (update $ :updated-at str)))

(s/defn database-account->model-account :- model.account/Account
  [account :- dto.account/DatabaseAccount]
  (as-> account $
    (update $ :id parse-uuid)
    (update $ :client-id parse-uuid)
    (update $ :created-at t/parse)
    (update $ :updated-at t/parse)))