# commands

- kubectl label namespace default istio-injection=enabled
- kubectl apply -f <https://raw.githubusercontent.com/istio/istio/master/samples/addons/prometheus.yaml>
- kubectl apply -f <https://raw.githubusercontent.com/istio/istio/master/samples/addons/kiali.yaml>
- kubectl apply -f <https://raw.githubusercontent.com/istio/istio/master/samples/addons/jaeger.yaml>
- kubectl apply -f <https://raw.githubusercontent.com/istio/istio/master/samples/addons/grafana.yaml>
- istioctl dashboard kiali
