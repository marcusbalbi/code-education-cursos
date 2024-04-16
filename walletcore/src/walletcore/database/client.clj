(ns walletcore.database.client
  (:require [schema.core :as s]
            [walletcore.adapters.client :as adapters.client]
            [walletcore.infra.database :as database]
            [walletcore.infra.protocols.repository-postgres :as repopg]
            [walletcore.model.client :as model.client]))

(def config {:table :clients
             :pk :id
             :columns [:id
                       :name
                       :email
                       :created-at
                       :updated-at]
             :create-table-cmd "CREATE TABLE clients (
    id character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    created_at timestamp NOT NULL,
    updated_at timestamp NOT NULL,
    CONSTRAINT clients_id PRIMARY KEY (id))"})

(s/defn insert!
  [client :- model.client/Client
   connection]
  (let [doc (adapters.client/model-client->database-client client)]
    (database/insert! connection config doc)))

(s/defn fetch :- (s/maybe model.client/Client)
  [id :- s/Str connection]
  (some-> connection
          (database/fetch config id)
          (adapters.client/database-client->model-client)))