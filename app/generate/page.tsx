import { Metadata } from "next";

import ResumeFormWrapper from "./resume-form-wrapper";

export const metadata: Metadata = {
  title: "Custom Resume Generator | Generate",
};

export default function Generate() {
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
      <ResumeFormWrapper />
    </div>
  );
}
