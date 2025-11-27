import { Loader2 } from 'lucide-react'

export const ProcessingOverlay = () => (
  <div className="absolute inset-0 z-50 bg-black/80 flex flex-col items-center justify-center space-y-4 backdrop-blur-sm animate-in fade-in duration-300">
    <Loader2 className="w-12 h-12 text-lime-400 animate-spin" />
    <div className="font-mono text-lime-400 text-xs tracking-widest uppercase animate-pulse">
      Running Local AI...
    </div>
  </div>
)

