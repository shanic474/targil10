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
            stage('Docker Run') {
            steps {
                script {
                    // Stop and remove any old container with the same name
                    sh '''
                        if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
                            echo "Stopping old container..."
                            docker stop $CONTAINER_NAME || true
                            docker rm $CONTAINER_NAME || true
                        fi
                    '''

                    // Run a new container in detached mode
                    sh "docker run -d --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}"
                }
            }
        }
    }
}
