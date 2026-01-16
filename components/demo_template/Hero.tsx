import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC<{ profile?: any }> = ({ profile }) => {
    const name = profile?.name || "Jane Developer";
    const role = profile?.role || "Full Stack Engineer";
    const summary = profile?.summary || profile?.bio || "Building digital solutions.";
    const links = profile?.links || {};
    const email = profile?.email || "";

    // Extract first name for intro
    const firstName = name.split(' ')[0];
    // Initials
    const initials = name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase();

    return (
        <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden bg-white text-slate-900">
            {/* Background Decorative Elements */}
            <div className="absolute top-20 right-[-10%] w-72 h-72 bg-slate-200/50 rounded-full blur-3xl -z-10"></div>
            <div className="absolute bottom-20 left-[-5%] w-96 h-96 bg-gray-200/50 rounded-full blur-3xl -z-10"></div>

            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">

                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase bg-slate-100 rounded-full">
                        {role}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
                        Building elegant <br />
                        <span className="text-slate-500">digital solutions.</span>
                    </h1>
                    <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0 whitespace-pre-wrap">
                        Hi, I'm {firstName}. {summary}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-4 mb-12">
                        <a href="#projects" className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
                            View Work
                        </a>
                        <a href="#contact" className="px-6 py-3 bg-white text-slate-900 border border-slate-200 font-medium rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
                            Contact Me
                        </a>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-6 text-slate-500 relative z-50 pointer-events-auto">
                        {links.github && (
                            <a href={links.github.startsWith('http') ? links.github : `https://${links.github}`} target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition-colors transform hover:scale-110 duration-200 cursor-pointer" title="GitHub">
                                <Github className="w-6 h-6" />
                            </a>
                        )}
                        {links.linkedin && (
                            <a href={links.linkedin.startsWith('http') ? links.linkedin : `https://${links.linkedin}`} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition-colors transform hover:scale-110 duration-200 cursor-pointer" title="LinkedIn">
                                <Linkedin className="w-6 h-6" />
                            </a>
                        )}
                        {email && (
                            <a href={`mailto:${email}`} className="hover:text-red-500 transition-colors transform hover:scale-110 duration-200 cursor-pointer" title="Email">
                                <Mail className="w-6 h-6" />
                            </a>
                        )}
                        {links.resume && (
                            <a href={`/${links.resume}`} target="_blank" rel="noopener noreferrer" className="hover:text-amber-600 transition-colors transform hover:scale-110 duration-200 cursor-pointer" title="Resume">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><line x1="16" x2="8" y1="13" y2="13" /><line x1="16" x2="8" y1="17" y2="17" /><line x1="10" x2="8" y1="9" y2="9" /></svg>
                            </a>
                        )}
                    </div>
                </div>

                {/* Image/Avatar */}
                <div className="flex-1 relative">
                    <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                        <div className="absolute inset-0 bg-slate-200 rounded-full rotate-6 transform transition-transform duration-500 hover:rotate-12"></div>
                        {profile?.avatar ? (
                            <img
                                src={profile.avatar.startsWith('http') || profile.avatar.startsWith('/') ? profile.avatar : `/${profile.avatar}`}
                                alt={name}
                                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
                            />
                        ) : (
                            <div className="absolute inset-0 w-full h-full bg-slate-300 rounded-full border-4 border-white shadow-xl flex items-center justify-center text-6xl font-bold text-slate-500">
                                {initials}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
