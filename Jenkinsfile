namespace = "default"
serviceName = "spepas-gateway"
service = "Spepas Gateway"

def groovyMethods

m1 = System.currentTimeMillis()

pipeline {
  agent {
    label 'Jenkins-Agent'
  }

  tools {
    nodejs "NodeJS"
    dockerTool "Docker"
  }

  environment {
    DOCKER_CREDENTIALS = credentials("dockerhub")
    IMAGE_NAME = "jboadi" + "/" + "spepas-gateway"
    IMAGE_TAG = "stable-${BUILD_NUMBER}"
  }

  stages {
    stage("Cleanup Workspace") {
      steps {
        cleanWs()
      }
    }

    stage("Prepare Environment") {
      steps {
        sh "[ -d pipeline ] || mkdir pipeline"
        dir("pipeline") {
          // Add your jenkins automation url to url field
          git branch: 'main', credentialsId: 'github', url: 'https://github.com/spepas-dev/spepas-jenkins-automation'
          script {
            groovyMethods = load("functions.groovy")
          }
        }
        // Add your gateway url to url field
        git branch: 'main', credentialsId: 'github', url: 'https://github.com/spepas-dev/gateway'
        sh 'npm install'
      }
    }

    stage("Lint Check") {
      steps {
        sh 'npm run lint:check'
      }
    }

    stage("Code Format Check") {
      steps {
        sh 'npm run prettier:check'
      }
    }

    // stage("Unit Test") {
    //   steps {
    //     sh 'npm run test'
    //   }
    // }

    stage("Build and Push") {
      steps {
        script {
          withCredentials([usernamePassword(credentialsId: 'dockerhub', 
             usernameVariable: 'DOCKERHUB_CREDENTIAL_USR', 
             passwordVariable: 'DOCKERHUB_CREDENTIALS_PSW')]) {
            sh 'docker login -u $DOCKERHUB_CREDENTIAL_USR --password $DOCKERHUB_CREDENTIALS_PSW'
          }
        }
        sh "docker build -t $IMAGE_NAME ."
        sh "docker tag $IMAGE_NAME $IMAGE_NAME:$IMAGE_TAG"
        sh "docker tag $IMAGE_NAME $IMAGE_NAME:stable"
        sh "docker push $IMAGE_NAME:$IMAGE_TAG"
        sh "docker push $IMAGE_NAME:stable"
      }
    }

    stage("Clean Artifacts") {
      steps {
        sh "docker rmi $IMAGE_NAME:$IMAGE_TAG"
        sh "docker rmi $IMAGE_NAME:stable"
      }
    }

    stage("Create New Pods") {
      steps {
        withKubeCredentials(kubectlCredentials: [[caCertificate: '', clusterName: 'staging-spepasapp', contextName: 'staging-spepasapp', credentialsId: 'jenkins-k8s-token', namespace: '', serverUrl: 'https://spepas-h4xvz0de.hcp.northeurope.azmk8s.io:443']]) {
          script {
            def pods = groovyMethods.findPodsFromName("${namespace}", "${serviceName}")
            for (podName in pods) {
              sh """
                kubectl delete -n ${namespace} pod ${podName}
                sleep 10s
              """
            }
          }
        }
      }
    }
  }
  post {
    success {
      script {
        m2 = System.currentTimeMillis()
        def durTime = groovyMethods.durationTime(m1, m2)
        def author = groovyMethods.readCommitAuthor()
        groovyMethods.notifySlack("", "spepas-jenkins", [
        				[
        					title: "BUILD SUCCEEDED: ${service} Service with build number ${env.BUILD_NUMBER}",
        					title_link: "${env.BUILD_URL}",
        					color: "good",
        					text: "Created by: ${author}",
        					"mrkdwn_in": ["fields"],
        					fields: [
        						[
        							title: "Duration Time",
        							value: "${durTime}",
        							short: true
        						],
        						[
        							title: "Stage Name",
        							value: "Production",
        							short: true
        						],
        					]
        				]
        		]
        )
      }
    }
    failure {
      script {
        m2 = System.currentTimeMillis()
        def durTime = groovyMethods.durationTime(m1, m2)
        def author = groovyMethods.readCommitAuthor()
        groovyMethods.notifySlack("", "spepas-jenkins", [
        				[
        					title: "BUILD FAILED: ${service} Service with build number ${env.BUILD_NUMBER}",
        					title_link: "${env.BUILD_URL}",
        					color: "error",
        					text: "Created by: ${author}",
        					"mrkdwn_in": ["fields"],
        					fields: [
        						[
        							title: "Duration Time",
        							value: "${durTime}",
        							short: true
        						],
        						[
        							title: "Stage Name",
        							value: "Production",
        							short: true
        						],
        					]
        				]
        		]
        )
      }
    }
  }
}
