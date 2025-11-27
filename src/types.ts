export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger'
  className?: string
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

export interface BackgroundRemovalConfig {
  publicPath: string
  progress?: (key: string, current: number, total: number) => void
  debug?: boolean
}

export interface RemoveBackgroundModule {
  removeBackground?: (blob: Blob, config: BackgroundRemovalConfig) => Promise<Blob>
  default?: RemoveBackgroundModule | ((blob: Blob, config: BackgroundRemovalConfig) => Promise<Blob>)
}

export interface GeminiApiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{ text?: string }>
    }
  }>
}

