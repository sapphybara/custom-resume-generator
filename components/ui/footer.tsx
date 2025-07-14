import { Button } from "./button";

export default function Footer() {
  return (
    <footer className="flex items-center justify-center py-4">
      <p className="text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()}&nbsp;
        <Button asChild className="p-0" variant="link">
          <a
            href="https://www.sapphyra.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            Sapphyra Wiser
          </a>
        </Button>
        &nbsp;| All rights reserved |&nbsp;
        <Button asChild className="p-0" variant="link">
          <a
            href="https://github.com/sapphybara/custom-resume-generator"
            target="_blank"
            rel="noopener noreferrer"
          >
            View source
          </a>
        </Button>
      </p>
    </footer>
  );
}
