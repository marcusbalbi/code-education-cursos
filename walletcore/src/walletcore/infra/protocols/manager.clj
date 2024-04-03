(ns walletcore.infra.protocols.manager 
  (:require [walletcore.infra.protocols.repository :as repository]))


(defn insert! [repository item]
  (.insert! repository item))

(defn fetch-all [repository]
  (.fetchAll repository))

(def newclient-repo (repository/->MemoryRepository {:pk :id} (atom [])))

(insert! newclient-repo {:d "dentross"})

(fetch-all newclient-repo)

