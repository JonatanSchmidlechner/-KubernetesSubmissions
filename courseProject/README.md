# Todo app

## Deployment instructions

### Prerequisites

- A running GKE cluster.
- `kubectl` CLI installed and configured to point to your cluster.
- `gcloud` CLI installed and authenticated (if needed for cluster management).
- For the app to be able to create backups, a Kubernetes Secret containing a Google Cloud service account key needs to be added to the cluster in project namespace. This service account should have **Storage Admin** permissions for Google Cloud Storage.

```powershell
kubectl create secret generic gcp-credentials   --from-file=gcp-key.json=./private-key.json  -n project
```

1. Clone the repository at a tagged release:

```powershell
git clone --branch 3.10 --depth 1 https://github.com/JonatanSchmidlechner/-KubernetesSubmissions.git
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

<<<<<<< HEAD
## Comparison between DBAAS vs DYI

### DBAAS

#### Pros

- Less work for initial setup.
- Less (none) responsibility for maintenance.
- There are potentially useful ready made services like automated backups.
- Cost is probably predictable.
- Overall, easier to setup and use, since the provider has probably seen a lot of effort to make everything as easy as possible for the customer.

#### Cons

- Less freedom to customize the database to match your own needs perfectly. In other words, less flexible.
- Cost may be higher.

### DYI

#### Pros

- More flexible. You can configure it however you want to match your needs.
- More control on everything.
- Cost may be lower.

#### Cons

- Cost is probably more unpredictable, since the cost now comes from multiple seperate resources (which together form the database) being run instead of a single database service.
- More work to setup and maintain.
- No ready made services. You need to handle backups etc.
=======
test
>>>>>>> 8f74845 (Test github actions.)
