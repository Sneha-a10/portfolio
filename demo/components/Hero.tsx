import React from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-20 right-[-10%] w-72 h-72 bg-slate-200/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-[-5%] w-96 h-96 bg-gray-200/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-12 md:gap-20">

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase bg-slate-100 rounded-full">
            Computer Science Engineer
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6 leading-tight">
            Building elegant <br />
            <span className="text-slate-500">digital solutions.</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
            Hi, I'm Alex. I specialize in full-stack development, algorithms, and creating seamless user experiences with modern technologies.
          </p>

          <div className="flex items-center justify-center md:justify-start gap-4 mb-12">
            <a href="#projects" className="px-6 py-3 bg-slate-900 text-white font-medium rounded-lg hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
              View Work
            </a>
            <a href="#contact" className="px-6 py-3 bg-white text-slate-900 border border-slate-200 font-medium rounded-lg hover:bg-slate-50 hover:border-slate-300 transition-all">
              Contact Me
            </a>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-6 text-slate-500">
            <a href="#" className="hover:text-slate-900 transition-colors transform hover:scale-110 duration-200">
              <Github className="w-6 h-6" />
            </a>
            <a href="https://www.linkedin.com/in/snehaagarwal-sa2311/" className="hover:text-blue-700 transition-colors transform hover:scale-110 duration-200">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href="mailto:hello@example.com" className="hover:text-red-500 transition-colors transform hover:scale-110 duration-200">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Image/Avatar */}
        <div className="flex-1 relative">
          <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
            <div className="absolute inset-0 bg-slate-200 rounded-full rotate-6 transform transition-transform duration-500 hover:rotate-12"></div>
            <img
              src="https://picsum.photos/400/400?grayscale"
              alt="Alex Dev"
              className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white shadow-xl"
            />
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-400 hover:text-slate-600">
        <ArrowDown className="w-6 h-6" />
      </a>
    </section>
  );
};

export default Hero;