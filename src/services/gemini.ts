import { GEMINI_API_BASE_URL, GEMINI_MODEL, IMAGE_FORMAT } from '../constants'
import type { GeminiApiResponse } from '../types'

/**
 * Extracts base64 data from canvas data URL
 */
export const extractBase64FromCanvas = (canvas: HTMLCanvasElement): string => {
  const dataUrl = canvas.toDataURL(IMAGE_FORMAT)
  const base64Index = dataUrl.indexOf(',')
  if (base64Index === -1) {
    throw new Error('Invalid canvas data URL format')
  }
  return dataUrl.substring(base64Index + 1)
}

/**
 * Builds the Gemini API URL with model and API key
 */
const buildGeminiApiUrl = (apiKey: string): string => {
  return `${GEMINI_API_BASE_URL}/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`
}

/**
 * Creates the privacy audit prompt for Gemini
 */
const createPrivacyAuditPrompt = (): string => {
  return "You are a privacy security bot called 'PixelGuard'. Analyze this image for privacy risks. Identify visible faces, license plates, house numbers, street signs, credit cards, or sensitive documents. Return a concise, bulleted 'Security Audit' report. Start with 'SECURITY AUDIT REPORT:'. Use uppercase for emphasis. Be extremely brief and direct."
}

/**
 * Parses Gemini API response and extracts audit report text
 */
const parseGeminiResponse = (data: GeminiApiResponse): string => {
  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    'No privacy risks detected or analysis failed.'
  return text
}

/**
 * Performs privacy audit using Gemini AI
 */
export const performPrivacyAudit = async (
  canvas: HTMLCanvasElement,
): Promise<string> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ''
  if (!apiKey) {
    throw new Error('Gemini API key is not configured')
  }

  const base64Data = extractBase64FromCanvas(canvas)
  const apiUrl = buildGeminiApiUrl(apiKey)
  const prompt = createPrivacyAuditPrompt()

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: IMAGE_FORMAT,
                data: base64Data,
              },
            },
          ],
        },
      ],
    }),
  })

  if (!response.ok) {
    throw new Error(
      `Gemini API request failed: ${response.status} ${response.statusText}`,
    )
  }

  const data = (await response.json()) as GeminiApiResponse
  return parseGeminiResponse(data)
}

