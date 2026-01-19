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

const FileItem = ({
    file,
    activeFile,
    onClick,
    indentLevel = 0
}: {
    file: string,
    activeFile: string,
    onClick: () => void,
    indentLevel?: number
}) => {
    const displayName = file.split('/').pop() || file;
    // Calculate padding: base 1.5rem (24px) + indentLevel * 1rem
    const paddingLeft = `${indentLevel * 1.5}rem`;

    return (
        <div
            onClick={onClick}
            style={{ paddingLeft }}
            className={`py-1 pr-2 flex items-center gap-2 cursor-pointer transition-colors
                ${activeFile === file ? 'bg-gray-800 text-white' : 'text-gray-500 hover:bg-gray-800/50 hover:text-gray-300'}
            `}
        >
            {getIcon(file)}
            <span>{displayName}</span>
        </div>
    );
};

const FolderItem = ({
    name,
    files,
    activeFile,
    onFileClick,
    indentLevel = 0
}: {
    name: string,
    files: string[],
    activeFile: string,
    onFileClick: (f: string) => void,
    indentLevel?: number
}) => {
    const [isOpen, setIsOpen] = React.useState(true);
    const paddingLeft = `${indentLevel * 0.5}rem`; // Less indentation for folder header itself if needed, but usually aligns with files
    // actually sidebar root is usually 0, inputs 1.
    // Let's adjust padding logic.
    // Root PORTFOLIO is handled outside.
    // Inner folders.

    if (files.length === 0) return null;

    return (
        <div>
            <div
                className="py-1 pr-2 text-gray-400 font-bold flex items-center gap-1 cursor-pointer hover:text-gray-300"
                style={{ paddingLeft: `${indentLevel * 0.8}rem` }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                <span className="text-yellow-500/80">{name}</span>
            </div>
            {isOpen && (
                <div className="flex flex-col">
                    {files.map(file => (
                        <FileItem
                            key={file}
                            file={file}
                            activeFile={activeFile}
                            onClick={() => onFileClick(file)}
                            indentLevel={indentLevel + 1}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

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
                        <div className="flex flex-col">
                            {/* Root files */}
                            {files.filter(f => !f.includes('/')).map(file => (
                                <FileItem
                                    key={file}
                                    file={file}
                                    activeFile={activeFile}
                                    onClick={() => openFile(file)}
                                    indentLevel={1}
                                />
                            ))}

                            {/* Projects Folder */}
                            <FolderItem
                                name="projects"
                                files={files.filter(f => f.startsWith('projects/'))}
                                activeFile={activeFile}
                                onFileClick={openFile}
                                indentLevel={1}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
