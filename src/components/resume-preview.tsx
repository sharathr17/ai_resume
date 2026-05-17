import { sectionLabels } from "@/lib/resume-data";
import type { ResumeData, ResumeSectionKey } from "@/lib/resume-types";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4">
      <h3 className="border-b border-slate-400 pb-1 text-[11px] font-bold uppercase tracking-wide">{title}</h3>
      <div className="mt-2">{children}</div>
    </section>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="ml-4 list-disc space-y-1">
      {items.filter(Boolean).map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

export function ResumePreview({ data, order }: { data: ResumeData; order: ResumeSectionKey[] }) {
  const { personalInfo } = data;
  const renderSection = (section: ResumeSectionKey) => {
    if (section === "summary" && data.summary) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <p>{data.summary}</p>
        </Section>
      );
    }

    if (section === "skills" && data.skills.length) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <div className="space-y-1">
            {data.skills.map((group) => (
              <p key={group.category}>
                <strong>{group.category}:</strong> {group.items.filter(Boolean).join(", ")}
              </p>
            ))}
          </div>
        </Section>
      );
    }

    if (section === "experience" && data.experience.length) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <div className="space-y-3">
            {data.experience.map((item) => (
              <article key={`${item.company}-${item.role}`}>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-bold">{item.role}</p>
                    <p>{item.company} | {item.location}</p>
                  </div>
                  <p className="whitespace-nowrap text-right">{item.start} - {item.end}</p>
                </div>
                <BulletList items={item.bullets} />
              </article>
            ))}
          </div>
        </Section>
      );
    }

    if (section === "projects" && data.projects.length) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <div className="space-y-3">
            {data.projects.map((project) => (
              <article key={project.name}>
                <div className="flex justify-between gap-4">
                  <p className="font-bold">{project.name}</p>
                  <p className="text-right">{project.stack}</p>
                </div>
                {project.link ? <p>{project.link}</p> : null}
                <BulletList items={project.bullets} />
              </article>
            ))}
          </div>
        </Section>
      );
    }

    if (section === "education" && data.education.length) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <div className="space-y-2">
            {data.education.map((item) => (
              <article key={item.school}>
                <div className="flex justify-between gap-4">
                  <div>
                    <p className="font-bold">{item.degree}</p>
                    <p>{item.school} | {item.location}</p>
                  </div>
                  <p className="whitespace-nowrap text-right">{item.graduation}</p>
                </div>
                <p>{item.details}</p>
              </article>
            ))}
          </div>
        </Section>
      );
    }

    if (section === "certifications" && data.certifications.length) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <div className="space-y-1">
            {data.certifications.map((cert) => (
              <p key={cert.name}>
                <strong>{cert.name}</strong>, {cert.issuer} ({cert.date})
              </p>
            ))}
          </div>
        </Section>
      );
    }

    if (section === "achievements" && data.achievements.length) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <BulletList items={data.achievements} />
        </Section>
      );
    }

    if (section === "languages" && data.languages.length) {
      return (
        <Section key={section} title={sectionLabels[section]}>
          <p>{data.languages.filter(Boolean).join(", ")}</p>
        </Section>
      );
    }

    return null;
  };

  return (
    <div className="resume-paper mx-auto min-h-[920px] w-full max-w-[760px] rounded-sm p-8 text-[12px] leading-relaxed shadow-xl shadow-slate-200/70 dark:shadow-black/30">
      <header className="border-b border-slate-500 pb-3 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-wide">{personalInfo.fullName}</h2>
        <p className="mt-1 font-semibold">{personalInfo.role}</p>
        <p className="mt-1">
          {[personalInfo.location, personalInfo.phone, personalInfo.email, personalInfo.linkedin, personalInfo.github, personalInfo.portfolio]
            .filter(Boolean)
            .join(" | ")}
        </p>
      </header>
      {order.map(renderSection)}
    </div>
  );
}
