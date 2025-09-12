# Log Output & Ping Pong

## Deploy the whole project

## Prerequisites

- A running GKE cluster.
- `kubectl` CLI installed and configured to point to your cluster.
- `gcloud` CLI installed and authenticated (if needed for cluster management).

1. Clone the repository at a tagged release:

```powershell
git clone --branch 3.4 --depth 1 https://github.com/JonatanSchmidlechner/-KubernetesSubmissions.git
```

2. Change directory to the project directory:

```powershell
cd .\-KubernetesSubmissions\logOutput-pingpong/
```

3. Apply manifest files:

```powershell
kubectl apply -f manifests/ --recursive
```

4. Wait for the app to deploy and check the external IP

```powershell
kubectl get gateway -n exercises logoutput-pingpong-gateway --watch
```

5. Then open the app in browser using the URL below. This will take a moment to deploy, responses may be 404 and 502 as it becomes available.:

- `http://<EXTERNAL-IP>/`
- `http://<EXTERNAL-IP>/pingpong`

Since in this version the /pingpong route was internally changed to /, the pingCount increases automatically. Probably because of healthchecks.
