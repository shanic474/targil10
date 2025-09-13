pipeline {
    agent any

    environment {
        IMAGE_NAME = "shanic474/targil10-app"
        IMAGE_TAG = "latest"
        CONTAINER_NAME = "targil10-container"
    }

    stages {
        stage('Code Checkout') {
            steps {
                git url: 'https://github.com/shanic474/targil10.git', branch: 'main'
            }
        }

        stage('Docker Build & Tag') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

       stage('Docker Push'){
            steps{
                withCredentials([usernamePassword(credentialsId: 'dockerHub-cradantials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]){
                    sh '''
                    echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
                    docker push ${IMAGE_NAME}:latest
                    '''
                }
            }
        }


        stage('Docker Run') {
            steps {
                sh '''
                    if [ "$(docker ps -aq -f name=$CONTAINER_NAME)" ]; then
                        docker stop $CONTAINER_NAME || true
                        docker rm $CONTAINER_NAME || true
                    fi
                    docker run -d --name ${CONTAINER_NAME} ${IMAGE_NAME}:${IMAGE_TAG}
                '''
            }
        }
    }
}
