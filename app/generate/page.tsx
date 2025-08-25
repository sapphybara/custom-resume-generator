import { Metadata } from "next";

import ResumeFormWrapper from "./resume-form-wrapper";

export const metadata: Metadata = {
  title: "Generate Resume | Custom Resume Generator",
  description:
    "Create your ATS-optimized resume with our intelligent generator. Input your information and let our system handle the formatting and layout automatically. Perfect for job applications and career advancement.",
  keywords:
    "create resume, generate resume, ATS resume builder, job application resume, professional resume maker",
};

export default async function Generate() {
  return (
    <div className="flex flex-col mx-auto pt-12 p-6 space-y-8 w-full min-h-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Your Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your information to create a professional resume
        </p>
      </div>
      <ResumeFormWrapper />
    </div>
  );
}
