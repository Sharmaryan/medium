"use client";

export default function ThemeSwitcher() {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.cookie = `theme=${newTheme}; path=/; max-age=31536000`;

    document.documentElement.classList.remove(currentTheme);
    document.documentElement.classList.add(newTheme);
  };

  return (
    <button onClick={toggleTheme} className="ml-auto">
      Theme
    </button>
  );
}
