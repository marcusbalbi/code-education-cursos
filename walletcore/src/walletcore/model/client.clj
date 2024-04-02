(ns walletcore.model.client
  (:require [schema.core :as s]
            [walletcore.model.common :as mc]
            [walletcore.model.account :as model.account]))

(s/defschema Client {:id s/Uuid
                     :name mc/NotEmptyString
                     :email mc/NotEmptyString
                     :accounts [model.account/Account]
                     :created-at mc/LocalDateTime
                     :updated-at mc/LocalDateTime})