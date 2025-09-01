# Todo app

## Instructions to deploy the app

1. Ensure your cluster is running and port-forwarding is set and a local path "/tmp/kube" is created to node:

- local port 8082 → agent 0 port 30080
- local port 8081 → load balancer port 80

```powershell
docker exec {node-name} mkdir -p /tmp/kube
```

2. Clone the repository at a tagged release:

```powershell
git clone --branch 1.12 --depth 1 https://github.com/JonatanSchmidlechner/-KubernetesSubmissions.git
```

3. Change directory to the project directory:

```powershell
cd .\-KubernetesSubmissions\courseProject\todoApp
```

4. Apply all manifests at once:

```powershell
kubectl apply -f manifests/
```

5. (Optional) Visit [localhost:8081](http://localhost:8081/) to see the app's output:
