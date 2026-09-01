pipeline {

    agent any

    tools {
        nodejs 'NodeJS'
    }

    environment {
        CI = 'true'
        ALLURE_RESULTS_DIR = 'allure-results'
        ALLURE_REPORT_DIR = 'allure-report'
        
        OrangeHRM_URL = 'https://opensource-demo.orangehrmlive.com/'
        OrangeHRM_USERNAME = 'Admin'
        OrangeHRM_PASSWORD = 'admin123'
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
                    echo ===== Node Version =====
                    node -v

                    echo ===== NPM Version =====
                    npm -v
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                echo '========== Installing npm dependencies =========='

                bat '''
                    if exist package-lock.json (
                        echo package-lock.json found
                        echo Running npm ci...
                        npm ci
                    ) else (
                        echo package-lock.json not found
                        echo Running npm install...
                        npm install
                    )
                '''
            }
        }

        stage('Install Playwright Browser') {
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
                        rmdir /s /q "%ALLURE_RESULTS_DIR%"
                    )

                    if exist "%ALLURE_REPORT_DIR%" (
                        rmdir /s /q "%ALLURE_REPORT_DIR%"
                    )

                    if exist "playwright-report" (
                        rmdir /s /q "playwright-report"
                    )

                    if exist "test-results" (
                        rmdir /s /q "test-results"
                    )
                '''
            }
        }

        stage('Verify Cucumber Configuration') {
            steps {
                echo '========== Verifying Cucumber configuration =========='

                bat '''
                    echo ===== Cucumber Version =====
                    npx cucumber-js --version

                    echo ===== Project Files =====
                    dir

                    echo ===== Tests Directory =====
                    if exist "tests" (
                        dir tests
                    ) else (
                        echo ERROR: tests directory not found
                        exit /b 1
                    )
                '''
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                echo '========== Running Cucumber BDD Tests =========='

                bat '''
                    echo ===== Starting Cucumber =====

                    npx cucumber-js --tags "@OrangeHRMlogin" --format progress

                    if %ERRORLEVEL% NEQ 0 (
                        echo ===== CUCUMBER TESTS FAILED =====
                        exit /b %ERRORLEVEL%
                    )
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
                        echo No Allure results found.
                        echo Skipping Allure report generation.
                    )
                '''
            }
        }
    }

    post {

        always {
            echo '========== Publishing Test Results =========='

            archiveArtifacts artifacts: 'allure-results/**',
                             allowEmptyArchive: true

            archiveArtifacts artifacts: 'allure-report/**',
                             allowEmptyArchive: true

            archiveArtifacts artifacts: 'playwright-report/**',
                             allowEmptyArchive: true

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
