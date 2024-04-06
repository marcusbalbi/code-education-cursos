(ns walletcore.infra.protocols.repository
  (:require [schema.core :as s]))

(defprotocol Repository
  "Basic Repository"
  (insert!* [this item] "The Item to be Saved")
  (update!* [this item] "The Item to be Saved")
  (fetchAll* [this] "receive the query and returns a collection with results")
  (fetch* [this pk] "receive the query and returns a collection with results")
  (cleanup!* [this new-coll] "Removes all items from collection"))

(def RepositoryContract (s/protocol Repository))


(s/defrecord MemoryRepository [config
                               coll :- s/atom]
  Repository
  (insert!* [this item]
    (swap! coll conj item)
    item)
  (update!* [this item]
            (swap! coll (fn [c item]
                              (-> (filter #(not= ((get-in config [:pk]) %) ((get-in config [:pk]) item)) c)
                                  (conj item))) item)
            item)
  (fetch* [this pk]
    (->> @coll (filter #(= ((get-in config [:pk]) %) pk)) first))
  (fetchAll* [this] @coll)
  (cleanup!* [this new-coll]
    (reset! coll new-coll)))

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