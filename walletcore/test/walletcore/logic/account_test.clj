(ns walletcore.logic.account-test 
  (:require [clojure.test :refer [is testing]]
            [schema.test :as s]
            [walletcore.logic.client :as logic.client]
            [walletcore.logic.account :as logic.account]
            [clj-time.core :as t]))

(def client (logic.client/->client "Jon" "doe"))
(def account (-> client logic.account/->account))

(s/deftest credit-test
  (testing "should correct credit to account"
    (is (= 12M (-> (logic.account/credit account 12) :balance)))))

(s/deftest debit-test
  (testing "should correct credit to account"
    (is (= -12M (-> (logic.account/credit account -12) :balance)))))

(s/deftest ->new-account-test
  (testing "create new account for client"
    (let [seconds-ago (t/minus (t/now) (t/seconds 10))
          client (logic.client/->client "James" "james@test.com")
          account (logic.account/->account client)]
      (is (= (:balance account) 0))
      (is (= (:client-id account) (:id client)))
      (is (t/after? (:created-at account) seconds-ago))
      (is (t/after? (:updated-at account) seconds-ago)))))