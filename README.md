# NestJS-Microservices: Reservation Booking System

## Overview

This is a comprehensive, full-stack, real-world example of a reservation booking system built using NestJS. This system handles reservations, payments, email notifications, and persists data to a MongoDB database. It is structured as a microservices architecture and contains various branches demonstrating different implementations like MySQL with TypeORM and RabbitMQ.

> **Note**: This project was for learning purposes. Any secret keys committed before November 2nd are invalidated and no longer in use.

---

## Architecture

The project is structured into multiple apps and common libraries:

### Microservices

- **Reservations**: Handles all reservation logic.
- **Auth**: Manages authentication and authorization.
- **Payments**: Processes payments.
- **Notifications**: Sends email notifications.

### Other Components

- Common Libraries: Shared code across all services.
- Dockerfiles: For containerizing the applications.
- Kubernetes Manifests: For orchestrating the deployment.

---

## Pre-requisites

- Docker & Docker Compose
- Node.js
- PNPM (Package manager)
- Kubernetes (Optional)

---

## Setup and Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/nest-js-microservices.git
   ```

2. **Navigate to project directory**

   ```bash
   cd nest-js-microservices
   ```

3. **Install dependencies using PNPM**

   ```bash
   pnpm install
   ```

4. **Copy `.env.example` to `.env` for each app and fill in environment variables**

   ```bash
   cp apps/{service-name}/.env.example apps/{service-name}/.env
   ```

5. **Build and Start Services with Docker Compose**

   ```bash
   docker-compose up --build
   ```

---

## Deployment

### Local Deployment

Follow the Setup and Installation steps above.

### Google Cloud Deployment

This project is also deployed on Google Cloud.

---

## Commands

### Docker Compose

Start services:

```bash
docker-compose up
```

Stop services:

```bash
docker-compose down
```

### NestJS

Build the project:

```bash
pnpm run build
```

Start in development:

```bash
pnpm run start:dev {service-name}
```

### Testing

Run unit tests:

```bash
pnpm run test
```

Run unit tests in watch mode:

```bash
pnpm run test:watch
```

Run e2e tests:

```bash
pnpm run test:e2e
```

---

## Branches

- `typeorm`: Implementation with MySQL and TypeORM.
- `rabbitmq`: Implementation using RabbitMQ for message brokering.

---

## Continuous Integration and Deployment

The project includes Kubernetes manifests and Helm charts for deployment.

### Kubernetes

Apply Kubernetes manifests:

```bash
kubectl apply -f k8s/
```

### Helm

Deploy using Helm:

```bash
helm install -f helm/values.yaml nest-js-microservices helm/
```

---

## Contributing

If you have suggestions or issues, please open an issue or create a PR.
