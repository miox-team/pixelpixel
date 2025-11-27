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
      <div className="bg-white dark:bg-gray-900 p-6 border border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] space-y-8">
        {/* Pixel Size Control */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-xs uppercase tracking-widest flex items-center gap-2 font-mono text-black dark:text-white">
              <Maximize className="w-4 h-4" /> Pixelation Density
            </h3>
            <span className="font-mono text-xs bg-lime-200 dark:bg-lime-900 px-2 py-1 font-bold border border-black dark:border-white text-black dark:text-white">
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
          <div className="flex justify-between text-[10px] font-mono font-bold text-gray-400 dark:text-gray-500 tracking-widest">
            <span>FINE DETAIL</span>
            <span>MAX BLOCK</span>
          </div>
        </div>

        <div className="h-px bg-gray-200 dark:bg-gray-700"></div>

        {/* Actions */}
        <div className="space-y-4">
          <Button
            variant="secondary"
            onClick={onUndo}
            disabled={!canUndo}
            className="w-full"
          >
            <Undo className="w-4 h-4" /> Undo Last
          </Button>
          <Button
            variant="ghost"
            onClick={onReset}
            className="w-full text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-950"
          >
            <Trash2 className="w-4 h-4 mr-2" /> Reset Image
          </Button>
        </div>
      </div>
    </div>
  )
}

