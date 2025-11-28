import { ThemeToggle } from './ThemeToggle'

export const Header = () => (
  <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
    <nav className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="bg-charcoal dark:bg-slate-200 p-2 rounded">
          <svg
            className="w-6 h-6 text-background-light dark:text-background-dark"
            fill="none"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
              fill="currentColor"
            />
            <path
              d="M12 6C9.79 6 8 7.79 8 10C8 12.21 9.79 14 12 14C14.21 14 16 12.21 16 10C16 7.79 14.21 6 12 6ZM12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12Z"
              fill="currentColor"
            />
            <path
              d="M12 15C9.34 15 4 16.34 4 19V20H20V19C20 16.34 14.66 15 12 15Z"
              fill="currentColor"
              opacity="0.3"
            />
          </svg>
        </div>
        <div>
          <h1 className="font-display font-extrabold text-lg text-charcoal dark:text-white">
            ZenProtect
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            PRIVACY STUDIO
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="hidden sm:flex items-center gap-2 text-primary dark:text-forest-green-light">
          <span className="material-symbols-outlined text-base">
            verified_user
          </span>
          <span className="font-semibold">Client-Side Secure</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-slate-600 dark:text-slate-400">
          <span className="material-symbols-outlined text-base">bolt</span>
          <span className="font-semibold">Zero Latency</span>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  </header>
)

