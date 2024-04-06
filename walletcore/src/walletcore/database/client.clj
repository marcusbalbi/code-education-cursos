(ns walletcore.database.client 
  (:require [schema.core :as s]
            [walletcore.adapters.client :as adapters.client]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.model.client :as model.client]))

(s/defn insert!
  [client :- model.client/Client
   client-repository :- repository/RepositoryContract]
  (let [doc (adapters.client/model-client->database-client client)]
    (repository/insert! client-repository doc)))

(s/defn fetch :- (s/maybe model.client/Client)
  [id :- s/Str
   client-repository :- repository/RepositoryContract]
  (some-> client-repository
          (repository/fetch id)
          (adapters.client/database-client->model-client)))