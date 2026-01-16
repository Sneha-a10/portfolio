import React from 'react';
import { Maximize2 } from 'lucide-react';
import Link from 'next/link';
import LandingPage from './LandingPage';

interface QuickViewProps {
    profileData: string;
    fullData?: any;
    activeFile?: string;
}

export function QuickView({ profileData, fullData, activeFile }: QuickViewProps) {
    let profile = {};
    try {
        profile = JSON.parse(profileData);
    } catch (e) {
        console.error("Failed to parse profile data", e);
    }

    // Use fullData if available, otherwise fallback (though fullData is expected)
    const data = fullData || { profile, projects: [], experience: { education: {}, experience: [] }, skills: "", achievements: "" };

    return (
        <div className="h-full flex flex-col bg-ide-bg relative border-l border-gray-800">
            {/* Toolbar / Header Overlay */}
            <div className="absolute top-4 right-6 z-10 flex gap-2">
                <Link
                    href="/preview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-[#111111]/90 backdrop-blur border border-gray-700 rounded-full shadow-sm hover:scale-105 transition-transform text-gray-400 hover:text-blue-400"
                    title="Open Full Design"
                >
                    <Maximize2 size={16} />
                </Link>
            </div>

            <div className="flex-1 overflow-y-auto hide-scrollbar bg-ide-bg">
                <LandingPage
                    profile={data.profile}
                    projects={data.projects}
                    experience={data.experience}
                    skills={data.skills}
                    achievements={data.achievements}
                    activeFile={activeFile}
                    isQuickView={true}
                />
            </div>
        </div>
    );
}
