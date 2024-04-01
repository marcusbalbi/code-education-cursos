(ns walletcore.unit.logic.client-test
  (:require [clojure.test :refer [testing is]]
            [schema.test :as s]
            [walletcore.logic.client :as logic.client]))

(s/deftest ->client-test
  (testing "create new client"
    (let [client (logic.client/->client "James" "james@test.com")]
      (is (= (:email client) "james@test.com"))
      (is (= (:name client) "James"))
      (is (uuid? (:id client))))))