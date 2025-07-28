import type { Control } from "react-hook-form";

declare global {
  interface Experience {
    jobTitle: string;
    company: string;
    startDate: string;
    endDate: string;
    jobDescription: string;
  }

  interface Education {
    degree: string;
    institution: string;
    year: string;
    details?: string;
  }

  interface ResumeData {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    website?: string;
    linkedin?: string;
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
}
