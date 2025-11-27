import { Github } from 'lucide-react'

export const Footer = () => (
  <footer className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black py-12 relative z-10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
      <div className="col-span-2">
        <a href="https://miox.io">
          <h4 className="font-bold mb-4 font-mono text-xs tracking-widest text-gray-400 dark:text-gray-500 uppercase">
            About
          </h4>
        </a>
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/logo.png"
            className="w-6 h-6 object-cover bg-black dark:bg-white border border-black dark:border-white"
            alt="PixelPixel Logo"
          />
          <span className="font-bold tracking-tight text-black dark:text-white">PIXELPIXEL.APP</span>
        </div>
        <p className="text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed">
          Constructed for the digital age. We believe privacy should be default,
          fast, and aesthetically pleasing.
        </p>
      </div>
      <div>
        <ul className="space-y-3 text-gray-600 dark:text-gray-400 font-medium">
          <li>
            <a
              href="#"
              className="hover:text-black dark:hover:text-white hover:underline decoration-lime-400 decoration-2 underline-offset-4"
            >
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 font-mono text-xs tracking-widest text-gray-400 dark:text-gray-500 uppercase">
          Source
        </h4>
        <a
          href="https://github.com/miox-team/pixelpixel"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-900 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors font-mono text-xs font-bold uppercase tracking-wider border border-black dark:border-white"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
)
