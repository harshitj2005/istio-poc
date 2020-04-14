# cd ..........\istio-poc\traefik
# kubectl.exe apply -f .\traefik\01-traefik-rbac.yaml
# kubectl.exe apply -f .\traefik\02-traefik-deployment.yaml
# kubectl.exe apply -f .\traefik\03-traefik-ui.yaml
# kubectl.exe apply -f .\traefik\04-traefik-ui-ingress.yaml
# kubectl.exe apply -f .\traefik\05-ingress_mis_abcd.yaml
# add to local hosts file ## 127.0.0.1 traefik-ui and 127.0.0.1 k8stesting.tk
# Acces UI on http://traefik-ui/dashboard/
# Acccess services on :- Ex:- http://k8stesting.tk/misd/