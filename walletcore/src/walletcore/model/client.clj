(ns walletcore.model.client
  (:require [schema.core :as s]))

(s/defschema Client {:id s/Uuid
                     :name s/Str
                     :email s/Str})