import React from 'react';
import { ResumeData } from '../../../types/resume';
import { ExternalLink, ShieldCheck } from 'lucide-react';

export interface TemplateProps {
  resume: ResumeData;
  showEvidenceBadges?: boolean;
}

export const CleanTemplate: React.FC<TemplateProps> = ({
  resume,
  showEvidenceBadges = true,
}) => {
  const { contact, summary, skills, projects, experience, education, certifications, achievements, evidenceHighlights } = resume;

  return (
    <div className="bg-white text-[#101828] p-8 sm:p-12 font-sans max-w-[850px] mx-auto text-left leading-relaxed">
      {/* Evidence Verification Banner */}
      {showEvidenceBadges && (
        <div className="mb-6 pb-3 border-b border-[#E8E6DF] flex items-center justify-between text-xs text-[#5B5BD6] print:hidden">
          <span className="flex items-center gap-1.5 font-semibold">
            <ShieldCheck className="w-4 h-4 text-[#5B5BD6]" />
            Built from your Career Evidence ({resume.evidenceCitationCount} verified artifacts)
          </span>
          <span className="text-[#667085] text-[11px]">Clean Template • Verified Micro-Proof</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-[#E8E6DF] pb-5 mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#101828] mb-1">
          {contact.fullName}
        </h1>
        <p className="text-base font-semibold text-[#5B5BD6] mb-2.5">
          {resume.targetRole}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#475467]">
          {contact.email && <span>{contact.email}</span>}
          {contact.phone && <span>• {contact.phone}</span>}
          {contact.location && <span>• {contact.location}</span>}
          {contact.linkedinUrl && (
            <span>
              • <a href={`https://${contact.linkedinUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-[#5B5BD6] hover:underline">{contact.linkedinUrl}</a>
            </span>
          )}
          {contact.githubUrl && (
            <span>
              • <a href={`https://${contact.githubUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-[#5B5BD6] hover:underline">{contact.githubUrl}</a>
            </span>
          )}
          {contact.portfolioUrl && (
            <span>
              • <a href={`https://${contact.portfolioUrl.replace(/^https?:\/\//, '')}`} target="_blank" rel="noreferrer" className="text-[#5B5BD6] hover:underline">{contact.portfolioUrl}</a>
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-[#344054] leading-relaxed">
            {summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {(skills.technical.length > 0 || skills.toolsAndFrameworks.length > 0) && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2.5">
            Core Skills & Competencies
          </h2>
          <div className="space-y-1.5 text-xs text-[#344054]">
            {skills.technical.length > 0 && (
              <div>
                <strong className="font-semibold text-[#101828]">Technical: </strong>
                <span>{skills.technical.join(', ')}</span>
              </div>
            )}
            {skills.toolsAndFrameworks.length > 0 && (
              <div>
                <strong className="font-semibold text-[#101828]">Tools & Platforms: </strong>
                <span>{skills.toolsAndFrameworks.join(', ')}</span>
              </div>
            )}
            {skills.softAndProfessional.length > 0 && (
              <div>
                <strong className="font-semibold text-[#101828]">Professional Practices: </strong>
                <span>{skills.softAndProfessional.join(', ')}</span>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              Featured Projects (Built from Evidence)
            </h2>
            {showEvidenceBadges && (
              <span className="text-[10px] text-[#21B47A] font-semibold flex items-center gap-1 print:hidden">
                <ShieldCheck className="w-3 h-3" />
                Verified Artifacts
              </span>
            )}
          </div>

          <div className="space-y-4">
            {projects.map((proj) => (
              <div key={proj.id} className="text-left">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-[#101828]">
                      {proj.title}
                    </h3>
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#5B5BD6] hover:underline inline-flex items-center gap-0.5 print:hidden"
                      >
                        [Live/Code] <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                  {proj.role && (
                    <span className="text-xs text-[#667085] font-medium">
                      {proj.role}
                    </span>
                  )}
                </div>

                <div className="text-[11px] font-medium text-[#5B5BD6] mb-1.5">
                  Stack: {proj.techStack.join(', ')}
                </div>

                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#344054]">
                  {proj.bullets.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {bullet}
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
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-3">
            Experience & Practicum
          </h2>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex flex-wrap items-baseline justify-between gap-1">
                  <div>
                    <h3 className="text-sm font-bold text-[#101828]">
                      {exp.role}
                    </h3>
                    <span className="text-xs font-semibold text-[#5B5BD6]">
                      {exp.company}
                    </span>
                  </div>
                  <span className="text-xs text-[#667085]">
                    {exp.startDate} – {exp.endDate} | {exp.location}
                  </span>
                </div>

                <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#344054] mt-2">
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
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-3">
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex flex-wrap items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-sm font-bold text-[#101828]">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h3>
                  <p className="text-xs text-[#475467]">{edu.institution}</p>
                  {edu.honors && (
                    <p className="text-[11px] text-[#667085] italic mt-0.5">{edu.honors}</p>
                  )}
                </div>
                <span className="text-xs text-[#667085]">
                  {edu.startDate} – {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications & Achievements */}
      {(certifications.length > 0 || achievements.length > 0) && (
        <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#E8E6DF]">
          {certifications.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2">
                Certifications
              </h2>
              <div className="space-y-1.5 text-xs text-[#344054]">
                {certifications.map((c) => (
                  <div key={c.id}>
                    <strong className="font-semibold text-[#101828]">{c.name}</strong>
                    <div className="text-[11px] text-[#667085]">{c.issuer} ({c.issueDate})</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {achievements.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-2">
                Achievements & Accreditations
              </h2>
              <div className="space-y-1.5 text-xs text-[#344054]">
                {achievements.map((a) => (
                  <div key={a.id}>
                    <strong className="font-semibold text-[#101828]">{a.title}</strong>
                    <p className="text-[11px] text-[#667085] leading-snug">{a.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Footer stamp */}
      <footer className="mt-8 pt-4 border-t border-[#F2F4F7] text-[10px] text-[#98A2B3] flex items-center justify-between">
        <span>Verified with CareerOS Career Evidence Vault</span>
        <span>Never Invented Information • Real Proof</span>
      </footer>
    </div>
  );
};
