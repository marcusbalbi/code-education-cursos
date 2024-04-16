(ns walletcore.infra.protocols.repository-postgres 
  (:require [schema.core :as s]
            [honey.sql :as sql]
            [honey.sql.helpers :as sql.h]
            [walletcore.infra.protocols.repository :as repository]
            [next.jdbc :as jdbc]))

#_(s/defrecord PostgresRepository [config]
  repository/Repository
  (insert!* [this ds item]
    (let [query (-> (sql.h/insert-into (:table config))
                    (sql.h/values [item])
                    (sql/format))]
      (jdbc/execute! ds query)))
  (update!* [this ds item]
    item)
  (fetch* [this ds pk]
    (let [sql (-> (sql.h/select :*)
                  (sql.h/from (:table config))
                  (sql.h/where [:= (:pk config) pk])
                  (sql/format))]
      (-> ds
          (jdbc/execute! sql)
          first)))
  (fetchAll* [this ds]
    (let [sql (-> (sql.h/select :*)
                  (sql.h/from (:table config))
                  (sql/format))]
      (jdbc/execute! ds sql)))
  (cleanup!* [this ds]
    (jdbc/execute! ds (str "truncate table" (:table config)))))

#_(s/defrecord PostgresRepository [ds config]
  repository/Repository
  (insert!* [this item]
    (let [query (-> (sql.h/insert-into (:table config))
              (sql.h/values [item])
              (sql/format))]
      (jdbc/execute! ds query)))
  (update!* [this item]
    item)
  (fetch* [this pk]
     (let [sql (-> (sql.h/select :*)
                   (sql.h/from (:table config))
                   (sql.h/where [:= (:pk config) pk])
                   (sql/format))]
       (-> ds 
           (jdbc/execute! sql)
           first)))
  (fetchAll* [this]
    (let [sql (-> (sql.h/select :*)
                  (sql.h/from (:table config))
                  (sql/format))]
       (jdbc/execute! ds sql)))
  (cleanup!* [this] 
             (jdbc/execute! ds (str "truncate table" (:table config)))))