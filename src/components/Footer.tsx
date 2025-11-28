export const Footer = () => (
  <footer className="w-full">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
      <div className="flex gap-6 mb-4 sm:mb-0">
        <a
          className="hover:text-primary dark:hover:text-forest-green-light transition-colors"
          href="#"
        >
          About
        </a>
        <a
          className="hover:text-primary dark:hover:text-forest-green-light transition-colors"
          href="#"
        >
          Terms of Service
        </a>
        <a
          className="hover:text-primary dark:hover:text-forest-green-light transition-colors"
          href="https://github.com/miox-team/pixelpixel"
        >
          Source
        </a>
      </div>
      <div className="flex items-center gap-2">
        <span>Powered by</span>
        <img
          alt="Tanstack logo"
          className="h-6 w-6"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoMIMG5yHEOjdYWn-jig55vZnJ55uv2kZ5rem5PMdLWUJP3B8IiiSbl3Ax51lwiv7QxpA82996HbCuVM3QevElZypqsqzGXPyaSCg-KTb78arWDOqyXua75e9dM4dEhqo22pQE-bnSJfDdp9AyifHLxfvqTxxZMIBx0kp_TdV6n-rcWCUvEO9wXDglolNkWnNh-6aB6v83X8MKWRI3iEW0qtIIYgAxN8Tuht28-UVkWhdLqZYQY5wSA_3ec0hukLlIn2-0dSFLfH7B"
        />
      </div>
    </div>
  </footer>
)
