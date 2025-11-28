import { MIN_SELECTION_SIZE } from '../constants'

/**
 * Pixelates a rectangular region on a canvas
 */
export const pixelate = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  size: number,
): void => {
  if (w < 0) {
    x += w
    w = Math.abs(w)
  }
  if (h < 0) {
    y += h
    h = Math.abs(h)
  }

  for (let py = y; py < y + h; py += size) {
    for (let px = x; px < x + w; px += size) {
      const sampleX = Math.min(px + Math.floor(size / 2), x + w - 1)
      const sampleY = Math.min(py + Math.floor(size / 2), y + h - 1)

      if (sampleX >= ctx.canvas.width || sampleY >= ctx.canvas.height)
        continue

      const pixel = ctx.getImageData(sampleX, sampleY, 1, 1).data
      ctx.fillStyle = `rgba(${pixel[0]},${pixel[1]},${pixel[2]},${pixel[3]})`
      ctx.fillRect(px, py, size, size)
    }
  }
}

/**
 * Gets canvas coordinates from mouse or touch event
 */
export const getCanvasCoords = (
  e: React.MouseEvent | React.TouchEvent,
  canvas: HTMLCanvasElement,
): { x: number; y: number } => {
  const rect = canvas.getBoundingClientRect()
  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height

  let clientX: number
  let clientY: number
  if ('touches' in e) {
    clientX = e.touches[0].clientX
    clientY = e.touches[0].clientY
  } else {
    clientX = e.clientX
    clientY = e.clientY
  }

  return {
    x: (clientX - rect.left) * scaleX,
    y: (clientY - rect.top) * scaleY,
  }
}

/**
 * Validates if selection size is large enough
 */
export const isValidSelection = (width: number, height: number): boolean => {
  return Math.abs(width) >= MIN_SELECTION_SIZE && Math.abs(height) >= MIN_SELECTION_SIZE
}


