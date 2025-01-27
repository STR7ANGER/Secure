import React from 'react';
import {
  Shield,
  ChevronRight,
  Mail,
  Phone,
  MapPin,
  Globe,
  Github,
  Linkedin,
  Twitter
} from 'lucide-react';

const SocialLinks = () => (
  <div className="flex items-center space-x-4">
    {[
      { Icon: Github, href: '#github' },
      { Icon: Linkedin, href: '#linkedin' },
      { Icon: Twitter, href: '#twitter' }
    ].map(({ Icon, href }) => (
      <a
        key={href}
        href={href}
        className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 p-2 rounded-full hover:bg-slate-800"
      >
        <Icon className="w-5 h-5" />
      </a>
    ))}
  </div>
);

const FooterLink = ({ children, href = '#', icon: Icon }) => (
  <a
    href={href}
    className="flex items-center group hover:text-cyan-400 transition-colors duration-200 py-1"
  >
    {Icon && (
      <Icon className="mr-2 w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors duration-200" />
    )}
    <span className="text-slate-400 group-hover:translate-x-1 transition-transform duration-200">
      {children}
    </span>
  </a>
);

const FooterSection = ({ title, children }) => (
  <div className="space-y-4">
    <h5 className="text-slate-100 font-semibold text-sm uppercase tracking-wider pb-2 border-b border-slate-800">
      {title}
    </h5>
    <div className="space-y-2">{children}</div>
  </div>
);

const BrandSection = () => (
  <div className="space-y-6">
    <div className="flex items-center space-x-2">
      <Shield className="text-cyan-400 w-10 h-10" />
      <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
        SecureSight
      </span>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed">
      Protecting your digital assets with next-generation security solutions and
      continuous monitoring.
    </p>
  </div>
);

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="space-y-12">
            <BrandSection />

            <FooterSection title="Social">
              <SocialLinks />
            </FooterSection>

            <FooterSection title="Contact">
              <FooterLink icon={Mail}>contact@securesight.com</FooterLink>
              <FooterLink icon={Phone}>+1 (555) 123-4567</FooterLink>
              <FooterLink icon={MapPin}>
                123 Security Ave, Cyberspace
              </FooterLink>
              <FooterLink icon={Globe}>www.securesight.com</FooterLink>
            </FooterSection>
          </div>

          {/* Right Column */}
          <div className="space-y-12">
            <FooterSection title="Support">
              <FooterLink icon={ChevronRight}>Help Center</FooterLink>
              <FooterLink icon={ChevronRight}>Documentation</FooterLink>
              <FooterLink icon={ChevronRight}>API Reference</FooterLink>
              <FooterLink icon={ChevronRight}>Status</FooterLink>
            </FooterSection>

            <FooterSection title="Company">
              <FooterLink icon={ChevronRight}>About Us</FooterLink>
              <FooterLink icon={ChevronRight}>Services</FooterLink>
              <FooterLink icon={ChevronRight}>Careers</FooterLink>
              <FooterLink icon={ChevronRight}>Blog</FooterLink>
            </FooterSection>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {year} SecureSight. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm text-slate-400">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(
                (text) => (
                  <a
                    key={text}
                    href="#"
                    className="hover:text-cyan-400 transition-colors duration-200"
                  >
                    {text}
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
