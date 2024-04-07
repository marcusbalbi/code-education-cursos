(ns walletcore.infra.protocols.repository-postgres 
  (:require [schema.core :as s]
            [honey.sql :as sql]
            [honey.sql.helpers :as sql.h]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.logic.client :as logic.client]
            [walletcore.adapters.client :as adapters.client]))

(s/defrecord PostgresRepository [config]
  repository/Repository
  (insert!* [this item]
    item)
  (update!* [this item]
    item)
  (fetch* [this pk] pk)
  (fetchAll* [this] [])
  (cleanup!* [this k] k))