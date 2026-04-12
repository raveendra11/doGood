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
                    gcloud config set project "$PROJECT_ID"
                    gcloud auth configure-docker ${REGION}-docker.pkg.dev --quiet
                '''
            }
        }

        stage('Install Ansible') {
            steps {
                sh 'python3 -m pip install --user ansible'
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

        stage('Deploy and Configure with Ansible') {
            steps {
                sh '''
                    ~/.local/bin/ansible-playbook ansible/playbooks/deploy_gke.yml \
                      -e "full_image=$FULL_IMAGE" \
                      -e "deployment_name=dogood" \
                      -e "container_name=dogood"
                '''
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
