import React from 'react';
import { ResumeData } from '../../types/resume';
import { CleanTemplate } from './templates/CleanTemplate';
import { ProfessionalTemplate } from './templates/ProfessionalTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { AtsFriendlyTemplate } from './templates/AtsFriendlyTemplate';

export interface ResumeRendererProps {
  resume: ResumeData;
  scale?: number;
  showEvidenceBadges?: boolean;
}

export const ResumeRenderer: React.FC<ResumeRendererProps> = ({
  resume,
  scale = 1,
  showEvidenceBadges = true,
}) => {
  const renderTemplate = () => {
    switch (resume.templateId) {
      case 'professional':
        return <ProfessionalTemplate resume={resume} showEvidenceBadges={showEvidenceBadges} />;
      case 'modern':
        return <ModernTemplate resume={resume} showEvidenceBadges={showEvidenceBadges} />;
      case 'ats_friendly':
        return <AtsFriendlyTemplate resume={resume} showEvidenceBadges={showEvidenceBadges} />;
      case 'clean':
      default:
        return <CleanTemplate resume={resume} showEvidenceBadges={showEvidenceBadges} />;
    }
  };

  return (
    <div
      id="printable-resume-container"
      className="origin-top transition-transform duration-150"
      style={{
        transform: scale !== 1 ? `scale(${scale})` : undefined,
      }}
    >
      <div className="shadow-lg rounded-xl border border-[#E8E6DF] bg-white overflow-hidden print:shadow-none print:border-none print:rounded-none">
        {renderTemplate()}
      </div>
    </div>
  );
};
