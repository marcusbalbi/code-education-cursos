(ns walletcore.core
  (:require [honey.sql :as sql]
            [honey.sql.helpers :as sql.h]
            [next.jdbc :as jdbc]
            [next.jdbc.result-set :as rs]
            [walletcore.adapters.client :as adapters.client]
            [walletcore.logic.client :as logic.client]
            [clj-time.core :as t]
            [clj-time.coerce :as tc])
  (:gen-class))





(def db {:dbtype "postgres" :dbname "walletcore"
         :user "test" :password "test" :port 5433})

(def ds (jdbc/with-options db {:builder-fn rs/as-unqualified-kebab-maps}))


(def config {:table :clients
             :pk :id
             :columns [:id
                       :name
                       :email
                       :created-at
                       :updated-at]})

(seq (:columns config))

(def insert-query (-> (sql.h/insert-into (:table config))
                      (sql.h/values [(-> (logic.client/->client "Joel" "jo@email.com")
                                         (adapters.client/model-client->database-client))])
                      (sql/format)))

insert-query

#_(sql/format {:select [:a :b :c]
             :from   [:foo]
             :where  [:= :foo.a "baz"]})

(jdbc/execute! ds insert-query)

 (def result (jdbc/execute! ds ["select * from clients"]))

result


(adapters.client/database-client->model-client (-> result first))



(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println (logic.client/->client "Marcus" "marcus@test.com"))
  (println "Hello, World!"))

