import { ShieldCheck, Zap } from 'lucide-react'

export const Header = () => (
  <header className="fixed top-0 w-full bg-white/90 backdrop-blur-xl border-b border-black/10 z-50">
    <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
      <div
        className="flex items-center gap-3 group cursor-pointer"
        onClick={() => window.location.reload()}
      >
        <img
          src="http://googleusercontent.com/image_generation_content/1"
          className="w-10 h-10 object-cover bg-black shadow-[4px_4px_0px_0px_rgba(163,230,53,1)] transition-transform group-hover:translate-y-[-2px] border border-black"
          alt="PixelPixel Logo"
        />
        <div className="flex flex-col leading-none">
          <span className="text-xl font-bold tracking-tighter">
            PIXELPIXEL
          </span>
          <span className="text-[10px] font-mono tracking-widest text-gray-500">
            PRIVACY STUDIO
          </span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 flex items-center gap-2 uppercase">
          <ShieldCheck className="w-4 h-4 text-lime-600" />
          Client-Side Secure
        </span>
        <div className="h-4 w-px bg-gray-300"></div>
        <span className="text-[10px] font-mono font-bold tracking-widest text-gray-400 flex items-center gap-2 uppercase">
          <Zap className="w-4 h-4 text-lime-600" />
          Zero Latency
        </span>
      </div>
    </div>
  </header>
)

