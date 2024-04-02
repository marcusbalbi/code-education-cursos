(ns walletcore.model.account 
  (:require [schema.core :as s]
            [walletcore.model.common :as mc]))


(s/defschema Account {:id s/Uuid
                     :client-id s/Uuid
                     :balance s/Num
                     :created-at mc/LocalDateTime
                     :updated-at mc/LocalDateTime})