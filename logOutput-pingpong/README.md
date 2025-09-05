# Log Output & Ping Pong (shared PV)

## Deploy the whole project

1. Ensure your cluster is running and port-forwarding is set:

- local port 8082 → agent 0 port 30080
- local port 8081 → load balancer port 80

2. Clone the repository at a tagged release:

```powershell
git clone --branch 2.5 --depth 1 https://github.com/JonatanSchmidlechner/-KubernetesSubmissions.git
```

3. Change directory to the project directory:

```powershell
cd .\-KubernetesSubmissions\logOutput-pingpong/
```

4. Apply all manifests at once:

```powershell
kubectl apply -f manifests/
```

5. Open the apps:

- Ping Pong: [http://localhost:8081/pingpong](http://localhost:8081/pingpong)
- Log Output: [http://localhost:8081/log-output](http://localhost:8081/)
