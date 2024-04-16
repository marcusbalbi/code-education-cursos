(ns walletcore.model.common
  (:require [schema.core :as s]
            [clojure.data.json :as json]
            [clj-time.coerce :as tc]
            [clj-time.core :as t]))

(def NotEmptyString (s/pred (fn [v]
                              (and (string? v)
                                   (seq v)))))

(def JsonString (s/pred (fn [v]
                              (try
                                (json/read-str v)
                                (catch Exception _
                                  false)))))

(def LocalDateTime (s/pred (fn [v]
                    (instance? org.joda.time.DateTime v))))

(def DatabaseDateTime (s/pred (fn [v]
                                (instance? java.sql.Timestamp v))))