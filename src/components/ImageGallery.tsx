import { Check, X } from 'lucide-react'
import { Button } from './Button'

interface ImageItem {
  id: string
  file: File
  src: string
  isProcessed: boolean
}

interface ImageGalleryProps {
  images: ImageItem[]
  selectedId: string | null
  onSelectImage: (id: string) => void
  onRemoveImage: (id: string) => void
}

export const ImageGallery = ({
  images,
  selectedId,
  onSelectImage,
  onRemoveImage,
}: ImageGalleryProps) => {
  return (
    <div className="bg-white dark:bg-gray-900 border border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] p-4 mb-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-xs uppercase tracking-widest font-mono text-black dark:text-white">
          Images ({images.length})
        </h3>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 max-h-60 overflow-y-auto">
        {images.map((image) => (
          <div
            key={image.id}
            className={`
              relative group cursor-pointer border-2 transition-all
              ${selectedId === image.id ? 'border-lime-400 dark:border-lime-500 shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]' : 'border-gray-300 dark:border-gray-700 hover:border-black dark:hover:border-white'}
            `}
            onClick={() => onSelectImage(image.id)}
          >
            <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
              <img
                src={image.src}
                alt={image.file.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Status Badge */}
            {image.isProcessed && (
              <div className="absolute top-1 left-1 bg-lime-400 text-black text-[8px] font-bold px-1.5 py-0.5 border border-black flex items-center gap-1">
                <Check className="w-2 h-2" />
                EDITED
              </div>
            )}

            {/* Remove Button */}
            <button
              className="absolute top-1 right-1 bg-red-500 text-white p-1 border border-black opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              onClick={(e) => {
                e.stopPropagation()
                onRemoveImage(image.id)
              }}
            >
              <X className="w-3 h-3" />
            </button>

            {/* File Name */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/70 dark:bg-white/70 text-white dark:text-black text-[8px] font-mono p-1 truncate">
              {image.file.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
