(ns walletcore.database.account 
  (:require [schema.core :as s]
            [walletcore.adapters.account :as adapters.account]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.model.account :as model.account]))


(s/defn insert!
  [account :- model.account/Account
   account-repository :- repository/RepositoryContract]
  (let [doc (adapters.account/model-account->database-account account)]
    (repository/insert! account-repository doc)))

(s/defn fetch :- model.account/Account
  [id :- s/Str
   account-repository :- repository/RepositoryContract]
  (some-> account-repository
          (repository/fetch id)
          (adapters.account/database-account->model-account)))

(s/defn update!
  [account :- model.account/Account
   account-repository :- repository/RepositoryContract]
  (let [doc (adapters.account/model-account->database-account account)]
    (repository/update! account-repository doc)))