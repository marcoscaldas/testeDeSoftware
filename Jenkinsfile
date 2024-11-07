pipeline {
    agent any

    tools {
        nodejs "node" // Substitua pelo nome da instalação do Node.js no Jenkins
    }

    stages {
        stage('Checkout SCM') {
            steps {
                echo 'Verificando o repositório...'
                checkout scm
            }
        }
        stage('Instalar Dependências') {
            steps {
                echo 'Instalando dependências...'
                dir('app') {
                    bat 'npm install'
                }
            }
        }
        stage('Executar Testes') {
            steps {
                echo 'Executando testes...'
                dir('app') {
                    bat 'npx mocha tests/*.js --exit' // Executa todos os arquivos de teste na pasta tests
                }
            }
        }
    }
}
