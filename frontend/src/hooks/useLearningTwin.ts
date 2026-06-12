import { useApp } from '../context/AppContext';

export function useLearningTwin() {
  const { twinData, careerInsights, isLoading } = useApp();

  const getMetricDetails = () => {
  if (!twinData) return [];

  return [
    {
      id: 'm-confidence',
      label: 'Twin Confidence',
      value: '85%',
      description: 'Model alignment with user actions',
      type: 'accent'
    },
    {
      id: 'm-consistency',
      label: 'Learning Consistency',
      value: `${Math.min((twinData.totalMemories || 0) * 8, 100)}/100`,
      description: 'Regularity of knowledge intake',
      type: 'secondary'
    },
    {
      id: 'm-depth',
      label: 'Knowledge Depth',
      value: `${Math.min((twinData.totalMemories || 0) * 10, 100)}%`,
      description: 'Core mastery of explored concepts',
      type: 'accent'
    },
    {
      id: 'm-breadth',
      label: 'Knowledge Breadth',
      value: '65/100',
      description: 'Variety of tech domains explored',
      type: 'secondary'
    },
    {
      id: 'm-curiosity',
      label: 'Curiosity Index',
      value: `${twinData.curiosityScore || 40}/100`,
      description: 'Exploration rate of new topics',
      type: 'accent'
    },
    {
      id: 'm-research',
      label: 'Research Intensity',
      value: `${twinData.learningMomentum || 30}%`,
      description: 'Ratio of docs/papers read vs code',
      type: 'secondary'
    }
  ];
};

  const getOrbNodes = () => {
    // Collect active topics to display as orbiting points around the AI Twin Orb
    return [
      { label: 'Docker', size: 14, angle: 0, speed: 0.8, color: '#7CF4FF', distance: 100 },
      { label: 'Kubernetes', size: 18, angle: 72, speed: 0.5, color: '#D7FF00', distance: 130 },
      { label: 'Fargate', size: 12, angle: 144, speed: 1.2, color: '#7CF4FF', distance: 90 },
      { label: 'React RSC', size: 15, angle: 216, speed: 0.6, color: '#D7FF00', distance: 120 },
      { label: 'IaC', size: 11, angle: 288, speed: 1.0, color: '#ffffff', distance: 150 },
    ];
  };

  return {
    twinData,
    metricsList: getMetricDetails(),
    orbNodes: getOrbNodes(),
    careerInsights,
    isLoading
  };
}
