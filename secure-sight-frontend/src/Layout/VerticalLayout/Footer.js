import React from 'react';
import { ChevronRight, Shield } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#0E0F1B] py-10 border-t border-opacity-10 border-cyan-500">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex items-center space-x-2 mb-4">
            <Shield className="text-cyan-400 w-8 h-8" />
            <span className="text-2xl font-bold text-cyan-400">
              SecureSight
            </span>
          </div>

          <div className="space-y-6">
            <div>
              <h5 className="text-slate-100 font-semibold text-sm uppercase tracking-wider mb-2">
                Company:
              </h5>
              <div className="space-y-1 px-2">
                <div className="flex items-center">
                  <span className="text-teal-500">About</span>
                  <ChevronRight className="ml-1 w-4 h-4 text-slate-600" />
                </div>
                <div className="flex items-center">
                  <span className="text-teal-500">Services</span>
                  <ChevronRight className="ml-1 w-4 h-4 text-slate-600" />
                </div>
                <div className="flex items-center">
                  <span className="text-teal-500">Contact</span>
                  <ChevronRight className="ml-1 w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>

            <div>
              <h5 className="text-slate-100 font-semibold text-xs uppercase tracking-wider mb-2">
                Support:
              </h5>
              <div className="space-y-1 px-2">
                <div className="flex items-center">
                  <span className="text-slate-400">Help Center</span>
                  <ChevronRight className="ml-1 w-4 h-4 text-slate-600" />
                </div>
                <div className="flex items-center">
                  <span className="text-slate-400">Documentation</span>
                  <ChevronRight className="ml-1 w-4 h-4 text-slate-600" />
                </div>
                <div className="flex items-center">
                  <span className="text-slate-400">Status</span>
                  <ChevronRight className="ml-1 w-4 h-4 text-slate-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 text-slate-400 text-sm">
          © {new Date().getFullYear()} All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
