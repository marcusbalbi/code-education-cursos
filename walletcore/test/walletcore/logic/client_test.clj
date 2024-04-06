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
      (is (t/after? (:created-at client) seconds-ago))
      (is (t/after? (:updated-at client) seconds-ago)))))