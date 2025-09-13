pipeline {
    agent any

    environment {
        IMAGE_NAME = "your-dockerhub-username/hello-world-app"
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Code Checkout') {
            steps {
                // Pull the latest code from GitHub
                git url: 'https://github.com/shanic474/-Bash-script-that-says-Hello-World-.git', branch: 'main'
            }
        }

        stage('Docker Build & Tag') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Docker Push') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push ${IMAGE_NAME}:latest
                    '''
                }
            }
        }
    }
}
