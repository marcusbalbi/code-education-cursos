# readme

* consul agent -dev
* consul members
* curl localhost:8500/v1/catalog/nodes
* apk add bind-tools
* dig @localhost -p 8600
* dig @localhost -p 8600 consul01.node.consul

* docker-compose exec consulserver01 sh
* docker-compose exec consulserver02 sh
* docker-compose exec consulserver03 sh

* ifconfig
* mkdir /etc/consul.d
* mkdir /var/lib/consul
* consul agent -server -bootstrap-expect=3 -node=consulserver01 -bind=<IP> -data-dir=/var/lib/consul -config-dir=/etc/consul.d
* consul join <IP>


## client

* ifconfig
* mkdir /var/lib/consul
* mkdir /etc/consul.d
* consul agent -bind=172.19.0.5 -data-dir=/var/lib/consul -config-dir=/etc/consul.d
* consul members
* consul join <IP>
* consul reload
* apk -U add bind-tools
* dig @localhost -p 8600 SRV
* curl localhost:8500/v1/catalog/services
* consul catalog nodes -service nginx
* consul catalog nodes -detailed
* consul agent -bind=172.19.0.6 -data-dir=/var/lib/consul -config-dir=/etc/consul.d --retry-join=172.19.0.4
* apk add nginx
* mkdir /run/nginx
* nginx
* mkdir /usr/share/nginx/html -p
* edit nginx so it returns something different of 404
