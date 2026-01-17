"use client";

import React from 'react';
import { useEditor } from '../context/EditorContext';
import { FileJson, FileText, FileCode, File, ChevronRight, ChevronDown } from 'lucide-react';

const getIcon = (fileName: string) => {
    if (fileName.endsWith('json')) return <FileJson className="w-4 h-4 text-yellow-400" />;
    if (fileName.endsWith('md')) return <FileText className="w-4 h-4 text-blue-400" />;
    if (fileName.endsWith('txt')) return <FileCode className="w-4 h-4 text-gray-400" />;
    if (fileName.endsWith('pdf')) return <File className="w-4 h-4 text-red-400" />;
    return <File className="w-4 h-4" />;
}

export function Sidebar() {
    const { activeFile, openFile, files } = useEditor();
    const [isOpen, setIsOpen] = React.useState(true);

    return (
        <div className="w-full bg-ide-sidebar border-r border-gray-800 flex flex-col font-mono text-sm select-none h-full">
            <div className="p-2 text-gray-400 text-xs font-bold tracking-wider flex justify-between items-center">
                <span>EXPLORER</span>
            </div>
            <div className="flex-1 overflow-y-auto mt-2 hide-scrollbar">
                <div
                    className="px-2 py-1 text-gray-400 font-bold flex items-center gap-1 cursor-pointer hover:text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    <span>PORTFOLIO</span>
                </div>
                {isOpen && (
                    <div className="flex flex-col">
                        {files.map(file => (
                            <div
                                key={file}
                                onClick={() => openFile(file)}
                                className={`px-6 py-1 flex items-center gap-2 cursor-pointer transition-colors
                    ${activeFile === file ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-800/50 hover:text-gray-300'}
                  `}
                            >
                                {getIcon(file)}
                                <span>{file}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
