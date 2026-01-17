"use client";

import { User, X, Maximize2 } from 'lucide-react';
import { QuickView } from './QuickView';
import { useEditor } from '../context/EditorContext';
import Link from 'next/link';

interface RightPanelProps {
    profileData: string;
    fullData?: any;
    isOpen: boolean;
    onClose: () => void;
}

export function RightPanel({ profileData, fullData, isOpen, onClose }: RightPanelProps) {
    const { activeFile } = useEditor();

    return (
        <div className={`h-full flex flex-col border-l border-ide-border bg-ide-bg transition-all duration-300 w-full`}>
            <div className="relative flex items-center justify-end h-10 bg-ide-sidebar border-b border-ide-border px-4">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium text-ide-text-secondary uppercase tracking-wider flex items-center gap-2 pointer-events-none">
                    <User size={14} />
                    Quick View
                </span>
                <div className="flex items-center gap-2 relative z-10">
                    <Link
                        href="/preview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 hover:text-blue-400 transition-colors"
                        title="Open Full Design"
                    >
                        <Maximize2 size={16} />
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden text-gray-500 hover:text-red-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative">
                <QuickView profileData={profileData} fullData={fullData} activeFile={activeFile} />
            </div>
        </div>
    );
}
