(ns walletcore.infra.protocols.repository)

(defprotocol Repository
  "Basic Repository"
  (insert! [this item] "The Item to be Saved")
  (fetchAll [this] "receive the query and returns a collection with results")
  (fetch [this pk] "receive the query and returns a collection with results")
  (cleanup [this] "Removes all items from collection"))


(defrecord MemoryRepository [config coll]
  Repository
  (insert! [this item]
    (swap! coll conj item)
    item)
  (fetch [this pk]
    (->> @coll (filter #(= ((get-in config [:pk]) %) pk)) first))
  (fetchAll [this] @coll)
  (cleanup [this]
    (reset! coll [])))

(def client-repo (MemoryRepository. {:pk :id} (atom [])))

