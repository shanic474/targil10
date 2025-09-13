pipeline {
    agent any

    environment {
        IMAGE_NAME = "s10shani/targil10-app" // Docker Hub repo under your account
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "targil10-container"
    }

    stages {
        stage('Code Checkout') {
            steps {
                echo "Checking out code from GitHub..."
                git url: 'https://github.com/shanic474/targil10.git', branch: 'main'
            }
        }

        stage('Docker Build & Tag') {
            steps {
                echo "Building Docker image..."
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Docker Push') {
            steps {
                echo "Logging in to Docker Hub and pushing image..."
                withCredentials([usernamePassword(credentialsId: 'dockerHub-cradantials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh '''
                        echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                        docker push ${IMAGE_NAME}:${IMAGE_TAG}
                    '''
                }
            }
        }

        stage('Docker Run') {
            steps {
                echo "Stopping existing container (if any) and running new one..."
                sh '''
                    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                    fi
                    docker run -d --name ${CONTAINER_NAME} -p 5000:5000 ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
    }
}
