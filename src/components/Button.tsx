import type { ButtonProps } from '../types'

export const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  disabled = false,
  icon: Icon,
}: ButtonProps) => {
  const baseStyle =
    'group relative flex items-center justify-center gap-3 px-6 py-4 font-mono text-xs font-bold uppercase tracking-widest transition-all border disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary:
      'bg-lime-400 dark:bg-lime-500 border-black dark:border-white text-black dark:text-black hover:bg-lime-300 dark:hover:bg-lime-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]',
    secondary:
      'bg-white dark:bg-gray-900 border-black dark:border-white text-black dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:active:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]',
    ghost:
      'bg-transparent border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white',
    dark: 'bg-black dark:bg-white border-black dark:border-white text-white dark:text-black hover:bg-gray-900 dark:hover:bg-gray-100 shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]',
    danger:
      'bg-red-500 dark:bg-red-600 border-black dark:border-white text-white hover:bg-red-400 dark:hover:bg-red-500 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {Icon && (
        <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
      )}
      {children}
    </button>
  )
}

