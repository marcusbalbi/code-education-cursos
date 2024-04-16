(ns walletcore.use-case.create-client-test
  (:require [clojure.test :refer [is testing use-fixtures]]
            [next.jdbc :as jdbc]
            [schema.test :as s]
            [walletcore.config]
            [walletcore.use-case.client.create-client :as uc.create-client]
            [walletcore.database.client :as database.client]))

(use-fixtures :each (fn [f]
                      (jdbc/execute! walletcore.config/dspg ["TRUNCATE clients"])
                      (f)))

(s/deftest create-client-test
  (testing "should create client correctly"
    (let [output-client (uc.create-client/execute {:name "Jonas"
                                                   :email "jj@email.com"} {:connection walletcore.config/dspg})]
      (is (= (:name output-client) "Jonas"))
      (is (= (:email output-client) "jj@email.com"))
      (is (string? (:created-at output-client)))
      (is (string? (:updated-at output-client)))
      (is (= (parse-uuid (:id output-client)) (-> (database.client/fetch (:id output-client) walletcore.config/dspg) :id))))))
