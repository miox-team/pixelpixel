import { Github } from 'lucide-react'

export const Footer = () => (
  <footer className="border-t border-gray-200 bg-white py-12 relative z-10">
    <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8 text-sm">
      <div className="col-span-2">
        <h4 className="font-bold mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
          About
        </h4>
        <div className="flex items-center gap-2 mb-4">
          <img
            src="http://googleusercontent.com/image_generation_content/1"
            className="w-6 h-6 object-cover bg-black border border-black"
            alt="PixelPixel Logo"
          />
          <span className="font-bold tracking-tight">PIXELPIXEL.APP</span>
        </div>
        <p className="text-gray-500 max-w-sm leading-relaxed">
          Constructed for the digital age. We believe privacy should be
          default, fast, and aesthetically pleasing.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
          Legal
        </h4>
        <ul className="space-y-3 text-gray-600 font-medium">
          <li>
            <a
              href="#"
              className="hover:text-black hover:underline decoration-lime-400 decoration-2 underline-offset-4"
            >
              Privacy Policy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-black hover:underline decoration-lime-400 decoration-2 underline-offset-4"
            >
              Terms of Service
            </a>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-4 font-mono text-xs tracking-widest text-gray-400 uppercase">
          Source
        </h4>
        <a
          href="#"
          className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-black hover:text-white transition-colors font-mono text-xs font-bold uppercase tracking-wider"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </div>
  </footer>
)

