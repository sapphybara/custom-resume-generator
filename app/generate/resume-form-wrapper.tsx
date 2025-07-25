"use client";

import useResumeForm from "@/hooks/use-form-data";
import ResumeForm from "./resume-form";
import ResumeFormPreview from "./resume-form-preview";

export default function ResumeFormWrapper() {
  const {
    form,
    experienceFields,
    addExperience,
    removeExperience,
    educationFields,
    addEducation,
    removeEducation,
  } = useResumeForm();

  return form.formState.isLoading ? (
    <div className="flex items-center justify-center min-h-[400px] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
    </div>
  ) : (
    <div className="flex gap-4 isolate">
      <ResumeFormPreview control={form.control} />
      <ResumeForm
        className="w-[clamp(min(100vw-var(--spacing)*6,80ch),100%,80ch)]"
        form={form}
        experienceFields={experienceFields}
        addExperience={addExperience}
        removeExperience={removeExperience}
        educationFields={educationFields}
        addEducation={addEducation}
        removeEducation={removeEducation}
      />
    </div>
  );
}
