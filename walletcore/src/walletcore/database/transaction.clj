(ns walletcore.database.transaction 
  (:require [schema.core :as s]
            [walletcore.adapters.transaction :as adapters.transaction]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.model.transaction :as model.transaction]))

(s/defn insert!
  [transaction :- model.transaction/Transaction
   transaction-repository :- repository/RepositoryContract]
  (let [doc (adapters.transaction/model-transaction->database-transaction transaction)]
    (repository/insert! transaction-repository doc)))