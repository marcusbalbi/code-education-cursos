(ns walletcore.logic.client-test
  (:require [clj-time.core :as t]
            [clojure.test :refer [is testing]]
            [schema.test :as s]
            [walletcore.logic.client :as logic.client]))

(s/deftest ->client-test
  (testing "create new client"
    (let [seconds-ago (t/minus (t/now) (t/seconds 10))
          client (logic.client/->client "James" "james@test.com")]
      (is (= (:email client) "james@test.com"))
      (is (= (:name client) "James"))
      (is (= (:accounts client) []))
      (is (t/after? (:created-at client) seconds-ago))
      (is (t/after? (:updated-at client) seconds-ago)))))

(s/deftest client->new-account-test
  (testing "create new account for client"
    (let [seconds-ago (t/minus (t/now) (t/seconds 10))
          client (logic.client/->client "James" "james@test.com")
          account (logic.client/client->new-account client)]
      (is (= (:balance account) 0))
      (is (= (:client-id account) (:id client)))
      (is (t/after? (:created-at account) seconds-ago))
      (is (t/after? (:updated-at account) seconds-ago)))))

(s/deftest with-account-test
  (testing "adds account for client"
    (let [client (logic.client/->client "James" "james@test.com")
          account (logic.client/client->new-account client)
          client-w-acc (logic.client/with-account client account)]
      (is (= (count (:accounts client-w-acc)) 1)))))