# doGood

**doGood** is a personal charity-focused project built with the goal of helping orphan children and elders through community-driven donations.
Instead of money, the platform is designed to make it easier for people to donate **essential goods** such as **clothes, food, books, and daily-use items**.

The project is currently under active development, with a focus on building a scalable, user-friendly, and cloud-native donation platform.

---

##  Current Status

 **Under Active Development**

The application is being actively developed and improved across backend, frontend, database, and cloud infrastructure.
Current efforts are focused on strengthening the platform architecture, deployment automation, and production readiness.

---

## Tech Stack

### Application

* **Backend:** Java, Spring Boot
* **Frontend:** React.js
* **Database:** MySQL (Cloud SQL)

### Cloud & DevOps

* **Cloud Platform:** Google Cloud Platform (GCP)
* **Containerization:** Docker
* **CI/CD:** GitHub Actions, Cloud Deploy, Jenkins (explored)
* **Configuration Management:** Ansible
* **Container Registry:** Google Artifact Registry
* **Orchestration & Deployment:** GKE, Cloud Run
* **Ingress & Traffic Management:** Kubernetes Ingress, Google Cloud HTTP(S) Load Balancer
* **Security & Identity:** Workload Identity Federation, IAM, service accounts

---

## Architecture Overview

The project is being designed as a cloud-native application with separate frontend and backend deployment paths.

### High-level flow

* **Frontend** built with React.js
* **Backend APIs** developed using Spring Boot
* **MySQL database** hosted on Cloud SQL
* **Containerized services** built using Docker
* **Images stored** in Google Artifact Registry
* **Deployments automated** using GitHub Actions and Cloud Deploy / GKE workflows
* **Traffic exposed** using Kubernetes Ingress and Google Cloud Load Balancing

---

## DevOps & Cloud Work Showcase

As part of this project, significant work has been done around deployment automation, Kubernetes, cloud networking, and secure CI/CD integration.

### Containerization

* Dockerized the Spring Boot backend for consistent local and cloud deployments
* Built and pushed container images to **Google Artifact Registry**

###  CI/CD Automation

* Implemented **GitHub Actions** workflows to:

  * build Docker images
  * authenticate securely to Google Cloud
  * push images to Artifact Registry
  * trigger deployment workflows

* Explored and mapped the same deployment flow for **Jenkins-based CI/CD**

###  Google Cloud Deploy / GKE Delivery

* Configured deployment pipelines for releasing application updates to GKE
* Used **image substitution workflows** for Kubernetes deployments
* Automated rollout flow from source code changes to Kubernetes deployment
* Standardized deployment/configuration execution through Ansible playbooks

###  Direct GKE Deployment

* Built a direct deployment pipeline to:

  * build and push images
  * fetch GKE credentials
  * apply Kubernetes manifests
  * update workloads with new image versions

###  Kubernetes Deployment & Service Exposure

* Deployed backend workloads on **Google Kubernetes Engine (GKE)**
* Configured:

  * **Deployment**
  * **Service**
  * **Ingress**
  * **BackendConfig**
* Exposed the application using:

  * **Kubernetes Ingress**
  * **Network Endpoint Groups (NEG)**
  * **Google Cloud HTTP(S) Load Balancer**

###  Secure Cloud Authentication

* Configured **Workload Identity Federation** to allow GitHub Actions to securely authenticate with GCP
* Reduced dependency on long-lived static credentials
* Managed service account permissions for:

  * Artifact Registry access
  * Cloud Deploy access
  * GKE deployment access

###  Database Connectivity

* Connected the Spring Boot application to **Cloud SQL MySQL**
* Managed environment configuration for datasource connectivity
* Used Kubernetes secrets for secure database credential injection

###  Production Readiness Improvements

* Added health/readiness handling for backend availability
* Improved deployment reliability with resource requests/limits and rollout tuning
* Worked on HTTPS exposure and custom domain configuration for public access

---

## Key Features in Progress

* User-friendly donation workflow
* Request and donation management
* Backend APIs for donation operations
* Frontend experience for users and contributors
* Secure, scalable cloud deployment
* Domain and HTTPS-based public access
* Production-grade DevOps automation

---

## Learning Outcomes Through This Project

This project is not only about building a charity platform, but also about applying real-world cloud and DevOps practices, including:

* Docker-based containerization
* Kubernetes deployment management
* GKE networking and Ingress configuration
* Google Cloud IAM and service account setup
* Artifact Registry integration
* CI/CD pipeline design with GitHub Actions
* Secure OIDC / Workload Identity Federation setup
* Cloud-native application deployment patterns

---

##  Why doGood?

doGood reflects a simple belief:
technology can be used not only to solve technical problems, but also to make **social contribution easier, more transparent, and more impactful**.

This project is an effort to combine **software engineering, cloud infrastructure, and social good** into one meaningful platform.

---

##  Contributions

This is currently a personal project under development, but the long-term vision is to grow it into a platform that enables more people to participate in meaningful donations and support underserved communities.

---

##  Note

The project is still evolving, and new improvements are continuously being added across architecture, deployment, and user experience.
