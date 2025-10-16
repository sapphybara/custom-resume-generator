import type { Control } from "react-hook-form";

declare global {
  interface Experience {
    id: number;
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    jobDescription: string;
  }

  interface Education {
    id: number;
    degree: string;
    institution: string;
    year: string;
    details?: string;
  }

  interface ResumeData {
    id: number;
    name: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
    github?: string;
    pronouns?: string;
    summary?: string;
    skills: string;
    experiences: Experience[];
    education: Education[];
  }

  interface PropsWithControl {
    control: Control<ResumeData, any, ResumeData>;
  }

  interface PropsWithClassName {
    className?: string;
  }

  type ArrayElementLookupType<T extends readonly unknown[]> =
    T extends readonly (infer U)[] ? U : never;
}
