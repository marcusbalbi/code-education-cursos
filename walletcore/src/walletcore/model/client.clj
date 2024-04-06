(ns walletcore.model.client
  (:require [schema.core :as s]
            [walletcore.model.common :as mc]))

(s/defschema Client {:id s/Uuid
                     :name mc/NotEmptyString
                     :email mc/NotEmptyString
                     :created-at mc/LocalDateTime
                     :updated-at mc/LocalDateTime})