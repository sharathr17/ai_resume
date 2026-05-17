"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultResume, defaultSectionOrder } from "@/lib/resume-data";
import type { ResumeData, ResumeSectionKey } from "@/lib/resume-types";

type ResumeStore = {
  data: ResumeData;
  sectionOrder: ResumeSectionKey[];
  lastSaved: string | null;
  setData: (data: ResumeData) => void;
  setSectionOrder: (sectionOrder: ResumeSectionKey[]) => void;
  resetResume: () => void;
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set) => ({
      data: defaultResume,
      sectionOrder: defaultSectionOrder,
      lastSaved: null,
      setData: (data) => set({ data, lastSaved: new Date().toISOString() }),
      setSectionOrder: (sectionOrder) => set({ sectionOrder, lastSaved: new Date().toISOString() }),
      resetResume: () => set({ data: defaultResume, sectionOrder: defaultSectionOrder, lastSaved: new Date().toISOString() }),
    }),
    { name: "resumeforge-draft" },
  ),
);
