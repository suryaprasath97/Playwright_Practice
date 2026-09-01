pipeline {

    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        CI = 'true'
        ALLURE_RESULTS_DIR = 'allure-results'
        ALLURE_REPORT_DIR = 'allure-report'
    }

    stages {

        stage('Checkout') {
            steps {
                echo '========== Checking out code =========='
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========== Installing npm dependencies =========='
                bat 'npm install'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo '========== Installing Playwright browsers =========='
                bat 'npx playwright install --with-deps'
            }
        }

        stage('Clean Test Results') {
            steps {
                echo '========== Cleaning previous test results =========='
                bat '''
                    if exist "%ALLURE_RESULTS_DIR%" (
                        rmdir /s /q "%ALLURE_RESULTS_DIR%"
                    )
                    if exist "playwright-report" (
                        rmdir /s /q "playwright-report"
                    )
                '''
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                echo '========== Running Cucumber BDD Tests =========='
                bat 'npm run test:Orange'
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '========== Generating Allure Report =========='
                bat 'npm run allure:generate'
            }
        }
    }

    post {
        always {
            echo '========== Publishing Test Results =========='
            
            // Archive Allure results
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
            
            // Archive Playwright reports
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
        }

        success {
            echo '========== Tests Passed Successfully =========='
        }

        failure {
            echo '========== Tests Failed =========='
            archiveArtifacts artifacts: 'test-results/**', allowEmptyArchive: true
        }

        cleanup {
            echo '========== Cleaning up workspace =========='
            deleteDir()
        }
    }
}