import { Metadata } from "next";

import ResumeFormWrapper from "./resume-form-wrapper";
import { auth0 } from "@/lib/auth0";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Custom Resume Generator | Generate",
};

function NotAuthorized() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h2>Please Log In</h2>
      <br />
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
    <div className="mx-auto p-6 space-y-8 w-full">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Generate Your Resume
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Fill in your information to create a professional resume
        </p>
      </div>
      <Child />
    </div>
  );
}
