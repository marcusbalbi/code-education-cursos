(ns walletcore.logic.account-test 
  (:require [clojure.test :refer [is testing]]
            [schema.test :as s]
            [walletcore.logic.client :as logic.client]
            [walletcore.logic.account :as logic.account]))

(def client (logic.client/->client "Jon" "doe"))
(def account (-> client logic.client/client->new-account))

(s/deftest credit-test
  (testing "should correct credit to account"
    (is (= 12M (-> (logic.account/credit account 12) :balance)))))

(s/deftest debit-test
  (testing "should correct credit to account"
    (is (= -12M (-> (logic.account/credit account -12) :balance)))))