"use client";

import React from 'react';
import { Sidebar } from './Sidebar';
import { TabBar } from './TabBar';
import { EditorProvider } from '../context/EditorContext';
import { RightPanel } from './RightPanel';

export function EditorLayout({ children, profileData, fullData }: { children: React.ReactNode, profileData: string, fullData?: any }) {
    // Right panel is permanent on Desktop (lg+), but toggleable on Mobile/Tablet (<lg).
    const [isMobilePanelOpen, setIsMobilePanelOpen] = React.useState(false);
    // Sidebar is permanent on Tablet/Desktop (md+), but toggleable on Mobile (<md).
    const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

    // Resizable Layout Logic
    const [rightPanelWidth, setRightPanelWidth] = React.useState(500);
    const [sidebarWidth, setSidebarWidth] = React.useState(250);
    const [resizingTarget, setResizingTarget] = React.useState<'sidebar' | 'preview' | null>(null);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const startResizingRight = React.useCallback(() => {
        setResizingTarget('preview');
    }, []);

    const startResizingLeft = React.useCallback(() => {
        setResizingTarget('sidebar');
    }, []);

    const stopResizing = React.useCallback(() => {
        setResizingTarget(null);
    }, []);

    const resize = React.useCallback((e: MouseEvent) => {
        if (resizingTarget === 'preview') {
            const newWidth = window.innerWidth - e.clientX;
            const maxAllowed = window.innerWidth * 0.6;
            if (newWidth > 300 && newWidth < maxAllowed) {
                setRightPanelWidth(newWidth);
            }
        } else if (resizingTarget === 'sidebar') {
            const newWidth = e.clientX;
            const maxAllowed = window.innerWidth * 0.4;
            if (newWidth > 150 && newWidth < maxAllowed) {
                setSidebarWidth(newWidth);
            }
        }
    }, [resizingTarget]);

    React.useEffect(() => {
        if (resizingTarget) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
        }
        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
        };
    }, [resizingTarget, resize, stopResizing]);

    return (
        <EditorProvider>
            <div className={`flex h-screen w-full bg-ide-bg text-ide-text-primary overflow-hidden relative ${resizingTarget ? 'cursor-col-resize select-none' : ''}`}>

                {/* Resizable Sidebar Wrapper */}
                <div
                    className={`
                        fixed inset-y-0 left-0 z-40 bg-ide-sidebar transition-transform duration-0 transform
                        md:relative md:translate-x-0
                        ${isSidebarOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'}
                        flex-shrink-0
                    `}
                    style={isMounted && window.innerWidth >= 768 ? { width: sidebarWidth } : undefined}
                >
                    <Sidebar />
                    {/* Close button for mobile sidebar */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute top-2 right-2 p-1 text-gray-500 hover:text-white"
                    >
                        <span className="sr-only">Close Sidebar</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Sidebar Splitter (Desktop Only) */}
                <div
                    className="hidden md:block w-1 hover:w-1.5 -ml-0.5 bg-gray-900 hover:bg-blue-500 cursor-col-resize z-50 flex-shrink-0 transition-colors delay-75 active:bg-blue-600 active:w-1.5"
                    onMouseDown={startResizingLeft}
                />

                {/* Mobile Sidebar Overlay (Backdrop) */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-30 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                <div className="flex-1 flex flex-col h-full bg-ide-panel relative min-w-0 border-r border-gray-800">
                    <div className="flex bg-ide-sidebar border-b border-gray-800 justify-between items-center pr-2">
                        {/* Mobile Sidebar Toggle (Hamburger) */}
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="md:hidden p-3 text-gray-500 hover:text-white transition-colors"
                        >
                            <span className="sr-only">Open Sidebar</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
                        </button>

                        <div className="flex-1 overflow-x-auto hide-scrollbar">
                            <TabBar />
                        </div>
                        {/* Mobile Right Panel Toggle */}
                        <button
                            onClick={() => setIsMobilePanelOpen(true)}
                            className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
                        >
                            <span className="sr-only">Open Panel</span>
                            {/* Simple icon or text */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="15" y1="3" x2="15" y2="21" /></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-auto relative hide-scrollbar">
                        <div className="flex min-h-full">
                            {/* Line numbers column - static for decoration */}
                            <div className="w-12 bg-ide-bg border-r border-gray-800 text-gray-600 text-right pr-3 pt-4 select-none hidden md:block font-mono text-sm leading-6 opacity-30 shrink-0">
                                {Array.from({ length: 100 }).map((_, i) => <div key={i}>{i + 1}</div>)}
                            </div>
                            <div className="flex-1 p-4 md:p-8 w-full max-w-full overflow-x-hidden hide-scrollbar">
                                {children}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Resizable Splitter (Desktop Only) */}
                <div
                    className="hidden lg:block w-1 hover:w-1.5 -ml-0.5 bg-gray-900 hover:bg-blue-500 cursor-col-resize z-50 flex-shrink-0 transition-colors delay-75 active:bg-blue-600 active:w-1.5"
                    onMouseDown={startResizingRight}
                />

                {/* Right Panel - Permanent on Desktop, Overlay on Mobile */}
                <div
                    className={`
                        fixed inset-0 z-50 lg:static lg:z-auto lg:block
                        ${isMobilePanelOpen ? 'block' : 'hidden'}
                        flex-shrink-0
                    `}
                    style={isMounted && window.innerWidth >= 1024 ? { width: rightPanelWidth } : undefined}
                >
                    <div className="absolute inset-0 bg-black/50 lg:hidden" onClick={() => setIsMobilePanelOpen(false)} />
                    <div className={`
                        absolute right-0 top-0 bottom-0 w-[85%] sm:w-[400px] lg:w-auto lg:static h-full shadow-2xl lg:shadow-none
                        ${resizingTarget ? 'pointer-events-none' : ''}
                    `}>
                        <RightPanel
                            profileData={profileData}
                            fullData={fullData}
                            isOpen={true} // Always "internally" open, visibility handled by parent wrapper
                            onClose={() => setIsMobilePanelOpen(false)}
                        />
                    </div>
                </div>
            </div>
        </EditorProvider>
    );
}
