"use client";

import React, { useState } from 'react';
import { Play, User, FileText, X } from 'lucide-react';
import { ResumeView } from './ResumeView';
import { QuickView } from './QuickView';

interface RightPanelProps {
    profileData: string;
    fullData?: any;
    isOpen: boolean;
    onClose: () => void;
    // If we are on mobile we might want to know to render differently? 
    // But CSS media queries are often better. We'll use CSS to hide/show or overlay.
}

import { useEditor } from '../context/EditorContext';

export function RightPanel({ profileData, fullData, isOpen, onClose }: RightPanelProps) {
    const [activeTab, setActiveTab] = useState<'resume' | 'quick'>('quick');
    const { activeFile } = useEditor(); // Get active file from context

    // On desktop, it's always visible if "isOpen" is passed as true (which it is now)
    // On mobile, we might still want it hidden?
    // Since user said "remove scrollbars" and "keep tabs permanent", layout implies fixed.
    // We'll stick to the "isOpen" check but now we pass true.

    if (!isOpen) return null;

    return (
        <div className={`
      w-full h-full bg-[#141414] border-l border-gray-800 flex flex-col
      shadow-none z-20
    `}>
            {/* Header Tabs */}
            <div className="flex items-center h-9 bg-[#111111] border-b border-gray-800 select-none">
                <button
                    onClick={() => setActiveTab('resume')}
                    className={`
             flex-1 h-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors
             ${activeTab === 'resume' ? 'bg-[#141414] text-white border-b-2 border-b-ide-accent' : 'text-gray-500 hover:text-gray-300'}
           `}
                >
                    <FileText size={14} />
                    Resume
                </button>
                <button
                    onClick={() => setActiveTab('quick')}
                    className={`
             flex-1 h-full flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider transition-colors
             ${activeTab === 'quick' ? 'bg-[#141414] text-white border-b-2 border-b-green-500' : 'text-gray-500 hover:text-gray-300'}
           `}
                >
                    <User size={14} />
                    Quick View
                </button>
                {/* Close for mobile overlay */}
                <button
                    onClick={onClose}
                    className="lg:hidden w-10 h-full flex items-center justify-center text-gray-500 hover:bg-red-100 hover:text-red-500"
                >
                    <X size={18} />
                </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative">
                {activeTab === 'resume' ? <ResumeView /> : <QuickView profileData={profileData} fullData={fullData} activeFile={activeFile} />}
            </div>
        </div>
    );
}
