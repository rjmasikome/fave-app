#!/bin/bash

deployment=fave-app

docker build -t localhost:5000/"${deployment}":latest .
docker run -d -p 5000:5000 --name registry registry:2
docker push localhost:5000/"${deployment}":latest
kubectl apply -f kubernetes.yml

external_ip=""
while [ -z $external_ip ]; do
  echo "Waiting for end point..."
  external_ip=$(kubectl get ingress $deployment --template="{{range .status.loadBalancer.ingress}}{{.ip}}{{end}}")
  [ -z "$external_ip" ] && sleep 10
done

echo 'Removing registry...' &&
docker container stop registry &&
docker container rm -v registry &&
echo 'End point ready:' && echo $external_ip
