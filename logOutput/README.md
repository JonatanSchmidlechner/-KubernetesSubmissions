# Log output app

## Instructions to deploy the app

1. Make sure your cluster is running and port-forward as follows: local port 8082 -> agent 0 port 30080, and local port 8081 -> load balancer port 80.

2. Create the deployment by applying deployment.yaml from the internet:

```powershell
kubectl apply -f https://raw.githubusercontent.com/JonatanSchmidlechner/-KubernetesSubmissions/refs/heads/main/logOutput/manifests/deployment.yaml
```

3. Create the service resource by applying service.yaml from the internet:

```powershell
kubectl apply -f https://raw.githubusercontent.com/JonatanSchmidlechner/-KubernetesSubmissions/refs/heads/main/logOutput/manifests/service.yaml
```

4. Create the ingress resource by applying ingress.yaml from the internet:

```powershell
kubectl apply -f https://raw.githubusercontent.com/JonatanSchmidlechner/-KubernetesSubmissions/refs/heads/main/logOutput/manifests/ingress.yaml
```

5. (Optional) Visit [localhost:8081/log-output](http://localhost:8081/log-output) to see the app's output:
