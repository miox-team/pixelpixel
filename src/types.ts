export interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark' | 'danger'
  className?: string
  disabled?: boolean
  icon?: React.ComponentType<{ className?: string }>
}

