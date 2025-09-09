# Todo app

## Instructions to deploy the distributed app

1. Ensure your cluster is running and port-forwarding is set and a local path "/tmp/kube" is created to node:

- local port 8081 → load balancer port 80

```powershell
docker exec {node-name} mkdir -p /tmp/kube
```

2. Clone the repository at a tagged release:

```powershell
git clone --branch 2.9 --depth 1 https://github.com/JonatanSchmidlechner/-KubernetesSubmissions.git
```

3. Change directory to the project directory:

```powershell
cd .\-KubernetesSubmissions\courseProject
```

4. Apply all manifests at once:

```powershell
kubectl apply -f manifests/
```

5. (Optional) Wait for the application to start and visit [localhost:8081](http://localhost:8081/) to see the app's output:
