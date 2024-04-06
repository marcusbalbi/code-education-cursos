(ns walletcore.use-case.transaction.create-transaction 
  (:require [schema.core :as s]
            [walletcore.adapters.transaction :as adapters.transaction]
            [walletcore.database.account :as database.account]
            [walletcore.database.transaction :as database.transaction]
            [walletcore.dto.transaction :as dto.transaction]
            [walletcore.infra.protocols.repository :as repository]
            [walletcore.logic.account :as logic.account]
            [walletcore.logic.transaction :as logic.transaction]))



(s/defn execute :- dto.transaction/OutputNewTransaction
  [input :- dto.transaction/InputNewTransaction
   account-repository :- repository/RepositoryContract
   transaction-repository :- repository/RepositoryContract]
  (try
    (let [account-from (database.account/fetch (:account-id-from input) account-repository)
          account-to (database.account/fetch (:account-id-to input) account-repository)
          amount (:amount input)] 
      (if (and (seq account-from) (seq account-to))
        (if (logic.account/has-funds? account-from amount)
          (let [transaction (logic.transaction/->transaction account-from account-to amount)
                updated-account-from (logic.account/debit account-from amount)
                updated-account-to (logic.account/credit account-to amount)]
            (database.account/update! updated-account-from account-repository)
            (database.account/update! updated-account-to account-repository)
            (database.transaction/insert! transaction transaction-repository)
            (adapters.transaction/model-transaction->output-new-transaction transaction))
          (throw (ex-info "Account Does not have funds" {:account-from account-from
                                                         :input input})))
        (throw (ex-info "Check if Accounts Exists" {:account-from account-from
                                                    :account-to account-to
                                                    :input input}))))
    (catch Exception e
      (throw e))))
