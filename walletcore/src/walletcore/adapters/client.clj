(ns walletcore.adapters.client 
  (:require [clj-time.format :as t]
            [schema.core :as s]
            [walletcore.dto.client :as dto.client]
            [walletcore.model.client :as model.client]))

(s/defn model-client->output-new-client :- dto.client/OutputNewClient
  [client :- model.client/Client]
  (as-> client $
    (update $ :id str)
    (update $ :created-at str)
    (update $ :updated-at str)))


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