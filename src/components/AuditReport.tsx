import { AlertTriangle, X } from 'lucide-react'

interface AuditReportProps {
  report: string
  onClose: () => void
}

export const AuditReport = ({ report, onClose }: AuditReportProps) => {
  return (
    <div className="absolute bottom-4 right-4 z-40 max-w-sm w-full animate-in slide-in-from-bottom-5 fade-in duration-500">
      <div className="bg-black border border-lime-400 shadow-[8px_8px_0px_0px_rgba(163,230,53,1)] p-0 overflow-hidden">
        <div className="bg-lime-400 px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-black uppercase tracking-widest">
            <AlertTriangle className="w-4 h-4" />
            Gemini Security Audit
          </div>
          <button
            onClick={onClose}
            className="hover:bg-black hover:text-lime-400 p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="p-4 text-xs font-mono text-lime-400 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto report-content">
          {report}
        </div>
      </div>
    </div>
  )
}

