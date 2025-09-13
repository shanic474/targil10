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
                script {
                    sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                }
            }
        }

        stage('Docker Push') {
            steps {
