pipeline {
    agent any

    triggers {
        githubPush()
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        PROJECT_ID   = 'dogood-488720'
        REGION       = 'us-central1'
        CLUSTER_NAME = 'dogood-cluster'
        REPOSITORY   = 'dogood-repo'
        IMAGE_NAME   = 'dogood'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Set Image Tag') {
            steps {
                script {
                    env.TAG = sh(
                        script: 'git rev-parse --short=7 HEAD',
                        returnStdout: true
                    ).trim()
                    env.FULL_IMAGE = "${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${TAG}"
                    echo "Using image: ${env.FULL_IMAGE}"
                }
            }
        }

        stage('Authenticate to Google Cloud') {
            steps {
                sh '''
                    gcloud auth activate-service-account --key-file="$GCP_KEY_FILE"
                    gcloud config set project "$PROJECT_ID"
                    gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet
                '''
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker build -t "$FULL_IMAGE" .'
            }
        }

        stage('Push Image') {
            steps {
                sh 'docker push "$FULL_IMAGE"'
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
                    kubectl apply -f k8s/podmonitoring.yaml
                    kubectl apply -f k8s/ingress.yaml
                '''
            }
        }

        stage('Update Deployment Image') {
            steps {
                sh '''
                    kubectl set image deployment/dogood \
                      dogood="$FULL_IMAGE"
                '''
            }
        }

        stage('Wait for Rollout') {
            steps {
                sh 'kubectl rollout status deployment/dogood --timeout=600s'
            }
        }
    }

    post {
        success {
            echo 'Build and deployment completed successfully.'
        }
        failure {
            echo 'Build or deployment failed.'
        }
        always {
            sh 'docker image prune -f || true'
        }
    }
}
