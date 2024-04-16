(ns walletcore.infra.protocols.repository
  (:require [schema.core :as s]))

;; example of a repository pattern per table not used on the system
(defprotocol Repository
  "Basic Repository"
  (insert!* [this item] "The Item to be Saved")
  (update!* [this item] "The Item to be Saved")
  (fetchAll* [this] "receive the query and returns a collection with results")
  (fetch* [this pk] "receive the query and returns a collection with results")
  (cleanup!* [this] "Removes all items from collection"))

(def RepositoryContract (s/protocol Repository))

(defn insert! [repository item]
  (.insert!* repository item))

(defn fetchAll [repository]
  (.fetchAll* repository))

(defn fetch [repository pk]
  (.fetch* repository pk))

(defn cleanup! ([repository new-coll]
  (.cleanup!* repository new-coll))
  ([repository]
   (.cleanup!* repository [])))

(defn update! [repository item]
  (.update!* repository item))


;; https://github.com/seancorfield/next-jdbc/blob/develop/doc/getting-started.md

;; https://github.com/seancorfield/honeysql

;; http://clojuremongodb.info/articles/getting_started.html