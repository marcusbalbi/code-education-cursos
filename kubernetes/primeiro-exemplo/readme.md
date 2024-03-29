- kind create cluster --config=./k8s/Kind.yml --name=fullcycle
- kind get clusters
- kubectl get nodes
- kind delete clusters kind
- kubectl config get-clusters
- kubectl config use-context contextname

- kubectl apply -f ./k8s/deployment.yml
- kubectl apply -f ./k8s/replicaset.yml
- kubectl delete replicasetname
- kubectl describe
- kubectl rollout history deployment nodeserver
- kubectl port-forward service/nodeserver-service 3000:80
- kubectl proxy --port=4000

- kubectl top pod
- kubectl run -it fortio --rm --image=fortio/fortio -- load -qps 800 -t 120s -c 70 "http://nodeserver-service/healthz"
- kubectl get pvc

- kubectl config view
- kubectl config current-context
- kubectl config set-context dev --namespace=dev --cluster=kind-balbi --user=kind-balbi
- kubectl config use-context dev

- kubectl get serviceaccounts
- kubectl describe pod server-\*
- kubectl exec server-\* -- cat /var/run/secrets/kubernetes.io/serviceaccount/ca.crt

- kubectl api-resources
