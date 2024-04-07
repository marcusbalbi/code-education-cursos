(ns walletcore.adapters.client 
  (:require [schema.core :as s]
            [walletcore.dto.client :as dto.client]
            [clj-time.format :as tf]
            [clj-time.coerce :as tc]
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
    (update $ :created-at tc/to-timestamp)
    (update $ :updated-at tc/to-timestamp)))

(s/defn database-client->model-client :- model.client/Client
  [client :- dto.client/DatabaseClient]
  (as-> client $
    (update $ :id parse-uuid)
    (update $ :created-at tc/from-date)
    (update $ :updated-at tc/from-date)))