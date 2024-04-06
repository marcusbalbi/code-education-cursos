(ns walletcore.use-case.account.create-account 
  (:require [schema.core :as s]
            [walletcore.adapters.account :as adapters.account]
            [walletcore.database.account :as database.account]
            [walletcore.database.client :as database.client]
            [walletcore.dto.account :as dto.account]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.logic.account :as logic.account]))


(s/defn execute :- dto.account/OutputNewAccount
  [input :- dto.account/InputNewAccount
   client-repository :- repository/RepositoryContract
   account-repository :- repository/RepositoryContract]
  (try
    (if-let [client (database.client/fetch (-> input :client-id) client-repository)]
      (let [account (logic.account/->account client)]
        (database.account/insert! account account-repository)
        (adapters.account/model-account->output-new-account account))
      (throw (ex-info "Client Not Found" {:input input})))
    (catch Exception e
      (throw e))))
