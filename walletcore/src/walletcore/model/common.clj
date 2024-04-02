(ns walletcore.model.common
  (:require [schema.core :as s]))

(def NotEmptyString (s/pred (fn [v]
                              (and (string? v)
                                   (seq v)))))

(def LocalDateTime (s/pred (fn [v]
                    (instance? org.joda.time.DateTime v))))