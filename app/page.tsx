import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex-1 w-full flex flex-col items-center justify-center p-4 gap-12 text-center">
      <h1 className="font-bold text-4xl">Custom resume generator</h1>
      <p>
        Utility to make passing the ATS more feasible. Allows for customization
        of sections while abstracting formatting logic.
      </p>
      <Button asChild>
        <Link href="/generate">Get started</Link>
      </Button>
    </div>
  );
}
