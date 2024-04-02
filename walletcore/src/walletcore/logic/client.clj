(ns walletcore.logic.client
  (:require [schema.core :as s]
            [clj-time.core :as t]
            [walletcore.model.client :as model.client]
            [walletcore.model.account :as model.account]))


(s/defn ->client :- model.client/Client
  [name email]
  {:id (random-uuid)
   :name name
   :email email
   :accounts []
   :created-at (t/now)
   :updated-at (t/now)})

(s/defn client->new-account :- model.account/Account
  [client :- model.client/Client]
  {:id (random-uuid)
   :client-id (:id client)
   :balance 0
   :created-at (t/now)
   :updated-at (t/now)})

(s/defn with-account :- model.client/Client
  [client :- model.client/Client
   account :- model.account/Account]
  ;; check if the account is for this client??
  (update client :accounts conj account))