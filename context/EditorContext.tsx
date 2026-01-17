"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface EditorContextType {
    activeFile: string;
    openFiles: string[];
    files: string[];
    openFile: (fileName: string) => void;
    closeFile: (fileName: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({ children, initialFiles = [] }: { children: ReactNode, initialFiles?: string[] }) {
    const pathname = usePathname();
    const router = useRouter();

    // Initialize with profile.json or the current route
    const [openFiles, setOpenFiles] = useState<string[]>(["profile.json"]);
    const [activeFile, setActiveFile] = useState<string>("profile.json");

    // Use the passed initialFiles, or fallback if empty (though layout should provide them)
    const availableFiles = initialFiles.length > 0 ? initialFiles : ["profile.json"];

    useEffect(() => {
        // Sync active file with URL
        let currentFile = "";

        if (pathname === '/' || pathname === '/ide') {
            currentFile = 'profile.json';
        } else if (pathname?.startsWith('/ide/')) {
            currentFile = pathname.replace('/ide/', '');
        }

        // If the file exists in our known files, set it as active
        if (availableFiles.includes(currentFile)) {
            setActiveFile(currentFile);
            setOpenFiles(prev => {
                if (!prev.includes(currentFile)) {
                    return [...prev, currentFile];
                }
                return prev;
            });
        }
    }, [pathname, availableFiles]);

    const openFile = (fileName: string) => {
        setOpenFiles(prev => {
            if (!prev.includes(fileName)) {
                return [...prev, fileName];
            }
            return prev;
        });
        setActiveFile(fileName);
        router.push(`/ide/${fileName}`);
    };

    const closeFile = (fileName: string) => {
        const newOpenFiles = openFiles.filter(f => f !== fileName);
        setOpenFiles(newOpenFiles);

        if (activeFile === fileName) {
            if (newOpenFiles.length > 0) {
                // Switch to the last opened file
                const lastFile = newOpenFiles[newOpenFiles.length - 1];
                openFile(lastFile);
            } else {
                // If no files open, maybe go to a default or stay? 
                // For now, let's just keep staying on the page or redirect to /
                // But in an IDE, closing all tabs usually shows an empty screen.
                // Let's enforce profile.json is always open if nothing else?
                // Or allowing empty state.
                setActiveFile("");
                router.push("/");
            }
        }
    };

    return (
        <EditorContext.Provider value={{ activeFile, openFiles, files: availableFiles, openFile, closeFile }}>
            {children}
        </EditorContext.Provider>
    );
}

export function useEditor() {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
}
