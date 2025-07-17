"use client";

import useResumeForm from "@/hooks/use-form-data";
import ResumeForm from "./resume-form";
import PDFPreview from "./pdf-preview";

export default function Generate() {
  const {
    form,
    watchedValues,
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
      <ResumeForm
        form={form}
        experienceFields={experienceFields}
        addExperience={addExperience}
        removeExperience={removeExperience}
        educationFields={educationFields}
        addEducation={addEducation}
        removeEducation={removeEducation}
      />
      <PDFPreview watchedValues={watchedValues} />
    </div>
  );
}
