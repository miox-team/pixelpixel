import { Maximize, Scissors, Sparkles, Trash2, Undo, Zap } from 'lucide-react'
import { Button } from './Button'

interface ToolbarProps {
  pixelSize: number
  onPixelSizeChange: (size: number) => void
  onUndo: () => void
  onReset: () => void
  onPrivacyAudit: () => void
  onRemoveBg: () => void
  isProcessing: boolean
  isAuditing: boolean
  canUndo: boolean
}

export const Toolbar = ({
  pixelSize,
  onPixelSizeChange,
  onUndo,
  onReset,
  onPrivacyAudit,
  onRemoveBg,
  isProcessing,
  isAuditing,
  canUndo,
}: ToolbarProps) => {
  return (
    <div className="lg:w-80 flex flex-col gap-6 order-2 lg:order-1">
      <div className="bg-white p-6 border border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-8">
        {/* Smart Tools Section */}
        <div>
          <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 font-mono mb-4 text-lime-700">
            <Zap className="w-4 h-4" /> Smart Tools
          </h3>

          <div className="space-y-3">
            <Button
              variant="dark"
              onClick={onPrivacyAudit}
              disabled={isAuditing || isProcessing}
              className="w-full relative overflow-hidden"
              icon={Sparkles}
            >
              {isAuditing ? 'SCANNING...' : 'AI PRIVACY AUDIT'}
              {isAuditing && (
                <div className="absolute bottom-0 left-0 h-1 bg-lime-400 w-full animate-pulse"></div>
              )}
            </Button>

            <Button
              variant="secondary"
              onClick={onRemoveBg}
              disabled={isProcessing || isAuditing}
              className="w-full relative overflow-hidden"
              icon={Scissors}
            >
              {isProcessing ? 'PROCESSING...' : 'REMOVE BG'}
            </Button>
          </div>
          <p className="text-[10px] text-gray-400 font-mono mt-3 leading-tight">
            * AI Audit sends image to Gemini for analysis. Images are
            not stored.
          </p>
        </div>

        <div className="h-px bg-gray-200"></div>

        {/* Pixel Size Control */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 font-mono">
              <Maximize className="w-4 h-4" /> Pixelation Density
            </h3>
            <span className="font-mono text-xs bg-lime-200 px-2 py-1 font-bold border border-black">
              {pixelSize}px
            </span>
          </div>
          <input
            type="range"
            min="4"
            max="60"
            step="2"
            value={pixelSize}
            onChange={(e) => onPixelSizeChange(Number(e.target.value))}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-[10px] font-mono font-bold text-gray-400 tracking-widest">
            <span>FINE DETAIL</span>
            <span>MAX BLOCK</span>
          </div>
        </div>

        <div className="h-px bg-gray-200"></div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            variant="secondary"
            onClick={onUndo}
            disabled={!canUndo || isProcessing || isAuditing}
            className="w-full"
          >
            <Undo className="w-4 h-4" /> Undo Last
          </Button>
          <Button
            variant="ghost"
            onClick={onReset}
            disabled={isProcessing || isAuditing}
            className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Reset Image
          </Button>
        </div>
      </div>
    </div>
  )
}

