import { Maximize, Trash2, Undo } from 'lucide-react'
import { Button } from './Button'

interface ToolbarProps {
  pixelSize: number
  onPixelSizeChange: (size: number) => void
  onUndo: () => void
  onReset: () => void
  canUndo: boolean
}

export const Toolbar = ({
  pixelSize,
  onPixelSizeChange,
  onUndo,
  onReset,
  canUndo,
}: ToolbarProps) => {
  return (
    <div className="lg:w-80 flex flex-col gap-6 order-2 lg:order-1">
      <div className="bg-white dark:bg-gray-900 p-2 lg:p-6 border border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] space-y-2 lg:space-y-8">
        {/* Pixel Size Control */}
        <div>
          <div className="flex justify-between items-center mb-1.5 lg:mb-4">
            <h3 className="font-bold text-[10px] lg:text-xs uppercase tracking-widest flex items-center gap-1.5 lg:gap-2 font-mono text-black dark:text-white">
              <Maximize className="w-3 h-3 lg:w-4 lg:h-4" /> <span className="hidden sm:inline">Pixelation</span> Density
            </h3>
            <span className="font-mono text-[10px] lg:text-xs bg-lime-200 dark:bg-lime-900 px-1.5 lg:px-2 py-0.5 lg:py-1 font-bold border border-black dark:border-white text-black dark:text-white">
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
            className="w-full mb-1 lg:mb-2"
          />
          <div className="flex justify-between text-[9px] lg:text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 tracking-widest">
            <span>FINE</span>
            <span>MAX</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

        {/* Actions */}
        <div className="flex gap-2 lg:flex-col lg:gap-4">
          <Button
            variant="secondary"
            onClick={onUndo}
            disabled={!canUndo}
            className="flex-1 lg:w-full text-[10px] lg:text-sm py-1 px-2 lg:py-2.5"
          >
            <Undo className="w-2.5 h-2.5 lg:w-4 lg:h-4" /> <span className="hidden sm:inline">Undo </span>Last
          </Button>
          <Button
            variant="ghost"
            onClick={onReset}
            className="flex-1 lg:w-full text-[10px] lg:text-sm text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950 py-1 px-2 lg:py-2.5"
          >
            <Trash2 className="w-2.5 h-2.5 lg:w-4 lg:h-4 mr-1 lg:mr-2" /> Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

