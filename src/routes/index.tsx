import { useEffect, useRef, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import JSZip from 'jszip'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'
import { UploadArea } from '../components/UploadArea'
import { Toolbar } from '../components/Toolbar'
import { CanvasEditor } from '../components/CanvasEditor'
import { ImageGallery } from '../components/ImageGallery'
import { getCanvasCoords, isValidSelection, pixelate } from '../utils/canvas'
import { IMAGE_FORMAT } from '../constants'

export const Route = createFileRoute('/')({ component: App })

interface ImageItem {
  id: string
  file: File
  src: string
  history: Array<ImageData>
  historyStep: number
  isProcessed: boolean
}

export default function App() {
  // State
  const [images, setImages] = useState<Array<ImageItem>>([])
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null)
  const [pixelSize, setPixelSize] = useState(12)
  const [isDragging, setIsDragging] = useState(false)

  // Canvas State
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

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

  // Get currently selected image
  const selectedImage = images.find((img) => img.id === selectedImageId)

  // --- FILE HANDLING ---

  const handleFiles = (fileList: FileList) => {
    const newImages: Array<ImageItem> = Array.from(fileList).map((file) => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      src: URL.createObjectURL(file),
      history: [],
      historyStep: -1,
      isProcessed: false,
    }))

    setImages((prev) => [...prev, ...newImages])

    // Select the first image if none selected
    if (!selectedImageId && newImages.length > 0) {
      setSelectedImageId(newImages[0].id)
    }
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
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleRemoveImage = (id: string) => {
    setImages((prev) => {
      const filtered = prev.filter((img) => img.id !== id)
      // If we removed the selected image, select another one
      if (selectedImageId === id && filtered.length > 0) {
        setSelectedImageId(filtered[0].id)
      } else if (filtered.length === 0) {
        setSelectedImageId(null)
      }
      return filtered
    })
  }

  // --- CANVAS INITIALIZATION ---

  useEffect(() => {
    if (!selectedImage || !canvasRef.current) return

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = selectedImage.src
    img.onload = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return

      canvas.width = img.width
      canvas.height = img.height

      // If this image already has history, restore the current state
      if (selectedImage.history.length > 0) {
        const currentData =
          selectedImage.history[selectedImage.historyStep]
        ctx.putImageData(currentData, 0, 0)
      } else {
        // First time loading this image
        ctx.drawImage(img, 0, 0)
        const initialData = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height,
        )

        // Update the image with initial history
        setImages((prev) =>
          prev.map((item) =>
            item.id === selectedImage.id
              ? { ...item, history: [initialData], historyStep: 0 }
              : item,
          ),
        )
      }
    }
  }, [selectedImageId, selectedImage?.src])

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
      !canvasRef.current ||
      !selectedImage
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

    // Update the selected image's history
    setImages((prev) =>
      prev.map((item) => {
        if (item.id === selectedImage.id) {
          const newHistory = item.history.slice(0, item.historyStep + 1)
          return {
            ...item,
            history: [...newHistory, newData],
            historyStep: item.historyStep + 1,
            isProcessed: true,
          }
        }
        return item
      }),
    )

    setStartPos(null)
    setCurrentPos(null)
  }

  const handleMouseLeave = () => {
    endDraw()
    setMousePos(null)
  }

  // --- ACTIONS ---

  const handleUndo = () => {
    if (!selectedImage || selectedImage.historyStep <= 0 || !canvasRef.current)
      return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const prevData = selectedImage.history[selectedImage.historyStep - 1]
    ctx.putImageData(prevData, 0, 0)

    setImages((prev) =>
      prev.map((item) =>
        item.id === selectedImage.id
          ? { ...item, historyStep: item.historyStep - 1 }
          : item,
      ),
    )
  }

  const handleReset = () => {
    if (
      !selectedImage ||
      selectedImage.history.length === 0 ||
      !canvasRef.current
    )
      return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    ctx.putImageData(selectedImage.history[0], 0, 0)

    setImages((prev) =>
      prev.map((item) =>
        item.id === selectedImage.id
          ? { ...item, historyStep: 0, isProcessed: false }
          : item,
      ),
    )
  }

  const handleDownload = async (): Promise<void> => {
    if (images.length === 0) return

    // If only one image, download it directly
    if (images.length === 1) {
      const image = images[0]
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx || image.history.length === 0) return

      const currentData = image.history[image.historyStep]
      canvas.width = currentData.width
      canvas.height = currentData.height
      ctx.putImageData(currentData, 0, 0)

      const dataUrl = canvas.toDataURL(IMAGE_FORMAT)
      const link = document.createElement('a')
      link.download = `pixelpixel-${image.file.name}`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      return
    }

    // Multiple images: create a ZIP file
    const zip = new JSZip()

    for (const image of images) {
      if (image.history.length === 0) continue

      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) continue

      const currentData = image.history[image.historyStep]
      canvas.width = currentData.width
      canvas.height = currentData.height
      ctx.putImageData(currentData, 0, 0)

      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((b) => resolve(b!), IMAGE_FORMAT)
      })

      zip.file(`pixelpixel-${image.file.name}`, blob)
    }

    // Generate and download ZIP
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const link = document.createElement('a')
    link.download = `pixelpixel-images-${Date.now()}.zip`
    link.href = URL.createObjectURL(zipBlob)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-[#f4f4f5] dark:bg-black text-neutral-900 dark:text-neutral-100 font-display selection:bg-lime-400 dark:selection:bg-lime-500 selection:text-black overflow-x-hidden">
      <div className="bg-noise"></div>

      <Header />

      <main className="pt-24 lg:pt-32 pb-8 lg:pb-16 px-4 lg:px-6 max-w-7xl mx-auto min-h-[calc(100vh-80px)] relative z-10">
        {images.length === 0 ? (
          <UploadArea
            isDragging={isDragging}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onFileSelect={handleFiles}
          />
        ) : (
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-8 h-full animate-in fade-in zoom-in-95 duration-500">
            {/* Mobile: Toolbar and ImageGallery above canvas */}
            <div className="lg:w-80 flex flex-col gap-6 order-1 lg:order-1">
              {/* Mobile: Show Toolbar first, then ImageGallery (only if more than one image) */}
              <div className="lg:hidden flex flex-col gap-2">
                <Toolbar
                  pixelSize={pixelSize}
                  onPixelSizeChange={setPixelSize}
                  onUndo={handleUndo}
                  onReset={handleReset}
                  canUndo={(selectedImage?.historyStep ?? 0) > 0}
                />
                {images.length > 1 && (
                  <ImageGallery
                    images={images}
                    selectedId={selectedImageId}
                    onSelectImage={setSelectedImageId}
                    onRemoveImage={handleRemoveImage}
                  />
                )}
              </div>

              {/* Desktop: Original sidebar layout */}
              <div className="hidden lg:flex flex-col gap-6">
                <ImageGallery
                  images={images}
                  selectedId={selectedImageId}
                  onSelectImage={setSelectedImageId}
                  onRemoveImage={handleRemoveImage}
                />

                <Toolbar
                  pixelSize={pixelSize}
                  onPixelSizeChange={setPixelSize}
                  onUndo={handleUndo}
                  onReset={handleReset}
                  canUndo={(selectedImage?.historyStep ?? 0) > 0}
                />

                <div className="bg-white dark:bg-gray-900 p-4 border border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                  <label
                    htmlFor="add-more"
                    className="block w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-lime-400 dark:hover:border-lime-500 cursor-pointer transition-colors text-sm font-mono uppercase tracking-widest text-black dark:text-white"
                  >
                    + Add More Images
                  </label>
                  <input
                    id="add-more"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                </div>
              </div>
            </div>

            {selectedImage && (
              <>
                <CanvasEditor
                  canvasRef={canvasRef}
                  containerRef={containerRef}
                  file={selectedImage.file}
                  isDrawing={isDrawing}
                  startPos={startPos}
                  currentPos={currentPos}
                  mousePos={mousePos}
                  pixelSize={pixelSize}
                  onStartDraw={startDraw}
                  onMoveDraw={moveDraw}
                  onEndDraw={endDraw}
                  onMouseLeave={handleMouseLeave}
                  onClose={() => {
                    setImages([])
                    setSelectedImageId(null)
                  }}
                  onDownload={handleDownload}
                  downloadButtonText={
                    images.length === 1
                      ? 'Download Image'
                      : `Download All (${images.length} images as ZIP)`
                  }
                />
                
                {/* Mobile: Add More Images button after canvas */}
                <div className="lg:hidden bg-white dark:bg-gray-900 p-4 border border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] order-3">
                  <label
                    htmlFor="add-more-mobile"
                    className="block w-full text-center py-2 px-4 border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-lime-400 dark:hover:border-lime-500 cursor-pointer transition-colors text-sm font-mono uppercase tracking-widest text-black dark:text-white"
                  >
                    + Add More Images
                  </label>
                  <input
                    id="add-more-mobile"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  />
                </div>
              </>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
