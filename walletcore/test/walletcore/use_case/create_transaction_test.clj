(ns walletcore.use-case.create-transaction-test 
  (:require [clojure.test :refer [is testing use-fixtures]]
            [schema.test :as s]
            [walletcore.adapters.account :as adapters.account]
            [walletcore.adapters.client :as adapters.client]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.use-case.transaction.create-transaction :as uc.create-transaction]
            [walletcore.logic.account :as logic.account]
            [walletcore.logic.client :as logic.client]))


(def client (logic.client/->client "James" "james@email.com"))

(def account-a (-> (logic.account/->account client)
                   (logic.account/credit 120)))
(def account-b (logic.account/->account client))

#_(def client-repo (repository/->MemoryRepository {:pk :id} (atom [(-> client adapters.client/model-client->database-client)])))

(def account-repo (repository/->MemoryRepository {:pk :id} (atom [(-> account-a adapters.account/model-account->database-account)
                                                                  (-> account-b adapters.account/model-account->database-account)])))

(def transaction-repo (repository/->MemoryRepository {:pk :id} (atom [])))

(use-fixtures :each (fn [f]
                      (repository/cleanup! transaction-repo)
                      (repository/cleanup! account-repo)
                      (f)))

(s/deftest create-transaction-test
  (testing "should create tranasction correctly"
    (let [output (uc.create-transaction/execute {:account-id-from (-> account-a :id str)
                                                 :account-id-to (-> account-b :id str)
                                                 :amount 20} account-repo transaction-repo)]
      (is (not (nil? (:id output))))
      #_(is (= (:id output) (-> (repository/fetch account-repo (:id output)) :id))))))

(create-transaction-test)
transaction-repo
(uc.create-transaction/execute {:account-id-from (-> account-a :id str)
                                :account-id-to (-> account-b :id str)
                                :amount 20} account-repo transaction-repo)