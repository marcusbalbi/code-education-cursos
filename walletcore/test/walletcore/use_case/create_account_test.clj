(ns walletcore.use-case.create-account-test 
  (:require [clojure.test :refer [is testing use-fixtures] :as test] 
            [schema.test :as s]
            [walletcore.adapters.client :as adapters.client]
            [walletcore.use-case.account.create-account :as uc.create-account]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.logic.client :as logic.client]))

(def client (logic.client/->client "James" "james@email.com"))

(def client-repo (repository/->MemoryRepository {:pk :id} (atom [(-> client adapters.client/model-client->database-client)])))
(def account-repo (repository/->MemoryRepository {:pk :id} (atom [])))

(use-fixtures :each (fn [f]
                      (repository/cleanup! account-repo)
                      (f)))

(s/deftest create-account-test
  (testing "should create account correctly"
    (let [output (uc.create-account/execute {:client-id (-> client :id str)} client-repo account-repo)]
      (is (not (nil? (:id output))))
      (is (= (:id output) (-> (repository/fetch account-repo (:id output)) :id)))))
  (testing "should fail if client does not exists"
    (let [execute (fn [] (uc.create-account/execute {:client-id (str (random-uuid))} client-repo account-repo))]
    (is (thrown? clojure.lang.ExceptionInfo (execute))))))
