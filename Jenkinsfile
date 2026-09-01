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

        stage('Verify Node & NPM') {
            steps {
                echo '========== Checking Node.js and NPM versions =========='

                bat '''
                    node -v
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========== Installing npm dependencies =========='

                bat '''
                    if exist package-lock.json (
                        echo "package-lock.json found - running npm ci"
                        npm ci
                    ) else (
                        echo "package-lock.json not found - running npm install"
                        npm install
                    )
                '''
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo '========== Installing Playwright Chromium =========='

                bat '''
                    npx playwright install chromium
                '''
            }
        }

        stage('Clean Test Results') {
            steps {
                echo '========== Cleaning previous test results =========='

                bat '''
                    if exist "%ALLURE_RESULTS_DIR%" (
                        echo Removing allure-results...
                        rmdir /s /q "%ALLURE_RESULTS_DIR%"
                    )

                    if exist "%ALLURE_REPORT_DIR%" (
                        echo Removing allure-report...
                        rmdir /s /q "%ALLURE_REPORT_DIR%"
                    )

                    if exist "playwright-report" (
                        echo Removing playwright-report...
                        rmdir /s /q "playwright-report"
                    )

                    if exist "test-results" (
                        echo Removing test-results...
                        rmdir /s /q "test-results"
                    )
                '''
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                echo '========== Running Cucumber BDD Tests =========='

                bat '''
                    npm run test:Orange
                '''
            }
        }

        stage('Generate Allure Report') {
            steps {
                echo '========== Generating Allure Report =========='

                bat '''
                    if exist "%ALLURE_RESULTS_DIR%" (
                        echo Allure results found.
                        npm run allure:generate
                    ) else (
                        echo No Allure results found. Skipping Allure report generation.
                    )
                '''
            }
        }
    }

    post {

        always {
            echo '========== Publishing Test Results =========='

            echo '========== Archiving Allure Results =========='

            archiveArtifacts artifacts: 'allure-results/**',
                             allowEmptyArchive: true

            echo '========== Archiving Allure Report =========='

            archiveArtifacts artifacts: 'allure-report/**',
                             allowEmptyArchive: true

            echo '========== Archiving Playwright Report =========='

            archiveArtifacts artifacts: 'playwright-report/**',
                             allowEmptyArchive: true

            echo '========== Archiving Test Results =========='

            archiveArtifacts artifacts: 'test-results/**',
                             allowEmptyArchive: true
        }

        success {
            echo '=============================================='
            echo '       TESTS PASSED SUCCESSFULLY'
            echo '=============================================='
        }

        failure {
            echo '=============================================='
            echo '              TESTS FAILED'
            echo '=============================================='
        }

        cleanup {
            echo '========== Cleaning up workspace =========='

            deleteDir()
        }
    }
}
