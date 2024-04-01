(ns walletcore.core
  (:require
   [walletcore.logic.client :as logic.client])
  (:gen-class))

(defn -main
  "I don't do a whole lot ... yet."
  [& args]
  (println (logic.client/->client "Marcus" "marcus@test.com"))
  (println "Hello, World!"))
