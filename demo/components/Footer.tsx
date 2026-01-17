import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-100 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} Alex Dev. All rights reserved.
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">Twitter</a>
          <a href="https://www.linkedin.com/in/snehaagarwal-sa2311/" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">LinkedIn</a>
          <a href="#" className="text-slate-500 hover:text-slate-900 text-sm transition-colors">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;