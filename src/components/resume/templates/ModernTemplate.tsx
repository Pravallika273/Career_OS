import React from 'react';
import { ResumeData } from '../../../types/resume';
import { ShieldCheck, ExternalLink, Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

export interface TemplateProps {
  resume: ResumeData;
  showEvidenceBadges?: boolean;
}

export const ModernTemplate: React.FC<TemplateProps> = ({
  resume,
  showEvidenceBadges = true,
}) => {
  const { contact, summary, skills, projects, experience, education, certifications, achievements } = resume;

  return (
    <div className="bg-white text-[#101828] p-8 sm:p-10 font-sans max-w-[850px] mx-auto text-left leading-relaxed">
      {/* Evidence Verification Bar */}
      {showEvidenceBadges && (
        <div className="mb-6 p-2.5 rounded-lg bg-[#F0EEFF] border border-[#E0E0FC] flex items-center justify-between text-xs text-[#5B5BD6] print:hidden">
          <span className="flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-4 h-4 text-[#5B5BD6]" />
            Built from your Career Evidence • {resume.evidenceCitationCount} Verified Deliverables
          </span>
          <span className="text-[11px] bg-white px-2 py-0.5 rounded text-[#5B5BD6] font-semibold border border-[#E0E0FC]">
            Modern Tech Layout
          </span>
        </div>
      )}

      {/* Modern Top Header */}
      <header className="mb-6 pb-6 border-b border-[#E8E6DF] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#101828]">
            {contact.fullName}
          </h1>
          <p className="text-base font-bold text-[#5B5BD6] mt-0.5">
            {resume.targetRole}
          </p>
        </div>

        <div className="flex flex-col sm:items-end text-xs text-[#475467] space-y-1">
          {contact.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#5B5BD6]" /> {contact.email}
            </span>
          )}
          {contact.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[#5B5BD6]" /> {contact.phone}
            </span>
          )}
          {contact.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#5B5BD6]" /> {contact.location}
            </span>
          )}
        </div>
      </header>

      {/* Web & Social Links Bar */}
      {(contact.linkedinUrl || contact.githubUrl || contact.portfolioUrl) && (
        <div className="flex flex-wrap items-center gap-2 mb-6 pb-4 border-b border-[#F2F4F7] text-xs text-[#5B5BD6]">
          {contact.githubUrl && (
            <span className="inline-flex items-center gap-1 bg-[#F9F9FE] px-2.5 py-1 rounded-md border border-[#E0E0FC] font-medium">
              <Github className="w-3.5 h-3.5" /> {contact.githubUrl}
            </span>
          )}
          {contact.linkedinUrl && (
            <span className="inline-flex items-center gap-1 bg-[#F9F9FE] px-2.5 py-1 rounded-md border border-[#E0E0FC] font-medium">
              <Linkedin className="w-3.5 h-3.5" /> {contact.linkedinUrl}
            </span>
          )}
          {contact.portfolioUrl && (
            <span className="inline-flex items-center gap-1 bg-[#F9F9FE] px-2.5 py-1 rounded-md border border-[#E0E0FC] font-medium">
              <Globe className="w-3.5 h-3.5" /> {contact.portfolioUrl}
            </span>
          )}
        </div>
      )}

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column (1 col): Skills, Education, Certs */}
        <div className="md:col-span-1 space-y-6 md:border-r md:border-[#E8E6DF] md:pr-6">
          {/* Skills */}
          <section>
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5B5BD6] mb-3">
              Technical Stack
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.technical.map((skill, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 rounded text-[11px] font-semibold bg-[#F0EEFF] text-[#5B5BD6] border border-[#E0E0FC]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {skills.toolsAndFrameworks.length > 0 && (
              <div className="mt-3">
                <span className="text-[11px] font-bold text-[#667085] block mb-1.5">
                  Tools & Platforms
                </span>
                <div className="flex flex-wrap gap-1">
                  {skills.toolsAndFrameworks.map((tool, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-[#F2F4F7] text-[#344054]"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {skills.softAndProfessional.length > 0 && (
              <div className="mt-3">
                <span className="text-[11px] font-bold text-[#667085] block mb-1.5">
                  Professional Habits
                </span>
                <div className="flex flex-wrap gap-1">
                  {skills.softAndProfessional.map((p, i) => (
                    <span
                      key={i}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-[#ECFDF3] text-[#027A48] border border-[#D1FADF]"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5B5BD6] mb-2.5">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="text-xs">
                    <h3 className="font-bold text-[#101828]">
                      {edu.degree}
                    </h3>
                    <p className="text-[11px] text-[#475467] font-medium">
                      {edu.fieldOfStudy}
                    </p>
                    <p className="text-[11px] text-[#667085]">
                      {edu.institution}
                    </p>
                    <span className="text-[10px] text-[#98A2B3]">
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications & Evidence Badges */}
          {certifications.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5B5BD6] mb-2">
                Verified Credentials
              </h2>
              <div className="space-y-2 text-xs">
                {certifications.map((c) => (
                  <div key={c.id} className="p-2 rounded bg-[#FAF9F5] border border-[#E8E6DF]">
                    <span className="font-semibold text-[#101828] block leading-tight">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-[#667085] block mt-0.5">
                      {c.issuer} • {c.issueDate}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column (2 cols): Summary, Projects, Experience */}
        <div className="md:col-span-2 space-y-6">
          {/* Professional Summary */}
          {summary && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5B5BD6] mb-2">
                Profile Overview
              </h2>
              <p className="text-xs sm:text-sm text-[#344054] leading-relaxed">
                {summary}
              </p>
            </section>
          )}

          {/* Featured Projects */}
          {projects.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5B5BD6] mb-3">
                Featured Projects (Career Evidence)
              </h2>

              <div className="space-y-4">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-3.5 rounded-xl bg-[#FAF9F5]/70 border border-[#E8E6DF]">
                    <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm font-bold text-[#101828]">
                          {proj.title}
                        </h3>
                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-[#5B5BD6] hover:underline text-[10px] font-semibold inline-flex items-center gap-0.5 print:hidden"
                          >
                            Artifact <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-[#5B5BD6] font-semibold">
                        {proj.techStack.slice(0, 3).join(' • ')}
                      </span>
                    </div>

                    <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-[#344054] mt-2">
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

          {/* Professional Experience */}
          {experience.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5B5BD6] mb-3">
                Practicum & Experience
              </h2>

              <div className="space-y-3.5">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex flex-wrap items-baseline justify-between">
                      <h3 className="text-sm font-bold text-[#101828]">
                        {exp.role} <span className="text-[#5B5BD6] font-semibold">@ {exp.company}</span>
                      </h3>
                      <span className="text-xs text-[#667085]">
                        {exp.startDate} – {exp.endDate}
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

          {/* Key Achievements */}
          {achievements.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider text-[#5B5BD6] mb-2">
                Key Accomplishments
              </h2>
              <div className="space-y-2 text-xs text-[#344054]">
                {achievements.map((ach) => (
                  <div key={ach.id}>
                    <strong className="text-[#101828]">{ach.title}: </strong>
                    <span>{ach.description}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>

      <footer className="mt-8 pt-4 border-t border-[#F2F4F7] text-[10px] text-[#98A2B3] flex items-center justify-between">
        <span>CareerOS Living Proof System • Modern Layout</span>
        <span>Built from Authentic Career Evidence</span>
      </footer>
    </div>
  );
};
