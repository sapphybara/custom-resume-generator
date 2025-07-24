"use client";

import useResumeForm from "@/hooks/use-form-data";

import ResumeForm from "./resume-form";
import ResumeFormPreview from "./resume-form-preview";

export default function Generate() {
  const {
    form,
    experienceFields,
    addExperience,
    removeExperience,
    educationFields,
    addEducation,
    removeEducation,
  } = useResumeForm();

  const {
    control,
    formState: { isLoading },
  } = form;

  return (
    <div className="mx-auto p-6 space-y-8 w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Your Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {isLoading
            ? "Loading your data..."
            : "Fill in your information to create a professional resume"}
        </p>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[400px] w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : (
        <div className="flex gap-4 isolate">
          <ResumeFormPreview control={control} />
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
      )}
    </div>
  );
}
