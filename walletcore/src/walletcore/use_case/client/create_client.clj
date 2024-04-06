(ns walletcore.use-case.client.create-client 
  (:require [schema.core :as s]
            [walletcore.adapters.client :as adapters.client]
            [walletcore.database.client :as database.client]
            [walletcore.dto.client :as dto.client]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.logic.client :as logic.client]))

(s/defn execute :- dto.client/OutputNewClient
  [input :- dto.client/InputNewClient
   client-repository :- repository/RepositoryContract]
  (try
    (let [client (logic.client/->client (:name input) (:email input))]
      (database.client/insert! client client-repository)
      (adapters.client/model-client->output-new-client client))
    (catch Exception e
           (throw e))))
