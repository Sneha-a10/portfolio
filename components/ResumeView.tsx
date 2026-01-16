import React from 'react';
import { Download } from 'lucide-react';

export function ResumeView() {
    return (
        <div className="flex flex-col h-full bg-white text-gray-900 overflow-hidden">
            <div className="px-3 py-2 bg-gray-100 border-b flex justify-between items-center shadow-sm z-10 h-10">
                <h2 className="font-bold text-xs uppercase tracking-wide text-gray-600">Resume Preview</h2>
                <a
                    href="/Sneha_Agarwal.pdf"
                    download
                    className="flex items-center gap-1.5 bg-ide-accent text-ide-bg px-2 py-1 rounded text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
                >
                    <Download size={12} />
                    Download PDF
                </a>
            </div>
            <div className="flex-1 bg-gray-500 overflow-auto p-4 flex justify-center">
                {/* Using an iframe as a simple PDF viewer. 
             In production, a library like react-pdf gives more control, but iframe is native and lightweight.
             Using #toolbar=0 to try and hide default PDF controls if supported. 
         */}
                <iframe
                    src="/Sneha_Agarwal.pdf#toolbar=0"
                    className="w-full h-full max-w-[800px] shadow-lg bg-white"
                    title="Resume PDF"
                />
            </div>
        </div>
    );
}
