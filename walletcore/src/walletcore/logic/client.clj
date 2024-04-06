(ns walletcore.logic.client
  (:require [schema.core :as s]
            [clj-time.core :as t]
            [walletcore.model.client :as model.client]))


(s/defn ->client :- model.client/Client
  [name email]
  {:id (random-uuid)
   :name name
   :email email
   :created-at (t/now)
   :updated-at (t/now)})

