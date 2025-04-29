pipeline {
    agent none

    stages {
        stage('Build and Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                checkout scm
                sh 'npm install'
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            agent any
            steps {
                script {
                    sh 'docker build -t sample-app:${BUILD_NUMBER} .'
                }
            }
        }
        
        stage('Deploy') {
            agent any
            steps {
                script {
                    sh '''
                    docker stop sample-app || true
                    docker rm sample-app || true
                    docker run -d -p 3000:3000 --name sample-app sample-app:${BUILD_NUMBER}
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline executed successfully!'
        }
        failure {
            echo 'Pipeline execution failed!'
        }
    }
}