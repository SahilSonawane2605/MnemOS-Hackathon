import type { ChatMessage, ChatHistoryItem } from '../types/chat';

export const mockSuggestedPrompts: string[] = [
  'What did I learn this week?',
  'What are my strongest skills?',
  'What should I learn next?',
  'Summarize my last 30 days.',
  'Which career path matches my learning behavior?',
  'How has my learning evolved?'
];

export const mockChatHistory: ChatHistoryItem[] = [
  { id: 'ch-1', title: 'Container Networking Deep Dive', timestamp: '2 hours ago' },
  { id: 'ch-2', title: 'React Server Components vs Hydration', timestamp: '1 day ago' },
  { id: 'ch-3', title: 'AWS ECS task execution IAM issues', timestamp: '3 days ago' },
  { id: 'ch-4', title: 'Prompt engineering guidelines review', timestamp: '5 days ago' }
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'm-1',
    sender: 'user',
    content: 'Summarize my last 30 days.',
    timestamp: '2 hours ago'
  },
  {
    id: 'm-2',
    sender: 'assistant',
    content: `Based on your recent online activity, you have been actively acquiring depth in **Cloud-Native Systems**, specifically container runtime orchestration and network configuration.

In the last 30 days, your learning patterns show:
1. **Container Networking Fundamentals**: You spent multiple sessions reviewing custom Docker bridge interfaces and Docker overlay configurations, resolving how containers address each other across hosts.
2. **Kubernetes Pod Lifecycle & Specs**: You read through Kubernetes core specifications, focusing on configuring liveness/readiness probes and ServiceAccount binding behaviors.
3. **AWS ECS Fargate Deployments**: You explored serverless deployments of Docker containers on AWS, focusing on Application Load Balancer configurations and Task execution role setups.

Your intellectual twin suggests a clear pivot towards Infrastructure as Code (IaC) and automation, as your current momentum in container orchestration is high.`,
    timestamp: '2 hours ago',
    citations: [
      {
        id: 'mem-1',
        topic: 'Docker Networking',
        source: 'YouTube',
        confidenceScore: 94,
        snippet: 'Explored docker bridge network creation, host networking mode, overlay networks, and port mapping.'
      },
      {
        id: 'mem-2',
        topic: 'Kubernetes Basics & Pods',
        source: 'Documentation',
        confidenceScore: 89,
        snippet: 'Studied Pod lifecycle, containers, readiness/liveness probes, and resource configurations.'
      }
    ]
  }
];
