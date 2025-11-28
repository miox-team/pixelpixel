import { useTheme } from '../contexts/ThemeContext'

export const ThemeToggle = () => {
  const { toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
    >
      <span className="material-symbols-outlined text-charcoal dark:text-slate-400">
        dark_mode
      </span>
    </button>
  )
}

