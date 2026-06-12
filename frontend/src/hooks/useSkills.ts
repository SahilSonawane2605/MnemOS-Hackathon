import { useApp } from '../context/AppContext';

export function useSkills() {
  const { skills, isLoading } = useApp();

  const safeSkills = Array.isArray(skills) ? skills : [];

  const getRadarData = () => {
    if (safeSkills.length === 0) {
      return [
        { subject: 'Python', A: 80, B: 75, fullMark: 100 },
        { subject: 'OpenCV', A: 85, B: 80, fullMark: 100 },
        { subject: 'AI/ML', A: 70, B: 65, fullMark: 100 },
        { subject: 'Problem Solving', A: 90, B: 85, fullMark: 100 }
      ];
    }

    return safeSkills.map((skill: any) => ({
      subject: skill.name || skill.skill || 'Unknown',
      A: skill.level || 50,
      B: skill.confidenceScore || 50,
      fullMark: 100
    }));
  };

  const getHistoricalLineData = () => {
    return [
      { date: 'Week 1', Learning: 20 },
      { date: 'Week 2', Learning: 40 },
      { date: 'Week 3', Learning: 60 },
      { date: 'Week 4', Learning: 80 }
    ];
  };

  const getTopSkills = () => {
    return [...safeSkills]
      .sort((a: any, b: any) => (b.level || 0) - (a.level || 0))
      .slice(0, 3);
  };

  const getSkillsByMomentum = (_momentum: string) => {
    return safeSkills;
  };

  return {
    skills: safeSkills,
    radarData: getRadarData(),
    lineData: getHistoricalLineData(),
    topSkills: getTopSkills(),
    highMomentum: getSkillsByMomentum('High'),
    mediumMomentum: getSkillsByMomentum('Medium'),
    emergingMomentum: getSkillsByMomentum('Emerging'),
    isLoading
  };
}