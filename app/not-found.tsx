import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 h-full">
      <div className="flex gap-4 items-center">
        <h1 className="display-inline-block leading-[49px] pr-4 text-2xl font-semibold [border-right:1px_solid_rgba(1,1,1,.7)] dark:[border-right:1px_solid_rgba(255,255,255,.3)] align-top">
          404
        </h1>
        <h2 className="font-normal">This page could not be found</h2>
      </div>
      <Button asChild>
        <a href="/">Return Home</a>
      </Button>
    </div>
  );
}
