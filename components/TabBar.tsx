"use client";

import React from 'react';
import { useEditor } from '../context/EditorContext';
import { X, FileJson, FileText, FileCode, File } from 'lucide-react';

const getIcon = (fileName: string) => {
    if (fileName.endsWith('json')) return <FileJson className="w-3 h-3 text-yellow-500" />;
    if (fileName.endsWith('md')) return <FileText className="w-3 h-3 text-blue-500" />;
    if (fileName.endsWith('txt')) return <FileCode className="w-3 h-3 text-gray-500" />;
    if (fileName.endsWith('pdf')) return <File className="w-3 h-3 text-red-500" />;
    return <File className="w-3 h-3" />;
}

export function TabBar() {
    const { openFiles, activeFile, openFile, closeFile } = useEditor();

    if (openFiles.length === 0) return null;

    return (
        <div className="flex h-9 bg-ide-sidebar border-b border-gray-800 overflow-x-auto font-mono text-sm hide-scrollbar">
            {openFiles.map(file => (
                <div
                    key={file}
                    className={`
            flex items-center gap-2 px-3 min-w-fit border-r border-gray-800 cursor-pointer select-none group
            ${activeFile === file ? 'bg-ide-panel text-ide-text-primary border-t-2 border-t-ide-accent' : 'text-gray-500 hover:bg-gray-800 bg-ide-bg'}
          `}
                    onClick={() => openFile(file)}
                >
                    {getIcon(file)}
                    <span>{file}</span>
                    <span
                        onClick={(e) => { e.stopPropagation(); closeFile(file); }}
                        className={`rounded-sm p-0.5 ml-1 ${activeFile === file ? 'opacity-100 hover:bg-gray-700' : 'opacity-0 group-hover:opacity-100 hover:bg-gray-700'}`}
                    >
                        <X size={12} />
                    </span>
                </div>
            ))}
        </div>
    );
}
