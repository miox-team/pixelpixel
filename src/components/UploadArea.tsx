interface UploadAreaProps {
  isDragging: boolean
  onDragOver: (e: React.DragEvent) => void
  onDragLeave: (e: React.DragEvent) => void
  onDrop: (e: React.DragEvent) => void
  onFileSelect: (files: FileList) => void
}

export const UploadArea = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
}: UploadAreaProps) => {
  return (
    <div className="grow flex flex-col items-center justify-center text-center container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal dark:text-white uppercase">
        Effortlessly Protect
      </h2>
      <h2 className="font-display font-black text-5xl md:text-7xl lg:text-8xl tracking-tighter text-charcoal dark:text-white uppercase -mt-2 md:-mt-4">
        <span className="text-highlight" style={{ '--highlight-color': '#dcfce7' } as React.CSSProperties}>
          What Matters
        </span>
      </h2>
      <p className="mt-8 max-w-2xl text-lg md:text-xl text-slate-700 dark:text-slate-300">
        Achieve peace of mind with our intuitive, privacy-first image editor – no
        uploads, no data stored, just pure security.
      </p>
      <div className="mt-12 w-full max-w-2xl">
        <div
          className={`relative flex flex-col items-center justify-center w-full h-80 bg-white dark:bg-slate-800/50 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-8 transition-colors ${
            isDragging
              ? 'border-primary dark:border-primary bg-green-50 dark:bg-slate-800'
              : 'hover:border-primary dark:hover:border-primary hover:bg-green-50 dark:hover:bg-slate-800'
          }`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-lg shadow-lg">
              <span className="material-symbols-outlined text-4xl text-white">
                upload
              </span>
            </div>
            <p className="mt-6 text-lg font-semibold text-charcoal dark:text-white">
              Drop your images here
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              JPG · PNG · WEBP · MAX 50MB EACH · MULTIPLE FILES
            </p>
            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              PASTE (CTRL/CMD+V)
            </p>
          </div>
          <input
            id="file-upload"
            aria-label="File upload area"
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => e.target.files && onFileSelect(e.target.files)}
          />
        </div>
      </div>
    </div>
  )
}
