(ns walletcore.dto.client
  (:require [walletcore.model.common :as mc]
            [schema.core :as s]))

(s/defschema InputNewClient {:name mc/NotEmptyString
                             :email mc/NotEmptyString})

(s/defschema OutputNewClient {:id s/Str
                              :name mc/NotEmptyString
                              :email mc/NotEmptyString
                              :created-at s/Str
                              :updated-at s/Str})

(s/defschema DatabaseClient {:id s/Str
                             :name mc/NotEmptyString
                             :email mc/NotEmptyString
                             :created-at s/Str
                             :updated-at s/Str})

