export const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-2 px-3 py-1 text-[10px] font-bold bg-black text-white uppercase tracking-widest font-mono border border-black">
    {children}
  </span>
)

