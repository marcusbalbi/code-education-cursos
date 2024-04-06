(ns walletcore.use-case.client.create-client 
  (:require [schema.core :as s]
            [walletcore.database.client :as database.client]
            [walletcore.dto.client :as dto.client]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.logic.client :as logic.client]
            [walletcore.model.client :as model.client]))

(s/defn model-client->output-new-client :- dto.client/OutputNewClient
  [client :- model.client/Client]
  (as-> client $
    (update $ :id str)
    (update $ :created-at str)
    (update $ :updated-at str)
    (dissoc $ :accounts)))

(s/defn execute :- dto.client/OutputNewClient
  [input :- dto.client/InputNewClient
   client-repository :- repository/RepositoryContract]
  (try
    (let [client (logic.client/->client (:name input) (:email input))]
      (database.client/insert! client client-repository)
      (model-client->output-new-client client))
    (catch Exception e
           (throw e))))
