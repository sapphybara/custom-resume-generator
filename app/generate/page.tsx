import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { auth0 } from "@/lib/auth0";

import ResumeFormWrapper from "./resume-form-wrapper";

export const metadata: Metadata = {
  title: "Custom Resume Generator | Generate",
};

function NotAuthorized() {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center flex-1 gap-4 sm:gap-8">
      <Button asChild>
        <a href="/auth/login?screen_hint=signup&returnTo=/generate">Sign Up</a>
      </Button>
      <Button asChild>
        <a href="/auth/login?returnTo=/generate">Log In</a>
      </Button>
    </div>
  );
}

export default async function Generate() {
  const session = await auth0.getSession();

  const Child = session ? ResumeFormWrapper : NotAuthorized;

  return (
    <div className="flex flex-col mx-auto pt-12 p-6 space-y-8 w-full min-h-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Your Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {session
            ? "Fill in your information to create a professional resume"
            : "Log in to use the generator"}
        </p>
      </div>
      <Child />
    </div>
  );
}
