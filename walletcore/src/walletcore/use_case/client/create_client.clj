(ns walletcore.use-case.client.create-client 
  (:require [schema.core :as s]
            [walletcore.dto.client :as dto.client]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.logic.client :as logic.client]))

(.insert! repository/client-repo {:a  "v"})
(.fetchAll repository/client-repo)

(s/defn execute
  [input :- dto.client/InputNewClient
   client-repository]
  (repository.Repository/insert! client-repository (logic.client/->client (:name input) (:email input))))

(s/set-fn-validation! true)

(execute {:name "Jonas" :email "jonas@email.com"}
         repository/client-repo)