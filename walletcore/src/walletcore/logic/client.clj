(ns walletcore.logic.client
  (:require [schema.core :as s]
            [walletcore.model.client :as models.client]))

(s/defn ^:private new-id []
  (random-uuid))

(s/defn ->client :- models.client/Client
  [name email]
  {:id (new-id)
   :name name
   :email email})