(ns walletcore.database.client 
  (:require [schema.core :as s]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.model.client :as model.client]
            [clj-time.format :as t]
            [walletcore.dto.client :as dto.client]))


(s/defn model-client->database-client :- dto.client/DatabaseClient
  [client :- model.client/Client]
  (as-> client $
    (update $ :id str)
    (update $ :created-at str)
    (update $ :updated-at str)))

(s/defn database-client->model-client :- model.client/Client
  [client :- dto.client/DatabaseClient]
  (as-> client $
    (update $ :id parse-uuid)
    (update $ :created-at t/parse)
    (update $ :updated-at t/parse)))

(s/defn insert!
  [client :- model.client/Client
   client-repository :- repository/RepositoryContract]
  (let [doc (model-client->database-client client)]
    (repository/insert! client-repository doc)))

(s/defn fetch
  [id :- s/Uuid
   client-repository :- repository/RepositoryContract]
  (some-> client-repository
          (repository/fetch id)
          (database-client->model-client)))