import React from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC<{ profile?: any }> = ({ profile }) => {
    const email = profile?.email || profile?.contact?.email || "hello@example.com";

    return (
        <section id="contact" className="py-24 bg-slate-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">Get In Touch</h2>
                    <div className="w-16 h-1 bg-slate-300 mx-auto mb-6"></div>
                    <p className="text-slate-600">
                        Currently available for freelance projects and open to full-time opportunities.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-slate-100">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">Let's Talk</h3>
                        <p className="text-slate-600 mb-8 leading-relaxed">
                            Have a project in mind or just want to discuss the latest tech trends? Feel free to send me a message.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Email</h4>
                                    <p className="text-slate-500 text-sm">{email}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-slate-900">Location</h4>
                                    <p className="text-slate-500 text-sm">Available Remote</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 opacity-75 pointer-events-none grayscale-[50%]">
                        {/* Static Form Representation */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                            <input disabled type="text" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200" placeholder="John Doe" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                            <input disabled type="email" className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                            <textarea disabled rows={4} className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 resize-none" placeholder="Your message..."></textarea>
                        </div>
                        <button disabled className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium bg-slate-900 text-white">
                            Send Message <Send className="w-4 h-4" />
                        </button>
                        <p className="text-xs text-center text-slate-400 italic">Contact form disabled in Quick View mode.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
