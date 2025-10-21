import React, { useState } from 'react';
import { HiOutlineSparkles, HiOutlineCheckCircle, HiOutlineClock, HiOutlineExclamationCircle, HiOutlineLightBulb, HiOutlineArrowRight, HiOutlineTrophy } from 'react-icons/hi2';
import Card from '../ui/Card';
import Button from '../ui/Button';

const UniversityMatches = ({ sections, universities }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  // Calculate profile strength based on completed sections
  const calculateProfileStrength = () => {
    const completed = sections.filter(s => s.completed).length;
    const total = sections.length;
    return Math.round((completed / total) * 100);
  };

  // Calculate match score for each university
  const calculateMatches = () => {
    const profileStrength = calculateProfileStrength();
    const completedSections = sections.filter(s => s.completed);

    return universities.map(uni => {
      // Base match score on profile completion and requirements
      let matchScore = 0;
      const gaps = [];
      const strengths = [];
      const actionSteps = [];

      // Check essential sections
      const hasPersonal = completedSections.some(s => s.id === 'personal');
      const hasEducation = completedSections.some(s => s.id === 'education');
      const hasLanguages = completedSections.some(s => s.id === 'languages');
      const hasStatement = completedSections.some(s => s.id === 'statement');
      const hasExperience = completedSections.some(s => s.id === 'experience');
      const hasReferences = completedSections.some(s => s.id === 'references');

      // Personal info (10%)
      if (hasPersonal) {
        matchScore += 10;
        strengths.push('Personal information complete');
      } else {
        gaps.push({
          area: 'Personal Information',
          impact: 'High',
          description: 'Basic personal details are required for all applications'
        });
        actionSteps.push({
          action: 'Complete personal information section',
          timeframe: '5 minutes',
          priority: 'Critical'
        });
      }

      // Education (30%)
      if (hasEducation) {
        matchScore += 30;
        strengths.push('Academic background documented');
      } else {
        gaps.push({
          area: 'Educational Background',
          impact: 'Critical',
          description: 'Universities need to see your academic history and grades'
        });
        actionSteps.push({
          action: 'Add your academic qualifications and grades',
          timeframe: '15 minutes',
          priority: 'Critical'
        });
      }

      // Language requirements (15%)
      if (hasLanguages) {
        matchScore += 15;
        strengths.push('Language proficiency confirmed');
      } else {
        gaps.push({
          area: 'Language Proficiency',
          impact: 'High',
          description: 'English language test scores (IELTS/TOEFL) are required for international students'
        });
        actionSteps.push({
          action: 'Take IELTS or TOEFL and add your scores',
          timeframe: '2-4 weeks',
          priority: 'High'
        });
      }

      // Personal statement (25%)
      if (hasStatement) {
        matchScore += 25;
        strengths.push('Personal statement ready');
      } else {
        gaps.push({
          area: 'Personal Statement',
          impact: 'Critical',
          description: 'Your story and motivation are essential for admissions'
        });
        actionSteps.push({
          action: 'Write your personal statement explaining why you want to study',
          timeframe: '1-2 weeks',
          priority: 'Critical'
        });
      }

      // Work/volunteer experience (10%)
      if (hasExperience) {
        matchScore += 10;
        strengths.push('Relevant experience documented');
      } else {
        gaps.push({
          area: 'Experience',
          impact: 'Medium',
          description: 'Work experience or volunteering shows commitment and skills'
        });
        actionSteps.push({
          action: 'Add any work experience, internships, or volunteer activities',
          timeframe: '10 minutes',
          priority: 'Medium'
        });
      }

      // References (10%)
      if (hasReferences) {
        matchScore += 10;
        strengths.push('References secured');
      } else {
        gaps.push({
          area: 'References',
          impact: 'High',
          description: 'Academic or professional references validate your achievements'
        });
        actionSteps.push({
          action: 'Request references from teachers or employers',
          timeframe: '1-2 weeks',
          priority: 'High'
        });
      }

      // Determine match level
      let matchLevel = 'Not Ready';
      let matchColor = 'text-red-600';
      let bgColor = 'bg-red-50';
      let borderColor = 'border-red-200';

      if (matchScore >= 80) {
        matchLevel = 'Strong Match';
        matchColor = 'text-green-600';
        bgColor = 'bg-green-50';
        borderColor = 'border-green-200';
      } else if (matchScore >= 60) {
        matchLevel = 'Good Match';
        matchColor = 'text-blue-600';
        bgColor = 'bg-blue-50';
        borderColor = 'border-blue-200';
      } else if (matchScore >= 40) {
        matchLevel = 'Developing';
        matchColor = 'text-yellow-600';
        bgColor = 'bg-yellow-50';
        borderColor = 'border-yellow-200';
      }

      // Calculate estimated time to ready
      const criticalGaps = gaps.filter(g => g.impact === 'Critical').length;
      const highGaps = gaps.filter(g => g.impact === 'High').length;
      const mediumGaps = gaps.filter(g => g.impact === 'Medium').length;

      let estimatedWeeks = 0;
      if (criticalGaps > 0) estimatedWeeks += criticalGaps * 2;
      if (highGaps > 0) estimatedWeeks += highGaps * 1.5;
      if (mediumGaps > 0) estimatedWeeks += mediumGaps * 0.5;

      const timeToReady = estimatedWeeks === 0
        ? 'Ready to apply!'
        : estimatedWeeks < 1
          ? 'Less than 1 week'
          : estimatedWeeks < 4
            ? `${Math.ceil(estimatedWeeks)} weeks`
            : `${Math.ceil(estimatedWeeks / 4)} months`;

      return {
        ...uni,
        matchScore,
        matchLevel,
        matchColor,
        bgColor,
        borderColor,
        gaps,
        strengths,
        actionSteps,
        timeToReady,
        estimatedWeeks
      };
    }).sort((a, b) => b.matchScore - a.matchScore); // Sort by match score
  };

  const matches = calculateMatches();
  const profileStrength = calculateProfileStrength();

  return (
    <div className="space-y-6">
      {/* Profile Strength Overview */}
      <Card className="bg-gradient-to-r from-primary-blue to-accent-blue text-white p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineTrophy size={28} />
              <h2 className="text-2xl font-bold">Your Match Profile</h2>
            </div>
            <p className="text-blue-100 mb-4">
              We've analyzed your profile against university requirements. Complete the missing sections to unlock better matches!
            </p>

            {/* Profile Strength Bar */}
            <div className="bg-white/20 rounded-full h-3 overflow-hidden mb-2">
              <div
                className="h-full bg-primary-gold transition-all duration-500"
                style={{ width: `${profileStrength}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>Profile Strength: {profileStrength}%</span>
              <span>{sections.filter(s => s.completed).length}/{sections.length} sections complete</span>
            </div>
          </div>

          <div className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-4 min-w-[100px]">
            <div className="text-4xl mb-2">
              {profileStrength >= 80 ? '🎯' : profileStrength >= 60 ? '📈' : profileStrength >= 40 ? '🌱' : '🚀'}
            </div>
            <p className="text-xs font-semibold">
              {profileStrength >= 80 ? 'Excellent' : profileStrength >= 60 ? 'Very Good' : profileStrength >= 40 ? 'Good Start' : 'Getting Started'}
            </p>
          </div>
        </div>
      </Card>

      {/* University Matches */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <HiOutlineSparkles className="text-primary-gold" size={24} />
          University Matches for You
        </h3>

        {matches.map((match) => (
          <Card key={match.id} className={`border-2 ${match.borderColor} ${match.bgColor}`}>
            <div className="p-6">
              {/* University Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-4xl">{match.logo}</div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900 mb-1">{match.name}</h4>
                    <p className="text-sm text-gray-600">📍 {match.location}</p>
                  </div>
                </div>

                <div className={`${match.bgColor} ${match.borderColor} border-2 rounded-xl px-4 py-2 text-center min-w-[140px]`}>
                  <div className={`text-2xl font-bold ${match.matchColor}`}>{match.matchScore}%</div>
                  <div className={`text-xs font-semibold ${match.matchColor}`}>{match.matchLevel}</div>
                </div>
              </div>

              {/* Time to Ready */}
              <div className="bg-white rounded-lg p-3 mb-4 flex items-center gap-3">
                <HiOutlineClock className={match.matchColor} size={24} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Time to application-ready</p>
                  <p className={`text-lg font-bold ${match.matchColor}`}>{match.timeToReady}</p>
                </div>
              </div>

              {/* Strengths */}
              {match.strengths.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <HiOutlineCheckCircle className="text-green-500" size={18} />
                    Your Strengths
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {match.strengths.map((strength, idx) => (
                      <div key={idx} className="text-sm text-gray-700 flex items-center gap-2 bg-white rounded px-3 py-1">
                        <span className="text-green-500">✓</span>
                        {strength}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Gaps */}
              {match.gaps.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <HiOutlineExclamationCircle className={match.matchColor} size={18} />
                    What's Missing
                  </p>
                  <div className="space-y-2">
                    {match.gaps.map((gap, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border border-gray-200">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="text-sm font-semibold text-gray-900">{gap.area}</p>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            gap.impact === 'Critical' ? 'bg-red-100 text-red-700' :
                            gap.impact === 'High' ? 'bg-orange-100 text-orange-700' :
                            'bg-yellow-100 text-yellow-700'
                          }`}>
                            {gap.impact} Impact
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{gap.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Steps */}
              {match.actionSteps.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <HiOutlineLightBulb className="text-primary-gold" size={18} />
                    Your Path Forward
                  </p>
                  <div className="space-y-2">
                    {match.actionSteps.map((step, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-3 border-l-4 border-primary-gold">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="bg-primary-gold text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {idx + 1}
                              </span>
                              <p className="text-sm font-semibold text-gray-900">{step.action}</p>
                            </div>
                            <div className="flex items-center gap-3 ml-7">
                              <span className="text-xs text-gray-600 flex items-center gap-1">
                                <HiOutlineClock size={12} />
                                {step.timeframe}
                              </span>
                              <span className={`text-xs px-2 py-0.5 rounded-full ${
                                step.priority === 'Critical' ? 'bg-red-100 text-red-700' :
                                step.priority === 'High' ? 'bg-orange-100 text-orange-700' :
                                'bg-blue-100 text-blue-700'
                              }`}>
                                {step.priority}
                              </span>
                            </div>
                          </div>
                          <HiOutlineArrowRight className="text-primary-gold mt-1" size={20} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Success Message */}
              {match.matchScore >= 80 && (
                <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <HiOutlineTrophy className="text-green-600 mt-0.5" size={24} />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-green-900 mb-1">You're ready to apply! 🎉</p>
                      <p className="text-sm text-green-700">
                        Your profile meets the requirements for {match.name}. You can now submit your application with confidence.
                      </p>
                      <Button size="small" className="mt-3 bg-green-600 hover:bg-green-700">
                        Start Application →
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Motivational Footer */}
      {profileStrength < 80 && (
        <Card className="bg-gradient-to-r from-primary-gold to-yellow-500 text-white p-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">💪</div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">You're on your way!</h3>
              <p className="text-yellow-100 text-sm">
                Every section you complete brings you closer to your dream university. Take it one step at a time, and you'll get there!
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default UniversityMatches;
