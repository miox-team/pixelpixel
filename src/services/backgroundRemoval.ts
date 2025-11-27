import {
  BACKGROUND_REMOVAL_MODULE_URL,
  BACKGROUND_REMOVAL_CDN_URL,
  IMAGE_FORMAT,
  CANVAS_BLOB_QUALITY,
} from '../constants'
import type {
  BackgroundRemovalConfig,
  RemoveBackgroundModule,
} from '../types'

/**
 * Extracts the removeBackground function from the imported module
 * Handles various export patterns (named, default, nested)
 */
const extractRemoveBackgroundFunction = (
  module: RemoveBackgroundModule,
): ((blob: Blob, config: BackgroundRemovalConfig) => Promise<Blob>) => {
  if (typeof module.removeBackground === 'function') {
    return module.removeBackground
  }

  if (module.default) {
    if (typeof module.default === 'function') {
      return module.default
    }
    if (typeof module.default.removeBackground === 'function') {
      return module.default.removeBackground
    }
  }

  throw new Error(
    'Could not find removeBackground function in module exports',
  )
}

/**
 * Converts canvas to blob with proper error handling
 */
export const canvasToBlob = async (
  canvas: HTMLCanvasElement,
): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Failed to convert canvas to blob'))
          return
        }
        resolve(blob)
      },
      IMAGE_FORMAT,
      CANVAS_BLOB_QUALITY,
    )
  })
}

/**
 * Loads and initializes the background removal module
 */
const loadBackgroundRemovalModule = async (): Promise<
  (blob: Blob, config: BackgroundRemovalConfig) => Promise<Blob>
> => {
  try {
    const module = (await import(
      BACKGROUND_REMOVAL_MODULE_URL
    )) as RemoveBackgroundModule
    return extractRemoveBackgroundFunction(module)
  } catch (error) {
    throw new Error(
      `Failed to load background removal module: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

/**
 * Creates configuration for background removal with progress tracking
 */
const createBackgroundRemovalConfig = (): BackgroundRemovalConfig => {
  const isDevelopment = import.meta.env.DEV

  return {
    publicPath: BACKGROUND_REMOVAL_CDN_URL,
    progress: isDevelopment
      ? (key: string, current: number, total: number) => {
          // Only log in development
          if (import.meta.env.DEV) {
            console.log(`Downloading ${key}: ${current} of ${total}`)
          }
        }
      : undefined,
    debug: isDevelopment,
  }
}

/**
 * Removes background from canvas image
 */
export const removeBackground = async (
  canvas: HTMLCanvasElement,
): Promise<Blob> => {
  const canvasBlob = await canvasToBlob(canvas)
  const removeBackgroundFn = await loadBackgroundRemovalModule()
  const config = createBackgroundRemovalConfig()

  return removeBackgroundFn(canvasBlob, config)
}

