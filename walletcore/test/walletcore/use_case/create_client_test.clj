(ns walletcore.use-case.create-client-test
  (:require [clojure.test :refer [testing use-fixtures is]]
            [schema.test :as s]
   [walletcore.use-case.client.create-client :as uc.create-client]
            [walletcore.infra.protocols.repository :as repository]))

(def client-repo (repository/->MemoryRepository {:pk :id} (atom [])))

(use-fixtures :each (fn [f]
                      (repository/cleanup! client-repo)
                      (f)))

(s/deftest create-client-test
  (testing "should create client correctly"
    (let [output-client (uc.create-client/execute {:name "Jonas"
                                                   :email "jj@email.com"} client-repo)]
      (is (= (:name output-client) "Jonas"))
      (is (= (:email output-client) "jj@email.com"))
      (is (string? (:created-at output-client)))
      (is (string? (:updated-at output-client)))
      (is (= (:id output-client) (-> (repository/fetch client-repo (:id output-client)) :id))))))
