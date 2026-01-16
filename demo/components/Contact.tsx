import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    // Simulate API call
    setTimeout(() => {
        console.log("Form Submitted", formData);
        setStatus("success");
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus("idle"), 3000);
    }, 1000);
  };

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
                  <p className="text-slate-500 text-sm">hello@alex.dev</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-slate-100 rounded-lg text-slate-700">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">Location</h4>
                  <p className="text-slate-500 text-sm">San Francisco, CA</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-0 transition-all outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-0 transition-all outline-none"
                placeholder="john@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-slate-400 focus:bg-white focus:ring-0 transition-all outline-none resize-none"
                placeholder="Your message..."
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === "submitting" || status === "success"}
              className={`w-full flex items-center justify-center gap-2 py-3 px-6 rounded-lg font-medium transition-all ${
                status === "success" 
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-slate-900 text-white hover:bg-slate-800"
              } disabled:opacity-70 disabled:cursor-not-allowed`}
            >
              {status === "submitting" ? (
                "Sending..."
              ) : status === "success" ? (
                "Message Sent!"
              ) : (
                <>
                  Send Message <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;