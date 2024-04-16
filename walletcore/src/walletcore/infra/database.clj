(ns walletcore.infra.database 
  (:require [honey.sql.helpers :as sql.h]
            [honey.sql :as sql]
            [next.jdbc :as jdbc]))

(defn insert! [ds config item]
          (let [query (-> (sql.h/insert-into (:table config))
                          (sql.h/values [item])
                          (sql/format))]
            (jdbc/execute! ds query)))

(defn fetch [ds config pk]
        (let [sql (-> (sql.h/select :*)
                      (sql.h/from (:table config))
                      (sql.h/where [:= (:pk config) pk])
                      (sql/format))]
          (-> ds
              (jdbc/execute! sql)
              first)))

(defn fetchAll [ds config]
           (let [sql (-> (sql.h/select :*)
                         (sql.h/from (:table config))
                         (sql/format))]
             (jdbc/execute! ds sql)))