(defproject walletcore "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "EPL-2.0 OR GPL-2.0-or-later WITH Classpath-exception-2.0"
            :url "https://www.eclipse.org/legal/epl-2.0/"}
  :dependencies [[org.clojure/clojure "1.11.2"]
                 [prismatic/schema "1.4.1"]
                 [clj-time "0.15.2"]
                 [com.github.seancorfield/next.jdbc "1.3.925"]
                 [org.postgresql/postgresql "42.7.3"]
                 [com.github.seancorfield/honeysql "2.6.1126"]
                 [org.clojure/data.json "2.5.0"]]
  :main ^:skip-aot walletcore.core
  :target-path "target/%s"
  :profiles {:test {:resource-paths ["test/walletcore/config.clj"]}
             :uberjar {:aot :all
                       :jvm-opts ["-Dclojure.compiler.direct-linking=true"]}})
