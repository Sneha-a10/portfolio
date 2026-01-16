import React from 'react';

const Footer: React.FC<{ profile?: any }> = ({ profile }) => {
    const name = profile?.name || "Jane Dev";
    const links = profile?.links || {};
    const email = profile?.email || profile?.contact?.email;

    return (
        <footer className="bg-white border-t border-slate-100 py-12">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-slate-500 text-sm">
                    &copy; {new Date().getFullYear()} {name}. All rights reserved.
                </div>
                <div className="flex gap-8">
                    {links.github && (
                        <a href={links.github.startsWith('http') ? links.github : `https://${links.github}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 text-sm transition-colors cursor-pointer">
                            GitHub
                        </a>
                    )}
                    {links.linkedin && (
                        <a href={links.linkedin.startsWith('http') ? links.linkedin : `https://${links.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-900 text-sm transition-colors cursor-pointer">
                            LinkedIn
                        </a>
                    )}
                    {email && (
                        <a href={`mailto:${email}`} className="text-slate-500 hover:text-slate-900 text-sm transition-colors cursor-pointer">
                            Email
                        </a>
                    )}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
