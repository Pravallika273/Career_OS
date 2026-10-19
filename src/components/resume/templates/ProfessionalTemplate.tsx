import React from 'react';
import { ResumeData } from '../../../types/resume';
import { ShieldCheck } from 'lucide-react';

export interface TemplateProps {
  resume: ResumeData;
  showEvidenceBadges?: boolean;
}

export const ProfessionalTemplate: React.FC<TemplateProps> = ({
  resume,
  showEvidenceBadges = true,
}) => {
  const { contact, summary, skills, projects, experience, education, certifications, achievements } = resume;

  return (
    <div className="bg-white text-[#101828] p-8 sm:p-12 font-sans max-w-[850px] mx-auto text-left leading-relaxed">
      {/* Evidence Verification Header */}
      {showEvidenceBadges && (
        <div className="mb-4 pb-2 border-b-2 border-[#101828] flex items-center justify-between text-xs font-semibold print:hidden">
          <span className="flex items-center gap-1.5 text-[#101828]">
            <ShieldCheck className="w-4 h-4 text-[#027A48]" />
            CAREEROS VERIFIED RESUME • Built from {resume.evidenceCitationCount} Authenticated Evidence Items
          </span>
          <span className="text-[11px] text-[#667085] uppercase tracking-wider font-mono">
            Professional Corporate Standard
          </span>
        </div>
      )}

      {/* Header */}
      <header className="text-center pb-4 mb-5 border-b border-[#D0D5DD]">
        <h1 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#101828] mb-1 font-serif">
          {contact.fullName}
        </h1>
        <p className="text-sm font-semibold tracking-wide text-[#344054] uppercase mb-2">
          {resume.targetRole}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-[#475467]">
          {contact.location && <span>{contact.location}</span>}
          {contact.phone && <span>| {contact.phone}</span>}
          {contact.email && <span>| {contact.email}</span>}
          {contact.linkedinUrl && <span>| {contact.linkedinUrl}</span>}
          {contact.githubUrl && <span>| {contact.githubUrl}</span>}
          {contact.portfolioUrl && <span>| {contact.portfolioUrl}</span>}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#101828] border-b border-[#101828] pb-1 mb-2 font-serif">
            Executive Summary
          </h2>
          <p className="text-xs sm:text-sm text-[#344054] leading-relaxed text-justify">
            {summary}
          </p>
        </section>
      )}

      {/* Core Competencies & Skills */}
      {(skills.technical.length > 0 || skills.toolsAndFrameworks.length > 0) && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#101828] border-b border-[#101828] pb-1 mb-2 font-serif">
            Core Competencies & Technical Skills
          </h2>
          <div className="grid grid-cols-1 gap-1 text-xs text-[#344054]">
            {skills.technical.length > 0 && (
              <div>
                <strong className="font-semibold text-[#101828]">Languages & Core Tech: </strong>
                {skills.technical.join(', ')}
              </div>
            )}
            {skills.toolsAndFrameworks.length > 0 && (
              <div>
                <strong className="font-semibold text-[#101828]">Development Tools & Environment: </strong>
                {skills.toolsAndFrameworks.join(', ')}
              </div>
            )}
            {skills.softAndProfessional.length > 0 && (
              <div>
                <strong className="font-semibold text-[#101828]">Professional Methodology: </strong>
                {skills.softAndProfessional.join(', ')}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#101828] border-b border-[#101828] pb-1 mb-2.5 font-serif">
            Engineering Projects & Deliverables
          </h2>

          <div className="space-y-3.5">
            {projects.map((proj) => (
              <div key={proj.id}>
                <div className="flex flex-wrap items-baseline justify-between">
                  <span className="text-xs sm:text-sm font-bold text-[#101828]">
                    {proj.title} {proj.role && <span className="font-normal text-[#475467]">| {proj.role}</span>}
                  </span>
                  <span className="text-xs text-[#475467] font-medium">
                    {proj.techStack.join(', ')}
                  </span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#344054] mt-1.5">
                  {proj.bullets.map((b, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#101828] border-b border-[#101828] pb-1 mb-2.5 font-serif">
            Professional Experience & Fellowship
          </h2>

          <div className="space-y-3.5">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between">
                  <span className="text-xs sm:text-sm font-bold text-[#101828]">
                    {exp.role} — <span className="font-semibold text-[#344054]">{exp.company}</span>
                  </span>
                  <span className="text-xs text-[#475467] font-medium">
                    {exp.startDate} – {exp.endDate} ({exp.location})
                  </span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#344054] mt-1.5">
                  {exp.bullets.map((b, idx) => (
                    <li key={idx} className="leading-relaxed">
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
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#101828] border-b border-[#101828] pb-1 mb-2 font-serif">
            Education
          </h2>

          <div className="space-y-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-wrap items-baseline justify-between">
                <div>
                  <span className="text-xs sm:text-sm font-bold text-[#101828]">
                    {edu.degree} in {edu.fieldOfStudy}
                  </span>
                  <div className="text-xs text-[#475467]">
                    {edu.institution} {edu.honors && `— ${edu.honors}`}
                  </div>
                </div>
                <span className="text-xs text-[#475467]">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Accreditations */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <section className="mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#101828] border-b border-[#101828] pb-1 mb-2 font-serif">
            Credentials & Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#344054]">
            {certifications.map((c) => (
              <div key={c.id}>
                <strong>{c.name}</strong>
                <div className="text-[11px] text-[#667085]">{c.issuer} | {c.issueDate}</div>
              </div>
            ))}
            {achievements.map((a) => (
              <div key={a.id}>
                <strong>{a.title}</strong>
                <div className="text-[11px] text-[#667085]">{a.description}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      <footer className="pt-3 border-t border-[#E8E6DF] text-[10px] text-[#98A2B3] flex items-center justify-between font-mono">
        <span>CAREEROS PROOF ENGINE</span>
        <span>VERIFIED RECORD • ZERO FABRICATION</span>
      </footer>
    </div>
  );
};
