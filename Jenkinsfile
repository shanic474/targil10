pipeline {
    agent any

    stages {
        stage('Code Checkout') {
            steps {
                // Pull the latest code from GitHub
                git url: 'https://github.com/<your-username>/jenkins-hello-world.git', branch: 'main'
            }
        }

        stage('Docker Build & Tag') {
            steps {
                script {
                    // Define image name and tag
                    def imageName = "hello-world-app"
                    def imageTag = "v1.0"

                    // Build Docker image
                    sh "docker build -t ${imageName}:${imageTag} ."
                }
            }
        }
    }
}
