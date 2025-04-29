pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t sample-app:${BUILD_NUMBER} .'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                docker stop sample-app || true
                docker rm sample-app || true
                docker run -d -p 3000:3000 --name sample-app sample-app:${BUILD_NUMBER}
                '''
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