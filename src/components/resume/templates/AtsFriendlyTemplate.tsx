import React from 'react';
import { ResumeData } from '../../../types/resume';

export interface TemplateProps {
  resume: ResumeData;
  showEvidenceBadges?: boolean;
}

export const AtsFriendlyTemplate: React.FC<TemplateProps> = ({
  resume,
  showEvidenceBadges = false,
}) => {
  const { contact, summary, skills, projects, experience, education, certifications, achievements } = resume;

  return (
    <div className="bg-white text-black p-8 sm:p-12 font-sans max-w-[850px] mx-auto text-left leading-normal selection:bg-gray-200">
      {/* ATS Header Note (Hidden in print) */}
      <div className="mb-4 pb-2 border-b border-gray-300 text-xs text-gray-500 flex items-center justify-between print:hidden">
        <span>ATS-Optimized Single-Column Format • Machine Parseable Hierarchy</span>
        <span>Built from {resume.evidenceCitationCount} Verified Career Evidence Artifacts</span>
      </div>

      {/* Header */}
      <header className="mb-4 pb-2 border-b border-black">
        <h1 className="text-2xl font-bold tracking-normal uppercase mb-1">
          {contact.fullName}
        </h1>
        <p className="text-sm font-semibold mb-1">
          {resume.targetRole}
        </p>

        <p className="text-xs text-gray-800">
          {[contact.location, contact.phone, contact.email, contact.linkedinUrl, contact.githubUrl, contact.portfolioUrl]
            .filter(Boolean)
            .join(' | ')}
        </p>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1.5">
            PROFESSIONAL SUMMARY
          </h2>
          <p className="text-xs text-black leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Technical Skills */}
      {(skills.technical.length > 0 || skills.toolsAndFrameworks.length > 0) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1.5">
            TECHNICAL & PROFESSIONAL SKILLS
          </h2>
          <div className="text-xs space-y-1">
            {skills.technical.length > 0 && (
              <p>
                <strong>Technical Skills: </strong>
                {skills.technical.join(', ')}
              </p>
            )}
            {skills.toolsAndFrameworks.length > 0 && (
              <p>
                <strong>Tools & Frameworks: </strong>
                {skills.toolsAndFrameworks.join(', ')}
              </p>
            )}
            {skills.softAndProfessional.length > 0 && (
              <p>
                <strong>Professional Practices: </strong>
                {skills.softAndProfessional.join(', ')}
              </p>
            )}
          </div>
        </section>
      )}

      {/* Technical Projects */}
      {projects.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-2">
            TECHNICAL PROJECTS (VERIFIED ARTIFACTS)
          </h2>

          <div className="space-y-3">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-wrap justify-between items-baseline text-xs">
                  <strong>
                    {proj.title} {proj.role && `— ${proj.role}`}
                  </strong>
                  <span className="text-gray-700">
                    {proj.techStack.join(', ')}
                  </span>
                </div>
                {proj.link && (
                  <p className="text-[11px] text-gray-700">
                    Project Repository / Live URL: {proj.link}
                  </p>
                )}
                <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-black mt-1">
                  {proj.bullets.map((b, idx) => (
                    <li key={idx}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Professional Experience */}
      {experience.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-2">
            EXPERIENCE & FELLOWSHIP
          </h2>

          <div className="space-y-3">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap justify-between items-baseline text-xs">
                  <strong>
                    {exp.role} — {exp.company}
                  </strong>
                  <span className="text-gray-700">
                    {exp.startDate} – {exp.endDate} | {exp.location}
                  </span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs text-black mt-1">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1.5">
            EDUCATION
          </h2>

          <div className="space-y-1.5 text-xs">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex flex-wrap justify-between items-baseline">
                  <strong>
                    {edu.degree} in {edu.fieldOfStudy}
                  </strong>
                  <span className="text-gray-700">
                    {edu.startDate} – {edu.endDate}
                  </span>
                </div>
                <p className="text-gray-800">
                  {edu.institution} {edu.honors && `| ${edu.honors}`}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1">
            CERTIFICATIONS & CREDENTIALS
          </h2>
          <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs">
            {certifications.map((c) => (
              <li key={c.id}>
                <strong>{c.name}</strong> — {c.issuer} ({c.issueDate})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Achievements */}
      {achievements.length > 0 && (
        <section className="mb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider border-b border-gray-400 pb-0.5 mb-1">
            KEY ACHIEVEMENTS
          </h2>
          <ul className="list-disc list-outside pl-4 space-y-0.5 text-xs">
            {achievements.map((ach) => (
              <li key={ach.id}>
                <strong>{ach.title}: </strong>{ach.description}
              </li>
            ))}
          </ul>
        </section>
      )}

      <footer className="pt-2 border-t border-gray-300 text-[10px] text-gray-500 flex justify-between font-mono">
        <span>ATS VERIFIED PARSE PROFILE</span>
        <span>CAREEROS PROOF SYSTEM</span>
      </footer>
    </div>
  );
};
