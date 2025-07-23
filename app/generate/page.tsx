"use client";

import useResumeForm from "@/hooks/use-form-data";

import PDFPreview from "./_pdf/preview";
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

  return (
    <div className="mx-auto p-6 space-y-8 w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Your Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your information to create a professional resume
        </p>
      </div>
      <div className="flex gap-4 isolate">
        <ResumeFormPreview control={form.control} />
        <ResumeForm
          className="max-w-[80ch]"
          form={form}
          experienceFields={experienceFields}
          addExperience={addExperience}
          removeExperience={removeExperience}
          educationFields={educationFields}
          addEducation={addEducation}
          removeEducation={removeEducation}
        />
      </div>
      <PDFPreview control={form.control} />
    </div>
  );
}
