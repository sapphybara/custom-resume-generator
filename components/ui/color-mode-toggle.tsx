import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { Button } from "./button";

const ColorModeToggle = () => {
  const [mounted, setMounted] = useState(false);

  // avoid hydration mismatch warning
  useEffect(() => {
    setMounted(true);
  }, []);

  const { setTheme, theme } = useTheme();
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  const Icon = theme === "light" ? Moon : Sun;

  if (!mounted) return null;

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      <Icon />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ColorModeToggle;
