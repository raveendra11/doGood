pipeline {
    agent any

    environment {
        PROJECT_ID   = 'dogood-488720'
        REGION       = 'us-central1'
        CLUSTER_NAME = 'dogood-cluster'
        REPOSITORY   = 'dogood-repo'
        IMAGE_NAME   = 'dogood'
        IMAGE_TAG    = "${env.BUILD_NUMBER}"
        IMAGE_URI    = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${IMAGE_TAG}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Authenticate to GCP') {
            steps {
                withCredentials([file(credentialsId: 'gcp-service-account-json', variable: 'GCP_KEY')]) {
                    sh '''
                        gcloud auth activate-service-account --key-file="$GCP_KEY"
                        gcloud config set project "$PROJECT_ID"
                        gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet
                    '''
                }
            }
        }

        stage('Build Image') {
            steps {
                sh '''
                    docker build -t "$IMAGE_URI" .
                '''
            }
        }

        stage('Push Image') {
            steps {
                sh '''
                    docker push "$IMAGE_URI"
                '''
            }
        }

        stage('Get GKE Credentials') {
            steps {
                sh '''
                    gcloud container clusters get-credentials "$CLUSTER_NAME" \
                      --region "$REGION" \
                      --project "$PROJECT_ID"
                '''
            }
        }

        stage('Deploy Manifests') {
            steps {
                sh '''
                    kubectl apply -f k8s/deployment.yaml
                    kubectl apply -f k8s/backendconfig.yaml
                    kubectl apply -f k8s/service.yaml
                    kubectl apply -f k8s/ingress.yaml
                '''
            }
        }

        stage('Update Deployment Image') {
            steps {
                sh '''
                    kubectl set image deployment/dogood \
                      dogood="$IMAGE_URI"
                '''
            }
        }

        stage('Wait for Rollout') {
            steps {
                sh '''
                    kubectl rollout status deployment/dogood --timeout=600s
                '''
            }
        }
    }

    post {
        success {
            echo "Deployment succeeded: ${IMAGE_URI}"
        }
        failure {
            echo "Deployment failed"
        }
        always {
            sh 'docker logout ${REGION}-docker.pkg.dev || true'
        }
    }
}
