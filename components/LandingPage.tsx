"use client";

import React from 'react';
import {
    Github,
    Linkedin,
    Mail,
    Download,
    ExternalLink,
    Code2,
    Terminal,
    Cpu,
    ArrowRight,
    Briefcase,
    GraduationCap,
    MapPin,
    Gamepad2,
    Timer,
    Sparkles
} from 'lucide-react';

interface LandingPageProps {
    profile: any;
    projects: any[]; // We'll parse this locally or pass structured
    experience: any;
    skills: string; // Raw text to parse
    achievements: string; // Raw text to parse
    activeFile?: string;
    isQuickView?: boolean;
}

export default function LandingPage({ profile, projects, experience, skills, achievements, activeFile, isQuickView = false }: LandingPageProps) {
    const [showToast, setShowToast] = React.useState(false);
    // State for Interaction (Tap/Click to expand) - Unified for both mobile and desktop
    const [activeFunBuild, setActiveFunBuild] = React.useState<number | null>(null);
    const funBuildsRef = React.useRef<HTMLDivElement>(null);

    // Scroll to section on activeFile change
    React.useEffect(() => {
        if (!activeFile) return;

        const sectionMap: { [key: string]: string } = {
            'profile.json': 'hero',
            'projects.md': 'projects',
            'experience.json': 'experience',
            'skills.txt': 'skills',
            'achievements.md': 'achievements'
        };

        const sectionId = sectionMap[activeFile];
        if (sectionId) {
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }, [activeFile]);

    // Close fun build popup on click outside (Robust Ref check)
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (funBuildsRef.current && !funBuildsRef.current.contains(event.target as Node)) {
                setActiveFunBuild(null);
            }
        };
        // Use mousedown to catch clicks before they might be handled elsewhere/dragged
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // --- Helpers & parsers ---

    // Parse Skills from txt
    const parseSkills = (text: string) => {
        const categories: { [key: string]: string[] } = {};
        let currentCategory = 'General';

        text.split('\n').forEach(line => {
            line = line.trim();
            if (!line) return;
            if (line.endsWith(':')) {
                currentCategory = line.replace(':', '');
                categories[currentCategory] = [];
            } else if (line.startsWith('-')) {
                const skill = line.replace('-', '').trim();
                if (!categories[currentCategory]) categories[currentCategory] = [];
                categories[currentCategory].push(skill);
            }
        });
        return categories;
    };
    const parsedSkills = parseSkills(skills);

    // Parse Achievements (Simple parser for the markdown structure)
    const parseAchievements = (text: string) => {
        if (!text) return {};
        const sections: { [key: string]: string[] } = {};
        let currentSection = '';

        text.split('\n').forEach(line => {
            line = line.trim();
            if (!line) return;
            if (line.startsWith('## ')) {
                currentSection = line.replace('## ', '').trim();
                sections[currentSection] = [];
            } else if (line.startsWith('- ') && currentSection) {
                sections[currentSection].push(line.replace('- ', ''));
            } else if (currentSection && sections[currentSection].length > 0) {
                // Append continuation lines to the last item
                sections[currentSection][sections[currentSection].length - 1] += ' ' + line;
            }
        });
        return sections;
    };
    const parsedAchievements = parseAchievements(achievements);

    // Get initials
    const name = profile.name || "Developer";
    const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();
    const firstName = name.split(' ')[0];

    // Colors
    // Colors - Updated to match IDE Theme
    const colors = {
        bg: 'bg-ide-bg', // Using globals.css vars
        section: 'bg-[#111111]',
        card: 'bg-[#0a0a0a]', // Darker for cards
        text: 'text-ide-text-primary',
        textSecondary: 'text-zinc-500',
        accent: 'text-blue-400', // Matches file icons
        border: 'border-zinc-800',
    };

    // Responsive helpers for Quick View
    const textSize = {
        h1: isQuickView ? 'text-2xl' : 'text-5xl md:text-6xl',
        p: isQuickView ? 'text-sm' : 'text-lg md:text-xl',
        sectionTitle: isQuickView ? 'text-xl' : 'text-3xl',
        cardTitle: isQuickView ? 'text-lg' : 'text-2xl',
    };
    const spacing = isQuickView ? 'space-y-12' : 'space-y-24';
    const padding = isQuickView ? 'px-4' : 'px-6';

    const funBuilds = [
        {
            id: 0,
            name: "Nokia Snake Game",
            icon: (
                <div className="w-full h-full p-2 flex items-center justify-center rounded-full overflow-hidden">
                    <img
                        src="/snake-icon.jpg"
                        alt="Snake Game"
                        className="w-full h-full object-cover rounded-full filter brightness-90 group-hover:brightness-110 transition-all duration-300"
                    />
                </div>
            ),
            desc: "Computer vision-based implementation of the classic game",
            tech: ["OpenCV", "MediaPipe"],
            domain: "Computer Vision",
            link: "https://github.com/Sneha-a10/nokia_snake_game",
            isPlaceholder: false
        },
        {
            id: 1,
            name: "Coming Soon",
            icon: <Timer size={24} />,
            desc: "Experimental project in development.",
            tech: ["TBD"],
            domain: "Future Build",
            link: null,
            isPlaceholder: true
        },
        {
            id: 2,
            name: "Coming Soon",
            icon: <Sparkles size={24} />,
            desc: "Ideas brewing for the next experiment.",
            tech: ["TBD"],
            domain: "Future Build",
            link: null,
            isPlaceholder: true
        }
    ];

    return (
        <div className={`min-h-screen ${colors.bg} ${colors.text} font-sans selection:bg-[#38BDF8] selection:text-[#0F1117]`}>
            {/* 1. HEADER - Hide in Quick View as it duplicates tabs */}
            {!isQuickView && (
                <header className={`sticky top-0 w-full z-10 ${colors.bg}/90 backdrop-blur-sm border-b ${colors.border}`}>
                    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                        <div className="font-bold text-lg tracking-tight">
                            {name}
                        </div>
                        <div className="flex items-center gap-6 text-sm font-medium">
                            {profile.links?.resume && (
                                <a
                                    href={`/${profile.links.resume}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${colors.textSecondary} hover:${colors.text} transition-colors`}
                                >
                                    View Resume
                                </a>
                            )}
                            <a href="#contact" className={`${colors.accent} hover:opacity-80 transition-opacity`}>
                                Contact
                            </a>
                        </div>
                    </div>
                </header>
            )}

            <main className={`${isQuickView ? 'pt-8' : 'pt-24'} pb-20 ${spacing}`}>
                {/* 2. HERO (Keep as is) */}
                <section id="hero" className={`max-w-6xl mx-auto ${padding}`}>
                    <div className={`flex ${isQuickView ? 'flex-col-reverse gap-8 text-center' : 'flex-col-reverse md:flex-row gap-12 md:gap-20 text-center md:text-left'} items-center`}>
                        <div className="flex-1 space-y-6">
                            <div className={`inline-block px-3 py-1 text-xs font-semibold tracking-wider ${colors.textSecondary} uppercase ${colors.card} rounded-full border ${colors.border}`}>
                                {profile.role}
                            </div>

                            <h1 className={`${textSize.h1} font-extrabold tracking-tight leading-tight text-white`}>
                                Building intelligent <br />
                                <span className={colors.accent}>software systems.</span>
                            </h1>

                            <p className={`${textSize.p} ${colors.textSecondary} leading-relaxed max-w-xl mx-auto ${isQuickView ? '' : 'md:mx-0'}`}>
                                {profile.summary}
                            </p>

                            <div className={`flex flex-col items-center ${isQuickView ? '' : 'md:flex-row md:items-start'} gap-6`}>
                                <div className="flex items-center gap-4">
                                    <a href="#projects" className={`px-6 py-2.5 bg-[#38BDF8] text-[#0F1117] font-bold rounded hover:opacity-90 transition-all text-sm`}>
                                        View Projects
                                    </a>
                                    {profile.links?.resume && !isQuickView && (
                                        <a
                                            href={`/${profile.links.resume}`}
                                            download
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`px-6 py-2.5 bg-transparent border ${colors.border} ${colors.text} font-medium rounded hover:bg-[#1F2937] transition-all flex items-center gap-2 text-sm`}
                                        >
                                            <Download size={16} />
                                            Resume
                                        </a>
                                    )}
                                </div>

                                {!isQuickView && (
                                    <div className="flex flex-col items-center md:items-start gap-2 group">
                                        <a
                                            href="/ide"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-6 py-2.5 rounded border border-[#38BDF8]/30 text-white font-medium text-sm flex items-center gap-2 hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]/60 hover:shadow-[0_0_15px_rgba(56,189,248,0.15)] transition-all animate-pulse-subtle"
                                        >
                                            <Terminal size={16} className="text-[#38BDF8]" />
                                            Go to IDE
                                        </a>
                                        <span className="text-[10px] text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            Explore my work in an interactive IDE view
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Profile Photo */}
                        <div className="relative group">
                            <div className={`absolute inset-0 ${colors.accent} rounded-full blur-2xl opacity-10 group-hover:opacity-20 transition-opacity`}></div>
                            <div className={`relative ${isQuickView ? 'w-32 h-32' : 'w-64 h-64 md:w-80 md:h-80'} rounded-full overflow-hidden border-4 border-[#1F2937] shadow-2xl`}>
                                {profile.avatar ? (
                                    <img
                                        src={profile.avatar}
                                        alt={name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className={`w-full h-full ${colors.card} flex items-center justify-center ${isQuickView ? 'text-4xl' : 'text-7xl'} font-bold ${colors.textSecondary}`}>
                                        {initials}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. FEATURED PROJECTS (Moved after Hero) */}
                <section id="projects" className={`max-w-5xl mx-auto ${padding} space-y-8`}>
                    <div className="text-center space-y-2">
                        <h2 className={`${textSize.sectionTitle} font-bold text-white`}>Featured Work</h2>
                        <p className={colors.textSecondary}>Selected production-ready projects.</p>
                    </div>

                    <div className="space-y-6">
                        {projects.map((project, idx) => (
                            <div key={idx} className={`group relative p-6 rounded-2xl ${colors.card} border ${colors.border} hover:border-[#38BDF8]/50 transition-all`}>
                                <div className={`flex ${isQuickView ? 'flex-col gap-4' : 'flex-col md:flex-row gap-8'} justify-between items-start`}>
                                    <div className="space-y-4 flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className={`${textSize.cardTitle} font-bold text-white group-hover:text-[#38BDF8] transition-colors`}>
                                                {project.title}
                                            </h3>
                                        </div>
                                        <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
                                            {project.description}
                                        </p>
                                        <div className="flex flex-wrap gap-2 pt-2">
                                            {project.tech.map((t: string, i: number) => (
                                                <span key={i} className={`px-2 py-1 text-xs font-medium rounded-full ${colors.bg} ${colors.accent} border ${colors.border}`}>
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-row gap-3">
                                        {project.links.github && (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-center gap-2 px-3 py-2 bg-[#1F2937] hover:bg-[#374151] rounded text-xs font-medium transition-colors text-white`}
                                            >
                                                <Github size={14} />
                                                Code
                                            </a>
                                        )}
                                        {project.links.demo && (
                                            <a
                                                href={project.links.demo}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`flex items-center justify-center gap-2 px-3 py-2 border ${colors.border} hover:bg-[#1F2937] rounded text-xs font-medium transition-colors`}
                                            >
                                                <ExternalLink size={14} />
                                                Demo
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3.5. FUN BUILDS (FIX 1, 2, 3 Implemented + Click Interaction) */}
                <section id="fun-builds" className={`max-w-5xl mx-auto ${padding}`}>
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12">
                        {/* Section Header */}
                        <div className="shrink-0 mb-4 md:mb-0">
                            <h3 className={`${textSize.cardTitle} font-bold text-white`}>Fun Builds</h3>
                            <p className={`${colors.textSecondary} text-sm mt-1 font-medium`}>Experimental & Playful</p>
                        </div>

                        {/* Badges Container */}
                        <div ref={funBuildsRef} className="flex flex-col md:flex-row items-center gap-10 md:gap-12 w-full md:w-auto">
                            {funBuilds.map((build) => (
                                <div
                                    key={build.id}
                                    className={`
                                        group relative flex flex-col items-center w-full md:w-auto
                                        ${build.isPlaceholder ? 'opacity-50 cursor-default' : 'cursor-pointer'}
                                    `}
                                    onClick={(e) => {
                                        e.stopPropagation(); // prevent immediate close if bubbling
                                        if (build.isPlaceholder) return;
                                        // Toggle active state for both Mobile (Inline) and Desktop (Popup)
                                        setActiveFunBuild(activeFunBuild === build.id ? null : build.id);
                                    }}
                                >
                                    {/* Caption Above (Project Name) */}
                                    <span className={`
                                        mb-3 text-xs font-bold tracking-wide transition-colors text-center 
                                        ${build.isPlaceholder
                                            ? 'text-gray-600'
                                            : (activeFunBuild === build.id ? 'text-white scale-105' : 'text-gray-300 group-hover:text-white')
                                        }
                                    `}>
                                        {build.name}
                                    </span>

                                    {/* Circular Badge */}
                                    <div className={`
                                        w-16 h-16 rounded-full ${colors.card} border-2 
                                        flex items-center justify-center relative z-10 transition-all duration-300
                                        ${build.isPlaceholder
                                            ? 'border-dashed border-zinc-800 text-zinc-700'
                                            : (activeFunBuild === build.id
                                                ? 'border-[#38BDF8] text-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.25)]'
                                                : `border-zinc-800 ${colors.textSecondary} group-hover:border-[#38BDF8]/60 group-hover:text-[#38BDF8]`)
                                        }
                                    `}>
                                        {build.icon}
                                    </div>

                                    {/* Caption Below (Domain) */}
                                    <span className={`
                                        mt-3 text-[10px] uppercase tracking-wider font-bold transition-colors 
                                        ${build.isPlaceholder
                                            ? 'text-gray-700'
                                            : (activeFunBuild === build.id ? 'text-gray-300' : 'text-gray-500 group-hover:text-gray-400')
                                        }
                                    `}>
                                        {build.domain}
                                    </span>

                                    {/* DESKTOP POPUP (Visible only if Active + Desktop size) */}
                                    {!build.isPlaceholder && (
                                        <div
                                            onClick={(e) => e.stopPropagation()} // Clicking inside popup shouldn't close it
                                            className={`
                                                hidden md:block absolute bottom-full mb-6 w-60 
                                                p-4 rounded-xl ${colors.card} border ${colors.border} shadow-2xl
                                                transition-all duration-300 text-left z-20 cursor-auto
                                                ${activeFunBuild === build.id
                                                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                                                    : 'opacity-0 translate-y-2 pointer-events-none'
                                                }
                                            `}
                                        >
                                            <div className={`absolute bottom-[-6px] left-1/2 -translate-x-1/2 w-3 h-3 ${colors.card} border-b border-r ${colors.border} rotate-45`}></div>
                                            <div className="space-y-2 relative z-10">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-white text-sm">{build.name}</h4>
                                                    {build.link && <ExternalLink size={12} className="text-[#38BDF8]" />}
                                                </div>
                                                <p className="text-xs text-gray-400 leading-relaxed">
                                                    {build.desc}
                                                </p>
                                                <div className="flex flex-wrap gap-1.5 pt-1">
                                                    {build.tech.map(t => (
                                                        <span key={t} className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-[#1F2937] text-gray-300 border border-gray-800">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                {/* Desktop Link Cover */}
                                                {build.link && (
                                                    <a href={build.link} target="_blank" rel="noreferrer" className="absolute inset-0 z-20" aria-label={`View ${build.name}`}></a>
                                                )}
                                            </div>
                                        </div>
                                    )}

                                    {/* MOBILE EXPANDED CARD (Visible only if Active + Mobile size) */}
                                    {!build.isPlaceholder && activeFunBuild === build.id && (
                                        <div
                                            className="md:hidden mt-4 w-full p-4 rounded-xl bg-[#111111] border border-zinc-800 animate-in fade-in slide-in-from-top-2 duration-200 cursor-auto"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="space-y-3 text-center">
                                                <p className="text-sm text-gray-300 leading-relaxed">
                                                    {build.desc}
                                                </p>
                                                <div className="flex flex-wrap justify-center gap-2">
                                                    {build.tech.map(t => (
                                                        <span key={t} className="px-2 py-1 rounded text-xs font-medium bg-[#1F2937] text-gray-300 border border-gray-800">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                                {build.link && (
                                                    <a href={build.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#38BDF8] hover:underline mt-2">
                                                        View on GitHub <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 4. EXPERIENCE & EDUCATION (Moved after Projects) */}
                <section id="experience" className={`max-w-6xl mx-auto ${padding}`}>
                    <div className={`grid ${isQuickView ? 'grid-cols-1 gap-8' : 'md:grid-cols-2 gap-12'}`}>
                        {/* Experience */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Briefcase className={colors.accent} size={20} />
                                <h2 className={`${textSize.sectionTitle} font-bold text-white`}>Experience</h2>
                            </div>
                            <div className="space-y-6 border-l border-[#1F2937] pl-6 relative">
                                {experience.experience.map((job: any, idx: number) => (
                                    <div key={idx} className="relative">
                                        <div className={`absolute -left-[29px] top-1.5 w-3 h-3 rounded-full ${colors.bg} border-2 border-[#38BDF8]`}></div>
                                        <h3 className={`${textSize.cardTitle} font-bold text-white`}>{job.role}</h3>
                                        <div className={`text-sm ${colors.textSecondary} mb-1`}>{job.organization}</div>
                                        <div className="text-xs font-mono text-[#6B7280] mb-2">{job.duration}</div>
                                        <ul className={`list-disc list-outside ml-4 space-y-1 ${colors.textSecondary} text-xs marker:text-[#38BDF8]`}>
                                            {job.highlights.slice(0, 2).map((pt: string, i: number) => (
                                                <li key={i}>{pt}</li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Education */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <GraduationCap className={colors.accent} size={20} />
                                <h2 className={`${textSize.sectionTitle} font-bold text-white`}>Education</h2>
                            </div>
                            <div className={`p-6 rounded-2xl ${colors.card} border ${colors.border}`}>
                                <h3 className="text-lg font-bold text-white">{experience.education.degree}</h3>
                                <p className={`${colors.textSecondary} mt-1 text-sm`}>{experience.education.university}</p>
                                <div className="flex items-center gap-4 mt-4 text-xs text-[#6B7280] font-mono">
                                    <span>{experience.education.duration}</span>
                                    <span>•</span>
                                    <span>{experience.education.major}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. SKILLS SNAPSHOT (Refactored) */}
                <section id="skills" className={`max-w-6xl mx-auto ${padding}`}>
                    <div className="mb-8 text-center">
                        <h2 className={`${textSize.sectionTitle} font-bold text-white`}>Skills Snapshot</h2>
                    </div>

                    <div className={`grid ${isQuickView ? 'grid-cols-1 gap-6' : 'grid-cols-1 md:grid-cols-2 gap-6'}`}>
                        {Object.entries(parsedSkills).slice(0, 4).map(([category, items]) => (
                            <div key={category} className={`p-6 rounded-2xl ${colors.card} border ${colors.border} hover:border-[#38BDF8]/30 transition-all group`}>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4 group-hover:text-[#38BDF8] transition-colors">
                                    {category}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {items.map(skill => (
                                        <span key={skill} className={`px-2.5 py-1 text-xs font-medium rounded-md bg-[#1F2937]/50 text-gray-300 border border-gray-800 group-hover:border-gray-700 transition-colors`}>
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. ACHIEVEMENTS (New Section) */}
                <section id="achievements" className={`max-w-4xl mx-auto ${padding}`}>
                    <div className="text-center space-y-2 mb-8">
                        <h2 className={`${textSize.sectionTitle} font-bold text-white`}>Achievements</h2>
                    </div>
                    <div className={`grid ${isQuickView ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'} gap-6`}>
                        {Object.entries(parsedAchievements).map(([category, items]) => (
                            <div key={category} className={`p-6 rounded-2xl ${colors.card} border ${colors.border}`}>
                                <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                                    {category}
                                </h3>
                                <ul className="space-y-3">
                                    {items.map((item, i) => (
                                        <li key={i} className={`text-sm ${colors.textSecondary} flex items-start gap-2`}>
                                            <span className="text-[#38BDF8] mt-1">•</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 7. FOCUS AREAS (Refactored) */}
                {profile.focus && profile.focus.length > 0 && (
                    <section id="about" className={`max-w-6xl mx-auto ${padding}`}>
                        <div className="mb-12">
                            <h2 className={`${textSize.sectionTitle} font-bold text-white text-center`}>Focus Areas</h2>
                        </div>
                        <div className={`grid ${isQuickView ? 'grid-cols-1' : 'md:grid-cols-3'} gap-6`}>
                            {profile.focus.slice(0, 3).map((area: any, idx: number) => (
                                <div key={idx} className={`p-8 rounded-2xl ${colors.card} border ${colors.border} hover:border-[#38BDF8]/50 transition-all group relative overflow-hidden`}>
                                    <div className={`w-12 h-12 rounded-xl bg-[#38BDF8]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                        {idx === 0 ? <Cpu className={colors.accent} size={24} /> :
                                            idx === 1 ? <Code2 className={colors.accent} size={24} /> :
                                                <Terminal className={colors.accent} size={24} />}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#38BDF8] transition-colors">
                                        {area.title}
                                    </h3>
                                    <p className={`${colors.textSecondary} text-sm leading-relaxed`}>
                                        {area.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* 8. CONTACT FORM (New "Let's Connect") */}
                <section id="contact" className={`max-w-2xl mx-auto ${padding} py-12 md:py-20`}>
                    <div className="text-center mb-10 space-y-2">
                        <h2 className={`${textSize.sectionTitle} font-bold text-white`}>Let's Connect</h2>
                        <p className={`${colors.textSecondary} text-sm max-w-md mx-auto`}>
                            Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                        </p>
                    </div>

                    <div className={`p-8 rounded-2xl ${colors.section} border ${colors.border} shadow-2xl relative overflow-hidden group`}>
                        {/* Subtle background glow */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#38BDF8]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[#38BDF8]/10 transition-colors duration-700"></div>

                        <form
                            className="space-y-4 relative z-10"
                            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const formData = new FormData(form);
                                const name = formData.get('name') as string;
                                const message = formData.get('message') as string;

                                const subject = `Portfolio Contact — ${name}`;
                                const body = `Hi Sneha,\n\n${message}\n\n— ${name}`;

                                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(profile.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                                window.open(gmailUrl, '_blank');
                            }}
                        >
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Name"
                                        className={`w-full px-4 py-3 rounded-lg ${colors.card} border ${colors.border} text-white text-sm focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] outline-none transition-all placeholder:text-gray-600`}
                                    />
                                </div>
                                <div className="space-y-1">
                                    <textarea
                                        required
                                        name="message"
                                        id="message"
                                        rows={4}
                                        placeholder="Message"
                                        className={`w-full px-4 py-3 rounded-lg ${colors.card} border ${colors.border} text-white text-sm focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] outline-none transition-all resize-none placeholder:text-gray-600`}
                                    ></textarea>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <button
                                    type="submit"
                                    className="w-full py-3.5 bg-[#38BDF8] text-[#0F1117] font-bold rounded-lg hover:opacity-90 hover:scale-[1.01] transition-all flex items-center justify-center gap-2 text-sm shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                                >
                                    Send Message
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Secondary Links */}
                    <div className="flex justify-center gap-8 mt-10">
                        {profile.links.linkedin && (
                            <a
                                href={profile.links.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1.5 text-[#6B7280] hover:text-[#38BDF8] transition-colors group"
                            >
                                <div className="p-2.5 rounded-full border border-gray-800 bg-[#0a0a0a] group-hover:border-[#38BDF8]/30 transition-colors">
                                    <Linkedin size={18} />
                                </div>
                                <span className="text-[10px] font-medium tracking-wide uppercase">LinkedIn</span>
                            </a>
                        )}
                        {profile.links.github && (
                            <a
                                href={profile.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex flex-col items-center gap-1.5 text-[#6B7280] hover:text-[#38BDF8] transition-colors group"
                            >
                                <div className="p-2.5 rounded-full border border-gray-800 bg-[#0a0a0a] group-hover:border-[#38BDF8]/30 transition-colors">
                                    <Github size={18} />
                                </div>
                                <span className="text-[10px] font-medium tracking-wide uppercase">GitHub</span>
                            </a>
                        )}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                navigator.clipboard.writeText(profile.email);
                                setShowToast(true);
                                setTimeout(() => setShowToast(false), 2000);
                            }}
                            className="flex flex-col items-center gap-1.5 text-[#6B7280] hover:text-[#38BDF8] transition-colors group cursor-pointer bg-transparent border-0 p-0"
                            title="Copy email to clipboard"
                        >
                            <div className="p-2.5 rounded-full border border-gray-800 bg-[#0a0a0a] group-hover:border-[#38BDF8]/30 transition-colors">
                                <Mail size={18} />
                            </div>
                            <span className="text-[10px] font-medium tracking-wide uppercase">Email</span>
                        </button>
                    </div>

                    {/* Toast Notification */}
                    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#1F2937] text-white px-4 py-2 rounded-lg shadow-lg border border-gray-700 text-xs font-medium transition-all duration-300 pointer-events-none z-50 flex items-center gap-2 ${showToast ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
                        <div className="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></div>
                        Email copied to clipboard
                    </div>
                </section>
            </main>



            {/* 9. FOOTER */}
            <footer className={`py-6 border-t ${colors.border} text-center ${colors.textSecondary} text-xs`}>
                <p>© {new Date().getFullYear()} {name}. Built for impact.</p>
            </footer>
        </div>
    );
}
