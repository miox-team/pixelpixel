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
      'bg-lime-400 border-black text-black hover:bg-lime-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    secondary:
      'bg-white border-black text-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
    ghost:
      'bg-transparent border-transparent text-gray-500 hover:bg-gray-100 hover:text-black',
    dark: 'bg-black border-black text-white hover:bg-gray-900 shadow-[4px_4px_0px_0px_rgba(163,230,53,1)]',
    danger:
      'bg-red-500 border-black text-white hover:bg-red-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]',
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

