(ns walletcore.core
  (:require [next.jdbc :as jdbc]
            [next.jdbc.result-set :as rs]
            [walletcore.adapters.client :as adapters.client]
            [walletcore.logic.client :as logic.client]

            [walletcore.database.client :as database.client]
            [environ.core :refer [env]])
  (:gen-class))

;; (def dbpg {:dbtype (env :db-type) :dbname (env :db-name)
;;            :host (env :db-host)
;;            :user (env :db-user) :password (env :db-pass) :port (env :db-port)})

;; (def dspg (jdbc/with-options dbpg {:builder-fn rs/as-unqualified-kebab-maps}))


;; (jdbc/execute! dspg [(:create-table-cmd database.client/config)])

(def client (-> (logic.client/->client "Alan" "alan@gmail.com")
                (adapters.client/model-client->database-client)))



(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println (logic.client/->client "Marcus" "marcus@test.com"))
  (println "Hello, World!"))
