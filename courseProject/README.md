# Todo app

## Deploy the whole project

## Prerequisites

- A running GKE cluster.
- `kubectl` CLI installed and configured to point to your cluster.
- `gcloud` CLI installed and authenticated (if needed for cluster management).

1. Clone the repository at a tagged release:

```powershell
git clone --branch 3.6 --depth 1 https://github.com/JonatanSchmidlechner/-KubernetesSubmissions.git
```

2. Change directory to the project directory:

```powershell
cd .\-KubernetesSubmissions\courseProject/
```

3. Apply manifest files:

```powershell
kubectl apply -k .
```

4. Wait for the app to deploy and check the Address

```powershell
kubectl get gateway -n project todoapp-gateway --watch
```

5. Then open the app in browser using the URL below. This will take a moment to deploy, responses may be 404 and 502 as it becomes available:

- `http://<EXTERNAL-IP>/`

(This line is a test and you can ignore this: test)
