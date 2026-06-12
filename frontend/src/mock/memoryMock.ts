import type { LearningMemory, RawTelemetryEvent } from '../types/memory';

export const mockMemories: LearningMemory[] = [
  {
    id: 'mem-1',
    topic: 'Docker Networking',
    source: 'YouTube',
    sourceUrl: 'https://youtube.com/watch?v=docker-networking-deep-dive',
    confidenceScore: 94,
    date: 'Jun 10, 2026',
    skillImpact: '+4 Cloud Computing',
    aiSummary: 'Explored docker bridge network creation, host networking mode, overlay networks for multi-host communication, and port mapping mechanisms. Built custom networking bridges to isolate DB services.',
  },
  {
    id: 'mem-2',
    topic: 'Kubernetes Basics & Pods',
    source: 'Documentation',
    sourceUrl: 'https://kubernetes.io/docs/concepts/workloads/pods/',
    confidenceScore: 89,
    date: 'Jun 08, 2026',
    skillImpact: '+5 DevOps',
    aiSummary: 'Studied Pod lifecycle, container specifications, init containers, volume mounts, and readiness/liveness probes. Understood pod resource allocations and scheduling basics.',
  },
  {
    id: 'mem-3',
    topic: 'AWS ECS Fargate Deployments',
    source: 'Documentation',
    sourceUrl: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html',
    confidenceScore: 91,
    date: 'Jun 05, 2026',
    skillImpact: '+3 Cloud Computing',
    aiSummary: 'Deployed task definitions and services in serverless containers without managing EC2 instances. Configured Application Load Balancers, Target Groups, and IAM roles for Fargate tasks.',
  },
  {
    id: 'mem-4',
    topic: 'React Server Components',
    source: 'Medium',
    sourceUrl: 'https://medium.com/engineering/react-rsc-architecture',
    confidenceScore: 92,
    date: 'May 28, 2026',
    skillImpact: '+4 Web Development',
    aiSummary: 'Analyzed the difference between Client and Server Components. Learned hydration strategies, data fetching directly on the server, streaming HTML responses, and reducing client-side bundle size.',
  },
  {
    id: 'mem-5',
    topic: 'Prompt Engineering Techniques',
    source: 'GitHub',
    sourceUrl: 'https://github.com/dair-ai/Prompt-Engineering-Guide',
    confidenceScore: 95,
    date: 'May 20, 2026',
    skillImpact: '+6 AI/ML',
    aiSummary: 'Studied Zero-shot, Few-shot, Chain-of-Thought, and Self-Consistency prompting paradigms. Applied structural patterns (like XML tagging and System Role styling) to refine LLM generation accuracy.',
  },
  {
    id: 'mem-6',
    topic: 'Container Orchestration Security',
    source: 'StackOverflow',
    sourceUrl: 'https://stackoverflow.com/questions/tagged/kubernetes-security',
    confidenceScore: 87,
    date: 'May 15, 2026',
    skillImpact: '+3 Cybersecurity',
    aiSummary: 'Researched Kubernetes RBAC setups, ServiceAccount token bindings, NetworkPolicies to restrict ingress/egress traffic, and rootless container executions.',
  }
];

export const mockTelemetryEvents: RawTelemetryEvent[] = [
  {
    id: 'tel-1',
    url: 'https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/',
    title: 'Configure Liveness, Readiness and Startup Probes | Kubernetes',
    timestamp: '2026-06-11T22:50:00Z',
    status: 'Analyzing',
    classification: 'DevOps / Kubernetes',
    confidenceScore: 95
  },
  {
    id: 'tel-2',
    url: 'https://www.youtube.com/watch?v=R9VvWd9Z7yY',
    title: 'Docker Networking Tutorial - Host, Bridge, Overlay, Macvlan',
    timestamp: '2026-06-11T22:45:00Z',
    status: 'Processed',
    classification: 'Cloud Computing / Container Networking',
    confidenceScore: 94
  },
  {
    id: 'tel-3',
    url: 'https://github.com/hashicorp/terraform-provider-aws',
    title: 'GitHub - hashicorp/terraform-provider-aws: Terraform AWS provider',
    timestamp: '2026-06-11T22:38:00Z',
    status: 'Syncing',
    classification: 'Cloud Computing / IaC',
    confidenceScore: 89
  },
  {
    id: 'tel-4',
    url: 'https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API',
    title: 'Using Web Workers - Web APIs | MDN',
    timestamp: '2026-06-11T22:30:00Z',
    status: 'Processed',
    classification: 'Web Development / Browser APIs',
    confidenceScore: 90
  },
  {
    id: 'tel-5',
    url: 'https://arxiv.org/abs/2303.08774',
    title: '[2303.08774] GPT-4 Technical Report',
    timestamp: '2026-06-11T22:15:00Z',
    status: 'Processed',
    classification: 'AI/ML / Deep Learning',
    confidenceScore: 96
  }
];
