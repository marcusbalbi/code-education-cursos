(ns walletcore.dto.transaction
  (:require [schema.core :as s]))


(s/defschema InputNewTransaction {:account-id-from s/Str
                                  :account-id-to s/Str
                                  :amount s/Num})

(s/defschema OutputNewTransaction {:id s/Str})

(s/defschema DatabaseTransaction {:id s/Str
                                  :account-id-from s/Str
                                  :account-id-to s/Str
                                  :amount s/Num
                                  :created-at s/Str})

