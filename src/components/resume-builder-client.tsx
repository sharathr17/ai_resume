"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Download, GripVertical, Plus, RotateCcw, Sparkles } from "lucide-react";
import { jsPDF } from "jspdf";
import { ResumePreview } from "@/components/resume-preview";
import { defaultResume, sectionLabels } from "@/lib/resume-data";
import type { ResumeData, ResumeSectionKey } from "@/lib/resume-types";
import { cn } from "@/lib/utils";
import { useResumeStore } from "@/stores/resume-store";

const steps = ["Header", "Summary", "Skills", "Experience", "Projects", "Education"] as const;

function splitList(value: string) {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function enhanceBullet(value: string) {
  const base = value.trim() || "Built a full-stack feature using modern web technologies";
  if (/\d/.test(base)) return base;
  return `${base.replace(/\.$/, "")} resulting in a measurable improvement in delivery speed and user experience.`;
}

function enhanceSummary(value: string) {
  const summary = value.trim() || defaultResume.summary;
  return `${summary.replace(/\.$/, "")}. Focused on building ATS-friendly, production-ready software with measurable business and recruiter outcomes.`;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-700 dark:text-slate-200">
      <span>{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "min-h-11 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:border-slate-800 dark:bg-slate-950 dark:text-white dark:focus:ring-indigo-950";

function SortableSection({ id }: { id: ResumeSectionKey }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-md border border-slate-200 bg-white px-3 py-2 text-sm dark:border-slate-800 dark:bg-slate-950"
    >
      <span>{sectionLabels[id]}</span>
      <button
        type="button"
        className="grid h-8 w-8 place-items-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-900"
        {...attributes}
        {...listeners}
        aria-label={`Reorder ${sectionLabels[id]}`}
      >
        <GripVertical size={16} />
      </button>
    </li>
  );
}

function exportResumePdf(data: ResumeData, order: ResumeSectionKey[]) {
  const doc = new jsPDF({ unit: "pt", format: "letter" });
  const margin = 72;
  const width = 612 - margin * 2;
  let y = margin;

  const addText = (text: string, size = 10, style: "normal" | "bold" = "normal", gap = 14) => {
    doc.setFont("helvetica", style);
    doc.setFontSize(size);
    const lines = doc.splitTextToSize(text, width);
    lines.forEach((line: string) => {
      if (y > 720) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += gap;
    });
  };

  const addSection = (title: string) => {
    y += 8;
    doc.setDrawColor(20, 20, 20);
    addText(title.toUpperCase(), 10, "bold", 12);
    doc.line(margin, y - 8, margin + width, y - 8);
  };

  const contact = [
    data.personalInfo.location,
    data.personalInfo.phone,
    data.personalInfo.email,
    data.personalInfo.linkedin,
    data.personalInfo.github,
    data.personalInfo.portfolio,
  ]
    .filter(Boolean)
    .join(" | ");

  doc.setTextColor(0, 0, 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(data.personalInfo.fullName.toUpperCase(), 306, y, { align: "center" });
  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(data.personalInfo.role, 306, y, { align: "center" });
  y += 14;
  doc.text(contact, 306, y, { align: "center", maxWidth: width });
  y += 18;
  doc.line(margin, y, margin + width, y);

  order.forEach((section) => {
    if (section === "summary" && data.summary) {
      addSection(sectionLabels[section]);
      addText(data.summary);
    }
    if (section === "skills") {
      addSection(sectionLabels[section]);
      data.skills.forEach((group) => addText(`${group.category}: ${group.items.join(", ")}`));
    }
    if (section === "experience") {
      addSection(sectionLabels[section]);
      data.experience.forEach((item) => {
        addText(`${item.role}, ${item.company} (${item.start} - ${item.end})`, 10, "bold");
        item.bullets.forEach((bullet) => addText(`- ${bullet}`));
      });
    }
    if (section === "projects") {
      addSection(sectionLabels[section]);
      data.projects.forEach((project) => {
        addText(`${project.name} | ${project.stack}`, 10, "bold");
        project.bullets.forEach((bullet) => addText(`- ${bullet}`));
      });
    }
    if (section === "education") {
      addSection(sectionLabels[section]);
      data.education.forEach((item) => addText(`${item.degree}, ${item.school}, ${item.graduation}. ${item.details}`));
    }
    if (section === "certifications") {
      addSection(sectionLabels[section]);
      data.certifications.forEach((cert) => addText(`${cert.name}, ${cert.issuer}, ${cert.date}`));
    }
    if (section === "achievements") {
      addSection(sectionLabels[section]);
      data.achievements.forEach((achievement) => addText(`- ${achievement}`));
    }
    if (section === "languages") {
      addSection(sectionLabels[section]);
      addText(data.languages.join(", "));
    }
  });

  doc.save(`${data.personalInfo.fullName.replace(/\s+/g, "_") || "Resume"}_Resume.pdf`);
}

export function ResumeBuilderClient() {
  const data = useResumeStore((state) => state.data);
  const setData = useResumeStore((state) => state.setData);
  const sectionOrder = useResumeStore((state) => state.sectionOrder);
  const setSectionOrder = useResumeStore((state) => state.setSectionOrder);
  const resetResume = useResumeStore((state) => state.resetResume);
  const lastSaved = useResumeStore((state) => state.lastSaved);
  const [step, setStep] = useState<(typeof steps)[number]>("Header");
  const { register, watch, setValue, getValues, reset } = useForm<ResumeData>({ defaultValues: data });
  const watched = watch();
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  useEffect(() => {
    reset(data);
  }, [data, reset]);

  useEffect(() => {
    const subscription = watch((value) => {
      setData(value as ResumeData);
    });
    return () => subscription.unsubscribe();
  }, [setData, watch]);

  const previewData = useMemo(() => watched as ResumeData, [watched]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = sectionOrder.indexOf(active.id as ResumeSectionKey);
    const newIndex = sectionOrder.indexOf(over.id as ResumeSectionKey);
    setSectionOrder(arrayMove(sectionOrder, oldIndex, newIndex));
  };

  const addExperience = () => {
    setValue("experience", [
      ...getValues("experience"),
      { company: "", role: "", location: "", start: "", end: "", bullets: [""] },
    ]);
  };

  const addProject = () => {
    setValue("projects", [...getValues("projects"), { name: "", stack: "", link: "", bullets: [""] }]);
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,0.9fr)_minmax(560px,1.1fr)]">
      <motion.section
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950 sm:p-6"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">AI Resume Builder</h1>
            <p className="mt-1 text-sm text-slate-500">
              Auto-saved {lastSaved ? new Date(lastSaved).toLocaleTimeString() : "draft ready"}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={resetResume}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 hover:text-slate-950 dark:border-slate-800 dark:text-slate-300"
              aria-label="Reset resume"
              title="Reset resume"
            >
              <RotateCcw size={17} />
            </button>
            <button
              type="button"
              onClick={() => exportResumePdf(previewData, sectionOrder)}
              className="inline-flex items-center gap-2 rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 dark:bg-white dark:text-slate-950"
            >
              <Download size={17} />
              PDF
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {steps.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setStep(item)}
              className={cn(
                "whitespace-nowrap rounded-md border px-3 py-2 text-sm font-semibold",
                step === item
                  ? "border-indigo-200 bg-indigo-50 text-indigo-700 dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-200"
                  : "border-slate-200 text-slate-600 dark:border-slate-800 dark:text-slate-300",
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <form className="mt-6 grid gap-5">
          {step === "Header" ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name">
                <input className={inputClass} {...register("personalInfo.fullName")} />
              </Field>
              <Field label="Target role">
                <input className={inputClass} {...register("personalInfo.role")} />
              </Field>
              <Field label="Email">
                <input className={inputClass} {...register("personalInfo.email")} />
              </Field>
              <Field label="Phone">
                <input className={inputClass} {...register("personalInfo.phone")} />
              </Field>
              <Field label="Location">
                <input className={inputClass} {...register("personalInfo.location")} />
              </Field>
              <Field label="LinkedIn">
                <input className={inputClass} {...register("personalInfo.linkedin")} />
              </Field>
              <Field label="GitHub">
                <input className={inputClass} {...register("personalInfo.github")} />
              </Field>
              <Field label="Portfolio">
                <input className={inputClass} {...register("personalInfo.portfolio")} />
              </Field>
            </div>
          ) : null}

          {step === "Summary" ? (
            <div className="grid gap-3">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">Professional summary</span>
                <button
                  type="button"
                  onClick={() => setValue("summary", enhanceSummary(getValues("summary")))}
                  className="inline-flex items-center gap-2 rounded-md border border-indigo-200 px-3 py-2 text-sm font-semibold text-indigo-700 dark:border-indigo-800 dark:text-indigo-200"
                >
                  <Sparkles size={16} />
                  AI optimize
                </button>
              </div>
              <textarea className={cn(inputClass, "min-h-36")} {...register("summary")} />
            </div>
          ) : null}

          {step === "Skills" ? (
            <div className="grid gap-4">
              {previewData.skills.map((group, index) => (
                <div key={group.category || index} className="grid gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <Field label="Category">
                    <input className={inputClass} {...register(`skills.${index}.category`)} />
                  </Field>
                  <Field label="Skills">
                    <input
                      className={inputClass}
                      defaultValue={group.items.join(", ")}
                      onChange={(event) => setValue(`skills.${index}.items`, splitList(event.target.value))}
                    />
                  </Field>
                </div>
              ))}
            </div>
          ) : null}

          {step === "Experience" ? (
            <div className="grid gap-4">
              {previewData.experience.map((item, index) => (
                <div key={`${item.company}-${index}`} className="grid gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Role">
                      <input className={inputClass} {...register(`experience.${index}.role`)} />
                    </Field>
                    <Field label="Company">
                      <input className={inputClass} {...register(`experience.${index}.company`)} />
                    </Field>
                    <Field label="Start">
                      <input className={inputClass} {...register(`experience.${index}.start`)} />
                    </Field>
                    <Field label="End">
                      <input className={inputClass} {...register(`experience.${index}.end`)} />
                    </Field>
                  </div>
                  <Field label="Location">
                    <input className={inputClass} {...register(`experience.${index}.location`)} />
                  </Field>
                  {item.bullets.map((_, bulletIndex) => (
                    <div key={bulletIndex} className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">Bullet {bulletIndex + 1}</span>
                        <button
                          type="button"
                          onClick={() =>
                            setValue(
                              `experience.${index}.bullets.${bulletIndex}`,
                              enhanceBullet(getValues(`experience.${index}.bullets.${bulletIndex}`)),
                            )
                          }
                          className="inline-flex items-center gap-2 rounded-md border border-indigo-200 px-3 py-1.5 text-xs font-semibold text-indigo-700 dark:border-indigo-800 dark:text-indigo-200"
                        >
                          <Sparkles size={14} />
                          AI
                        </button>
                      </div>
                      <textarea className={cn(inputClass, "min-h-20")} {...register(`experience.${index}.bullets.${bulletIndex}`)} />
                    </div>
                  ))}
                </div>
              ))}
              <button type="button" onClick={addExperience} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <Plus size={16} />
                Add experience
              </button>
            </div>
          ) : null}

          {step === "Projects" ? (
            <div className="grid gap-4">
              {previewData.projects.map((project, index) => (
                <div key={`${project.name}-${index}`} className="grid gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Project name">
                      <input className={inputClass} {...register(`projects.${index}.name`)} />
                    </Field>
                    <Field label="Stack">
                      <input className={inputClass} {...register(`projects.${index}.stack`)} />
                    </Field>
                  </div>
                  <Field label="Link">
                    <input className={inputClass} {...register(`projects.${index}.link`)} />
                  </Field>
                  {project.bullets.map((_, bulletIndex) => (
                    <textarea
                      key={bulletIndex}
                      className={cn(inputClass, "min-h-20")}
                      {...register(`projects.${index}.bullets.${bulletIndex}`)}
                    />
                  ))}
                </div>
              ))}
              <button type="button" onClick={addProject} className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                <Plus size={16} />
                Add project
              </button>
            </div>
          ) : null}

          {step === "Education" ? (
            <div className="grid gap-4">
              {previewData.education.map((item, index) => (
                <div key={`${item.school}-${index}`} className="grid gap-3 rounded-lg border border-slate-200 p-4 dark:border-slate-800">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="School">
                      <input className={inputClass} {...register(`education.${index}.school`)} />
                    </Field>
                    <Field label="Degree">
                      <input className={inputClass} {...register(`education.${index}.degree`)} />
                    </Field>
                    <Field label="Location">
                      <input className={inputClass} {...register(`education.${index}.location`)} />
                    </Field>
                    <Field label="Graduation">
                      <input className={inputClass} {...register(`education.${index}.graduation`)} />
                    </Field>
                  </div>
                  <Field label="Details">
                    <textarea className={cn(inputClass, "min-h-20")} {...register(`education.${index}.details`)} />
                  </Field>
                </div>
              ))}
            </div>
          ) : null}
        </form>

        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-sm font-semibold text-slate-950 dark:text-white">Resume section order</h2>
          <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
            <SortableContext items={sectionOrder} strategy={verticalListSortingStrategy}>
              <ul className="mt-3 grid gap-2">
                {sectionOrder.map((section) => (
                  <SortableSection key={section} id={section} />
                ))}
              </ul>
            </SortableContext>
          </DndContext>
        </div>
      </motion.section>

      <aside className="rounded-lg border border-slate-200 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="sticky top-24">
          <ResumePreview data={previewData} order={sectionOrder} />
        </div>
      </aside>
    </div>
  );
}
