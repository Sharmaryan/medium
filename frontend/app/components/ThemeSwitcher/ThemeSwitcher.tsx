import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Button } from "../Button/Button";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleTheme = () => {
    setTheme((prev) => {
      return prev === "dark" ? "light" : "dark";
    });
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button fill="clear" onClick={handleTheme} className="text-2xl">
      {theme === "light" ? "☾" : "☀︎"}
    </Button>
  );
};

export default ThemeSwitcher;
