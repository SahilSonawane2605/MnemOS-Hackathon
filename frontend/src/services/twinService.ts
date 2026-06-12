import { request } from './api';
import type { LearningTwinData } from '../types/twin';
import type { CareerInsight } from '../types/api';
import { mockTwinData } from '../mock/twinMock';

export async function getLearningTwin(): Promise<LearningTwinData> {
  try {
    return await request<LearningTwinData>('/learning-twin');
  } catch (error) {
    // Fallback to mock data in case backend is offline
    return mockTwinData;
  }
}

export async function getCareerInsights(): Promise<CareerInsight[]> {
  try {
    return await request<CareerInsight[]>('/career');
  } catch (error) {
    // Return startup-grade career mock details
    return [
      {
        id: 'car-1',
        role: 'Cloud Platform Engineer',
        matchPercentage: 92,
        evidence: [
          'Frequent exploration of Docker container bridge, host, and overlay networks.',
          'Comprehensive review of Kubernetes Pod specifications, liveness/readiness indicators, and ServiceAccounts.',
          'Active reference to AWS ECS Task Definition variables and serverless Fargate profiles.'
        ],
        skillGaps: ['Terraform (Infrastructure-as-Code)', 'ArgoCD (GitOps Automation)'],
        recommendedRoadmap: [
          {
            id: 'step-1',
            title: 'Define Infrastructure with Terraform',
            description: 'Write Terraform modules to provision a VPC, subnets, and an ECS Fargate cluster on AWS.',
            type: 'project',
            estimatedHours: 8,
            completed: false
          },
          {
            id: 'step-2',
            title: 'Set up GitHub Actions to deploy to AWS Fargate',
            description: 'Automate build-and-deploy steps triggered by git pushes, checking in your tasks.',
            type: 'documentation',
            estimatedHours: 4,
            completed: false
          }
        ],
        aiExplanation: 'Your high learning consistency (+88%) and deep engagement with container network layers strongly align with building cloud delivery platforms. Bridging your Docker networking with declarative provisioning tools like Terraform will bridge your remaining gap.'
      },
      {
        id: 'car-2',
        role: 'DevOps Architect',
        matchPercentage: 86,
        evidence: [
          'Explored CI/CD deployment security controls on StackOverflow.',
          'Studied Kubernetes Pod lifecycles and liveness configurations.',
          'Completed AWS Fargate container service configurations.'
        ],
        skillGaps: ['Prometheus & Grafana (Monitoring)', 'Ansible (Configuration Management)'],
        recommendedRoadmap: [
          {
            id: 'step-3',
            title: 'Configure Prometheus Metrics Scraping',
            description: 'Set up prometheus annotations inside Kubernetes pods to auto-scrape performance graphs.',
            type: 'project',
            estimatedHours: 6,
            completed: false
          }
        ],
        aiExplanation: 'You demonstrate a holistic understanding of how code runs and replicates. Your learning DNA reflects systems-focused documentation reading. Developing observability expertise in metrics aggregation makes you a strong fit for architecting high-reliability pipelines.'
      },
      {
        id: 'car-3',
        role: 'Machine Learning Engineer',
        matchPercentage: 62,
        evidence: [
          'Studied Zero-shot, Few-shot, and Chain-of-Thought Prompt Engineering styles on GitHub.'
        ],
        skillGaps: ['PyTorch (Model Training)', 'Tensor Math (Linear Algebra)', 'Model Deployment/Serving'],
        recommendedRoadmap: [
          {
            id: 'step-4',
            title: 'Deploy an LLM using vLLM',
            description: 'Serve a pre-trained open-source model using optimized vLLM containers and benchmark execution times.',
            type: 'project',
            estimatedHours: 12,
            completed: false
          }
        ],
        aiExplanation: 'While your prompt engineering knowledge is excellent, your actual experience in model training pipeline code is emerging. Expanding your knowledge into model hosting and hardware optimization will accelerate your match.'
      }
    ];
  }
}
