import type { LearningTwinData } from '../types/twin';

export const mockTwinData: LearningTwinData = {
  metrics: {
    confidenceScore: 94,
    consistencyScore: 88,
    knowledgeDepth: 76,
    knowledgeBreadth: 82,
    curiosityIndex: 91,
    researchIntensity: 85,
    learningMomentum: 'High',
  },
  personality: {
    type: 'Systems Thinker',
    description: 'You conceptualize technology as interconnected frameworks. You excel at debugging boundaries, designing scalable backends, and structuring cloud architectures.',
    radarTraits: [
      { trait: 'Systems Architecture', value: 95 },
      { trait: 'Practical Building', value: 88 },
      { trait: 'Theoretical Depth', value: 72 },
      { trait: 'Rapid Research', value: 85 },
      { trait: 'Experimental Curiosity', value: 90 },
    ],
  },
  style: {
    primary: 'Project First',
    description: 'You learn by coding. You typically read documentation in response to compile errors or API design hurdles rather than reading textbooks cover-to-cover.',
  },
  strengths: [
    'Container Orchestration (Kubernetes, ECS)',
    'Infrastructure-as-Code (Terraform)',
    'CI/CD Pipeline Design',
    'React Component Architecture',
    'API Performance Optimization',
  ],
  weakAreas: [
    'Mobile Application Development (Swift/Kotlin)',
    'Low-Level Systems programming (Rust/C++)',
    'Advanced Machine Learning Models (Transformers from scratch)',
  ],
  curiosityPatterns: [
    'Docker Swarm vs. Kubernetes',
    'GitOps with ArgoCD',
    'WebAssembly compilation speeds',
    'Edge compute computing patterns',
  ],
  careerTendencies: [
    'DevOps Architect',
    'Site Reliability Engineer',
    'Cloud Platform Engineer',
    'Lead Full Stack Engineer',
  ],
  aiSummary: 'You learn primarily through experimentation and implementation. Your recent activity shows increasing focus on cloud-native systems, infrastructure engineering, and scalable architectures. You bridge frontend rendering with complex deployment pipelines.',
};
