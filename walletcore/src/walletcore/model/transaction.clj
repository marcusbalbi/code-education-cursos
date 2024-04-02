(ns walletcore.model.transaction
  (:require [schema.core :as s]
            [walletcore.model.common :as mc]
            [walletcore.model.account :as model.account]))

(s/defschema Transaction {:id s/Uuid
                          :account-from model.account/Account
                          :account-to model.account/Account
                          :amount s/Num
                          :created-at mc/LocalDateTime})