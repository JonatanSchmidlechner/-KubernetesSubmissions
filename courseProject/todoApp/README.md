# Todo app

## Instructions to deploy the app

1. Make sure your cluster is running.
2. Create the deployment by applying deployment.yaml from the internet:

```powershell
kubectl apply -f https://raw.githubusercontent.com/JonatanSchmidlechner/-KubernetesSubmissions/refs/heads/main/courseProject/todoApp/manifests/deployment.yaml
```

3. (Optional) Port-forward to view the app's output:

```powershell
kubectl port-forward deployment/todoapp-dep 3000:5000
```

4. (Optional) Visit [localhost:3000](http://localhost:3000/) to see the app's output:
