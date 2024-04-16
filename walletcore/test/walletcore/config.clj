(ns walletcore.config
  (:require [next.jdbc :as jdbc]
            [next.jdbc.result-set :as rs]
            [next.jdbc.specs :as specs]
            [environ.core :refer [env]]
            [walletcore.database.client :as database.client]))

(specs/instrument)

(def dbpg {:dbtype (env :db-type) :dbname (env :db-name)
           :host (env :db-host)
           :user (env :db-user) :password (env :db-pass) :port (env :db-port)})

(def dspg (jdbc/with-options (dissoc dbpg :db-name) {:builder-fn rs/as-unqualified-kebab-maps}))



(defn create-test-database! []
  (let [dspg (jdbc/with-options (dissoc dbpg :dbname) {:builder-fn rs/as-unqualified-kebab-maps})]
    (jdbc/execute-one! dspg [(format "DROP DATABASE IF EXISTS %s;" (env :db-name))])
    (jdbc/execute! dspg [(format "CREATE DATABASE %s;" (env :db-name))])))


(defn start! []
  (println "STARTING TESTS....")
  (println "CREATING DATABASE...")
  (create-test-database!)
  (jdbc/execute! dspg [(:create-table-cmd database.client/config)]))


(start!)