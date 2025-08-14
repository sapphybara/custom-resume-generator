"use client";

import Loading from "@/components/ui/loading";
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
    <Loading />
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
