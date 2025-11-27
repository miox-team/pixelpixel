import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { GlobalStyles } from '../components/GlobalStyles'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { UploadArea } from '../components/UploadArea'
import { Toolbar } from '../components/Toolbar'
import { CanvasEditor } from '../components/CanvasEditor'
import { getCanvasCoords, isValidSelection, pixelate } from '../utils/canvas'
import { IMAGE_FORMAT } from '../constants'

export const Route = createFileRoute('/')({ component: App })

export default function App() {
  // State
  const [file, setFile] = useState<File | null>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [pixelSize, setPixelSize] = useState(12)
  const [isDragging, setIsDragging] = useState(false)

  // Canvas State
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [history, setHistory] = useState<Array<ImageData>>([])
  const [historyStep, setHistoryStep] = useState(-1)

  // Selection State
  const [isDrawing, setIsDrawing] = useState(false)
  const [startPos, setStartPos] = useState<{ x: number; y: number } | null>(
    null,
  )
  const [currentPos, setCurrentPos] = useState<{ x: number; y: number } | null>(
    null,
  )
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(
    null,
  )

  // --- FILE HANDLING ---

  const handleFile = (selectedFile: File) => {
    const url = URL.createObjectURL(selectedFile)
    setFile(selectedFile)
    setImageSrc(url)
    setHistory([])
    setHistoryStep(-1)
  }

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  // --- CANVAS INITIALIZATION ---

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = imageSrc
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height

      ctx.drawImage(img, 0, 0)

      const initialData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      setHistory([initialData])
      setHistoryStep(0)
    }
  }, [imageSrc])

  // --- DRAWING HANDLERS ---

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return
    setIsDrawing(true)
    const coords = getCanvasCoords(e, canvasRef.current)
    setStartPos(coords)
    setCurrentPos(coords)
  }

  const moveDraw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current) return
    const coords = getCanvasCoords(e, canvasRef.current)
    
    if (isDrawing) {
      setCurrentPos(coords)
    }
    setMousePos(coords)
  }

  const endDraw = () => {
    if (
      !isDrawing ||
      !startPos ||
      !currentPos ||
      !canvasRef.current
    )
      return
    setIsDrawing(false)

    const width = currentPos.x - startPos.x
    const height = currentPos.y - startPos.y

    if (!isValidSelection(width, height)) {
      setStartPos(null)
      setCurrentPos(null)
      return
    }

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    pixelate(ctx, startPos.x, startPos.y, width, height, pixelSize)

    const newData = ctx.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height,
    )
    const newHistory = history.slice(0, historyStep + 1)
    setHistory([...newHistory, newData])
    setHistoryStep((prev) => prev + 1)

    setStartPos(null)
    setCurrentPos(null)
  }

  const handleMouseLeave = () => {
    endDraw()
    setMousePos(null)
  }

  // --- ACTIONS ---

  const handleUndo = () => {
    if (historyStep > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      const prevData = history[historyStep - 1]
      ctx.putImageData(prevData, 0, 0)
      setHistoryStep((prev) => prev - 1)
    }
  }

  const handleReset = () => {
    if (history.length > 0 && canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      if (!ctx) return
      ctx.putImageData(history[0], 0, 0)
      setHistoryStep(0)
    }
  }

  const handleDownload = (): void => {
    if (!canvasRef.current || !file) {
      return
    }

    const dataUrl = canvasRef.current.toDataURL(IMAGE_FORMAT)
    const link = document.createElement('a')
    link.download = `pixelpixel-${file.name}`
    link.href = dataUrl
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] text-neutral-900 font-display selection:bg-lime-400 selection:text-black overflow-x-hidden">
      <GlobalStyles />
      <div className="bg-noise"></div>

      <Header />

      <main className="pt-32 pb-16 px-6 max-w-7xl mx-auto min-h-[calc(100vh-80px)] relative z-10">
        {!imageSrc ? (
          <UploadArea
            isDragging={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFileSelect={handleFile}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 h-full animate-in fade-in zoom-in-95 duration-500">
            <Toolbar
              pixelSize={pixelSize}
              onPixelSizeChange={setPixelSize}
              onUndo={handleUndo}
              onReset={handleReset}
              canUndo={historyStep > 0}
            />

            <CanvasEditor
              canvasRef={canvasRef}
              containerRef={containerRef}
              file={file}
              isDrawing={isDrawing}
              startPos={startPos}
              currentPos={currentPos}
              mousePos={mousePos}
              pixelSize={pixelSize}
              onStartDraw={startDraw}
              onMoveDraw={moveDraw}
              onEndDraw={endDraw}
              onMouseLeave={handleMouseLeave}
              onClose={() => setImageSrc(null)}
              onDownload={handleDownload}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
