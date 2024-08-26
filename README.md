## ☁️ How to use Local

### 📦 Installation

This is a template for Fastapi + ReactJS. You will need to have Docker installed in your machine.

```bash
git https://github.com/shahrukh802/ig-demo.git
cd ig-demo
docker-compose build
```

### 🚀 Running the platform

Once you have built the platform, you can run it with:

```bash
docker-compose up
```

This will start the client and server, and you can access the client at `http://localhost:3000`.
you can access the server at http://localhost:8000

## ☁️ Azure DevOps Deployment

To deploy Docker containers on Azure from GitHub using a Docker Compose file, you can follow these steps:

### 1. Set Up an Azure Container Registry (ACR)

#### 1. Create a Resource Group (if you don’t already have one):

- Go to the Azure portal.
- Search for “Resource groups” and create a new resource group.

#### 2. Create an Azure Container Registry:

- In the Azure portal, search for "Container registries."
- Click "Create" and choose your resource group.
- Provide a unique name for the registry, select the location, and choose the SKU (Basic, Standard, or Premium).
- Click "Review + Create" and then "Create."

### 2. Push Your Docker Images to ACR

#### 1. Login to ACR:

- Open a terminal and log in to ACR using:

```bash
az acr login --name <your-acr-name>
```

#### 2. Build and Tag Your Docker Images:

- Build your Docker images and tag them for ACR:

```bash
docker build -t <acr-name>.azurecr.io/<image-name>:<tag> .
```

#### 3. Push the Docker Images to ACR:

- Push the images to ACR:

```bash
docker push <acr-name>.azurecr.io/<image-name>:<tag>
```

### 3. Set Up Azure Web App for Containers

#### 1. Create a Web App for Containers:

- In the Azure portal, search for "App Services."
- Click "Create" and choose "Web App for Containers."
- Provide a name, select the subscription and resource group.
- Under "Docker," select "Single Container" or "Docker Compose."
- choose "Docker Compose" and provide the docker-compose.yml file
- Click "Review + Create" and then "Create."
