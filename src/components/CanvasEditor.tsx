import { Download, Scan } from 'lucide-react'
import { Button } from './Button'
import type { RefObject } from 'react'

interface CanvasEditorProps {
  canvasRef: RefObject<HTMLCanvasElement | null>
  containerRef: RefObject<HTMLDivElement | null>
  file: File | null
  isDrawing: boolean
  startPos: { x: number; y: number } | null
  currentPos: { x: number; y: number } | null
  mousePos: { x: number; y: number } | null
  pixelSize: number
  onStartDraw: (e: React.MouseEvent | React.TouchEvent) => void
  onMoveDraw: (e: React.MouseEvent | React.TouchEvent) => void
  onEndDraw: () => void
  onMouseLeave?: () => void
  onClose: () => void
  onDownload: () => void
}

export const CanvasEditor = ({
  canvasRef,
  containerRef,
  file,
  isDrawing,
  startPos,
  currentPos,
  mousePos,
  pixelSize,
  onStartDraw,
  onMoveDraw,
  onEndDraw,
  onMouseLeave,
  onClose,
  onDownload,
}: CanvasEditorProps) => {
  // Calculate overlay style for selection area
  const getOverlayStyle = () => {
    if (!isDrawing || !startPos || !currentPos || !canvasRef.current || !containerRef.current) {
      return null
    }
    
    const canvas = canvasRef.current
    const canvasRect = canvas.getBoundingClientRect()
    const containerRect = containerRef.current.getBoundingClientRect()
    
    // Calculate scale factors
    const scaleX = canvasRect.width / canvas.width
    const scaleY = canvasRect.height / canvas.height
    
    // Calculate selection bounds in canvas coordinates
    const minX = Math.min(startPos.x, currentPos.x)
    const minY = Math.min(startPos.y, currentPos.y)
    const maxX = Math.max(startPos.x, currentPos.x)
    const maxY = Math.max(startPos.y, currentPos.y)
    
    // Convert to screen coordinates
    const left = (minX * scaleX) + (canvasRect.left - containerRect.left)
    const top = (minY * scaleY) + (canvasRect.top - containerRect.top)
    const width = (maxX - minX) * scaleX
    const height = (maxY - minY) * scaleY
    
    return {
      left,
      top,
      width,
      height,
    }
  }

  const overlayStyle = getOverlayStyle()
  return (
    <div className="flex-1 bg-[#1a1a1a] border border-black shadow-2xl order-1 lg:order-2 flex flex-col relative overflow-hidden group">
      {/* Canvas Header */}
      <div className="bg-black/50 backdrop-blur-sm p-3 flex justify-between items-center px-4 border-b border-white/10 absolute top-0 w-full z-10">
        <span className="text-white/60 text-[10px] font-mono tracking-widest uppercase flex items-center gap-2">
          <Scan className="w-3 h-3 text-lime-400" />
          {file?.name}
        </span>
        <span className="text-lime-400 text-[10px] font-mono tracking-widest border border-lime-400/30 px-2 py-0.5 rounded">
          {file && `${Math.round(file.size / 1024)} KB`}
        </span>
      </div>

      <div
        ref={containerRef}
        className="flex-1 relative overflow-auto flex items-center justify-center p-8 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] cursor-crosshair"
        onMouseDown={onStartDraw}
        onMouseMove={onMoveDraw}
        onMouseUp={onEndDraw}
        onMouseLeave={onMouseLeave || onEndDraw}
        onTouchStart={onStartDraw}
        onTouchMove={onMoveDraw}
        onTouchEnd={onEndDraw}
      >
        <canvas
          ref={canvasRef}
          className="max-w-full max-h-[70vh] object-contain shadow-[0px_0px_40px_rgba(0,0,0,0.5)]"
          style={{ imageRendering: 'pixelated' }}
        />

        {/* Selection Overlay - shows area that will be pixelated */}
        {isDrawing && overlayStyle && (
          <div
            className="pointer-events-none absolute border-2 border-red-500 bg-red-500/20 z-50"
            style={{
              left: `${overlayStyle.left}px`,
              top: `${overlayStyle.top}px`,
              width: `${overlayStyle.width}px`,
              height: `${overlayStyle.height}px`,
            }}
          />
        )}

        {/* Position Info Display */}
        {mousePos && (
          <div className="absolute top-16 left-4 bg-black/80 backdrop-blur-sm text-white text-[10px] font-mono p-2 space-y-1 border border-white/20 z-50">
            <div className="flex gap-2">
              <span className="text-lime-400">Current:</span>
              <span>
                {Math.round(mousePos.x)}, {Math.round(mousePos.y)}
              </span>
            </div>
            {startPos && (
              <div className="flex gap-2">
                <span className="text-cyan-400">Start:</span>
                <span>
                  {Math.round(startPos.x)}, {Math.round(startPos.y)}
                </span>
              </div>
            )}
            {isDrawing && currentPos && startPos && (
              <div className="flex gap-2 pt-1 border-t border-white/10">
                <span className="text-yellow-400">Size:</span>
                <span>
                  {Math.round(Math.abs(currentPos.x - startPos.x))} ×{' '}
                  {Math.round(Math.abs(currentPos.y - startPos.y))}
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Action Bar */}
      <div className="bg-white border-t border-black p-4 flex justify-between items-center z-20">
        <Button variant="ghost" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onDownload}
          icon={Download}
        >
          Download Image
        </Button>
      </div>
    </div>
  )
}

