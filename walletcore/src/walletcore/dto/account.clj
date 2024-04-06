(ns walletcore.dto.account
  (:require [schema.core :as s]))

(s/defschema InputNewAccount {:client-id s/Str})

(s/defschema OutputNewAccount {:id s/Str})

(s/defschema DatabaseAccount {:id s/Str
                              :client-id s/Str
                              :balance s/Num
                              :created-at s/Str
                              :updated-at s/Str})