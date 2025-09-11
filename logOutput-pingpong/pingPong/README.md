# Ping Pong App — GKE Deployment

## Prerequisites

- A running GKE cluster.
- `kubectl` CLI installed and configured to point to your cluster.
- `gcloud` CLI installed and authenticated (if needed for cluster management).

1. Clone the repository at a tagged release:

```powershell
git clone --branch 3.1 --depth 1 https://github.com/JonatanSchmidlechner/-KubernetesSubmissions.git
```

2. Change directory to the project directory:

```powershell
cd .\-KubernetesSubmissions\logOutput-pingpong/
```

3. Apply base and pingpong manifests:

```powershell
kubectl apply -f manifests/base
kubectl apply -f manifests/pingpong
```

4. Wait for the app to deploy and check the external IP

```powershell
kubectl get svc -n exercises pingpong-svc
```

5. Then open the app in browser using the URL below:

- `http://<EXTERNAL-IP>/pingpong`
