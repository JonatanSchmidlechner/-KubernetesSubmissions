# Todo app

## Instructions to deploy the app

1. Make sure your cluster is running and port-forward as follows: local port 8082 -> agent 0 port 30080.

2. Create the deployment by applying deployment.yaml from the internet:

```powershell
kubectl apply -f https://raw.githubusercontent.com/JonatanSchmidlechner/-KubernetesSubmissions/refs/heads/main/courseProject/todoApp/manifests/deployment.yaml
```

3. Create the service resource by applying service.yaml from the internet:

```powershell
kubectl apply -f https://raw.githubusercontent.com/JonatanSchmidlechner/-KubernetesSubmissions/refs/heads/main/courseProject/todoApp/manifests/service.yaml
```

4. (Optional) Visit [localhost:8082](http://localhost:8082/) to see the app's output:
