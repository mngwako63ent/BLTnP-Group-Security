/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  Users, 
  Cctv, 
  Zap, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight,
  MessageCircle,
  Award,
  FileText,
  AlertTriangle,
  HardHat,
  Monitor,
  Car,
  UserCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type Page = 'home' | 'about' | 'solutions' | 'academy' | 'compliance' | 'contact';

// --- Components ---

const Header = ({ currentPage, setCurrentPage }: { currentPage: Page, setCurrentPage: (p: Page) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const isHomePage = currentPage === 'home';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setMousePos({ x: clientX - rect.left, y: clientY - rect.top });
    }
  };

  const navItems: { label: string; value: Page }[] = [
    { label: 'Home', value: 'home' },
    { label: 'About Us', value: 'about' },
    { label: 'Solutions', value: 'solutions' },
    { label: 'BLTnP Academy', value: 'academy' },
    { label: 'Compliance', value: 'compliance' },
    { label: 'Contact', value: 'contact' },
  ];

  const renderHeaderContent = (isIlluminated: boolean) => {
    const isDimmed = !isHomePage && !isIlluminated;
    
    return (
      <div className={`${isDimmed ? 'opacity-30 grayscale-[0.5]' : 'opacity-100'} transition-all duration-300`}>
        {/* Top Bar */}
        <div className="bg-brand-orange text-white py-1.5 px-4 md:px-8 flex flex-col sm:flex-row justify-between items-center text-[10px] md:text-sm font-medium gap-1 sm:gap-4">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="flex items-center gap-1"><ShieldCheck size={12} className="md:w-3.5 md:h-3.5" /> PSIRA Reg: 2955966</span>
            <span className="flex items-center gap-1"><Clock size={12} className="md:w-3.5 md:h-3.5" /> 24/7 Control Room</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0100850893" className="flex items-center gap-1 hover:underline"><Phone size={12} className="md:w-3.5 md:h-3.5" /> 010 085 0893</a>
          </div>
        </div>

        {/* Main Nav */}
        <nav className="px-4 md:px-8 py-3 md:py-4 flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => !isIlluminated && setCurrentPage('home')}>
            <img 
              src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1773308669/546899596_3221282344690807_2306510055138432128_n_sa86pn.png" 
              alt="BLTnP Logo" 
              className="h-10 md:h-16 object-contain brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col whitespace-nowrap">
              <span className="text-white font-bold text-base md:text-xl leading-none">BLTnP</span>
              <span className="text-brand-orange text-[7px] md:text-[10px] font-bold tracking-wider md:tracking-widest uppercase">Group Security</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => !isIlluminated && setCurrentPage(item.value)}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors hover:text-brand-orange ${
                  currentPage === item.value ? 'text-brand-orange' : 'text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
            <button 
              onClick={() => !isIlluminated && setCurrentPage('contact')}
              className="bg-brand-orange text-white px-6 py-2.5 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-lg"
            >
              Request a Quote
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button className="lg:hidden text-white" onClick={() => !isIlluminated && setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </nav>
      </div>
    );
  };

  const renderMobileMenuContent = (isIlluminated: boolean) => {
    const isDimmed = !isIlluminated;
    return (
      <div className={`flex flex-col gap-6 ${isDimmed ? 'opacity-30 grayscale-[0.5]' : 'opacity-100'} transition-all duration-300`}>
        {navItems.map((item) => (
          <button
            key={item.value}
            onClick={() => {
              if (!isIlluminated) {
                setCurrentPage(item.value);
                setIsMenuOpen(false);
              }
            }}
            className={`text-lg font-bold uppercase tracking-widest text-left ${
              currentPage === item.value ? 'text-brand-orange' : 'text-white'
            }`}
          >
            {item.label}
          </button>
        ))}
        <button 
          onClick={() => {
            if (!isIlluminated) {
              setCurrentPage('contact');
              setIsMenuOpen(false);
            }
          }}
          className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-center"
        >
          Request a Quote
        </button>
      </div>
    );
  };

  return (
    <header 
      ref={headerRef}
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
      onTouchStart={handleMouseMove}
      onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isHomePage 
          ? (isScrolled ? 'bg-brand-navy shadow-lg' : 'bg-transparent')
          : 'bg-[#0a0a0a]/95 shadow-2xl border-b border-white/5'
      }`}
    >
      {/* Flashlight Glow Background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(242, 125, 38, 0.15), transparent 80%)`,
        }}
      />

      <div className="relative">
        {/* Base Layer (Dimmed) */}
        {renderHeaderContent(false)}
        
        {/* Illuminated Layer (Masked) */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
            WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
          }}
        >
          <div className="drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
            {renderHeaderContent(true)}
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-t border-white/10 p-8 lg:hidden shadow-2xl overflow-hidden"
          >
            {/* Flashlight Glow for Mobile Menu */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle 250px at ${mousePos.x}px ${mousePos.y}px, rgba(242, 125, 38, 0.15), transparent 80%)`,
              }}
            />

            <div className="relative">
              {/* Base Layer */}
              {renderMobileMenuContent(false)}

              {/* Illuminated Layer */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  maskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                  WebkitMaskImage: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, black 30%, transparent 100%)`,
                }}
              >
                <div className="drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
                  {renderMobileMenuContent(true)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Footer = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10 px-4 md:px-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <img 
              src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1773308669/546899596_3221282344690807_2306510055138432128_n_sa86pn.png" 
              alt="BLTnP Logo" 
              className="h-16 brightness-0 invert"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-2xl leading-none">BLTnP</span>
              <span className="text-brand-orange text-xs font-bold tracking-widest uppercase">Group Security</span>
            </div>
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Premier Integrated Security Solutions for Corporate, Government, and Residential sectors across South Africa.
          </p>
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors cursor-pointer">
              <Shield size={20} />
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brand-orange transition-colors cursor-pointer">
              <Users size={20} />
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-brand-orange font-bold uppercase tracking-widest mb-6">Quick Links</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li><button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Home</button></li>
            <li><button onClick={() => setCurrentPage('about')} className="hover:text-white transition-colors">About Us</button></li>
            <li><button onClick={() => setCurrentPage('solutions')} className="hover:text-white transition-colors">Solutions</button></li>
            <li><button onClick={() => setCurrentPage('academy')} className="hover:text-white transition-colors">BLTnP Academy</button></li>
            <li><button onClick={() => setCurrentPage('compliance')} className="hover:text-white transition-colors">Compliance</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-orange font-bold uppercase tracking-widest mb-6">Contact Info</h4>
          <ul className="space-y-4 text-slate-400 text-sm">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-brand-orange shrink-0" />
              <span>Unit 14, 6490 Tshotlhe Crescent, Mmabatho, 2735</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-brand-orange shrink-0" />
              <span>010 085 0893</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-brand-orange shrink-0" />
              <span>operations@bltnpgroupsecurity.co.za</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-brand-orange font-bold uppercase tracking-widest mb-6">Accreditation</h4>
          <div className="space-y-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">PSIRA Registration</span>
              <span className="text-lg font-bold">2955966</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/10">
              <span className="block text-xs uppercase tracking-widest text-slate-500 mb-1">Academy Reg</span>
              <span className="text-lg font-bold">2955956</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 uppercase tracking-widest">
        <p>© 2026 BLTnP Group Security. All Rights Reserved.</p>
        <p>Professional. Reliable. Accountable.</p>
      </div>
    </footer>
  );
};

// --- Page Sections ---

const HomePage = ({ setCurrentPage }: { setCurrentPage: (p: Page) => void }) => {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=2000" 
            alt="Security Background" 
            className="w-full h-full object-cover brightness-50"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 to-transparent" />
          
          {/* Animated Searchlight */}
          <motion.div 
            animate={{ 
              left: ['-20%', '100%', '-20%'],
              top: ['10%', '60%', '10%'],
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute w-[800px] h-[800px] rounded-full pointer-events-none opacity-40"
            style={{
              background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
              filter: 'blur(80px)',
            }}
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full flex justify-center pt-16 md:pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl space-y-6 md:space-y-8 text-center flex flex-col items-center"
          >
            <h1 className="text-4xl md:text-7xl font-black text-white leading-tight">
              Professional. <span className="text-brand-orange">Reliable.</span> Accountable.
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
              Premier Integrated Security Solutions for Corporate, Government, and Residential sectors across South Africa.
            </p>
            <div className="inline-flex items-center gap-2 bg-brand-orange/20 border border-brand-orange/30 px-4 py-2 rounded-full text-brand-orange font-bold text-[10px] md:text-xs uppercase tracking-widest">
              <Shield size={14} className="md:w-4 md:h-4" /> PSIRA Accredited Security
            </div>
            <div className="flex flex-wrap justify-center gap-4 pt-2 md:pt-4">
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-brand-orange text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all flex items-center gap-2 shadow-2xl"
              >
                Request a Quote <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => setCurrentPage('solutions')}
                className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white/20 transition-all"
              >
                View Our Solutions
              </button>
            </div>
          </motion.div>
        </div>

        {/* Searchlight effect replaces scroll indicator */}
      </section>

      {/* Trust Stats */}
      <section className="bg-brand-navy py-16 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Security Officers', value: '68+', icon: <Users className="text-brand-orange" /> },
            { label: 'Control Room', value: '24/7', icon: <Monitor className="text-brand-orange" /> },
            { label: 'Response Fleet', value: 'Rapid', icon: <Car className="text-brand-orange" /> },
            { label: 'Accredited', value: 'PSIRA', icon: <Award className="text-brand-orange" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center space-y-2"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-black text-white">{stat.value}</div>
              <div className="text-xs uppercase tracking-widest text-slate-400 font-bold">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-24 px-4 md:px-8 bg-slate-50">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm">Our Expertise</h2>
            <h3 className="text-4xl md:text-5xl font-black text-brand-navy">Integrated Security Solutions</h3>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Tailored security strategies combining elite personnel with advanced technology to protect your most valuable assets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                title: 'Physical Guarding', 
                icon: <Shield size={32} />, 
                desc: 'Corporate, Government, and Estate guarding with strict access control.',
                items: ['Corporate Guarding', 'Government Facilities', 'Estate Security', 'Event Security']
              },
              { 
                title: 'Tactical & Response', 
                icon: <Zap size={32} />, 
                desc: 'High-intensity armed response and elite VIP protection services.',
                items: ['Armed Response', 'Mobile Patrols', 'VIP Protection', 'Escort Services']
              },
              { 
                title: 'Electronic Security', 
                icon: <Cctv size={32} />, 
                desc: 'State-of-the-art surveillance and automated access management.',
                items: ['CCTV Installation', 'Alarm Monitoring', 'Electric Fencing', 'Turnstiles']
              },
              { 
                title: 'Risk Management', 
                icon: <AlertTriangle size={32} />, 
                desc: 'Comprehensive assessments to identify and mitigate potential threats.',
                items: ['Risk Assessments', 'Site Inspections', 'Incident Reporting', 'Access Management']
              },
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 space-y-6 group"
              >
                <div className="w-16 h-16 bg-brand-navy text-white rounded-2xl flex items-center justify-center group-hover:bg-brand-orange transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-brand-navy">{service.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{service.desc}</p>
                <ul className="space-y-2">
                  {service.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
                      <CheckCircle2 size={14} className="text-brand-orange" /> {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <button 
              onClick={() => setCurrentPage('solutions')}
              className="inline-flex items-center gap-2 text-brand-navy font-black uppercase tracking-widest hover:text-brand-orange transition-colors group"
            >
              Explore All Solutions <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Academy CTA Section */}
      <section className="bg-brand-navy py-24 px-4 md:px-8 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-brand-orange/5 rounded-accent-reverse" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm">Training Excellence</h2>
            <h3 className="text-4xl md:text-5xl font-black text-white leading-tight">
              BLTnP Security Academy
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed">
              Train. Register. Secure Your Future. Join South Africa's premier PSIRA-accredited training facility.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'Accredited Training',
                'Experienced Instructors',
                'Hands-On Practical Skills',
                'Career Guidance'
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-white font-bold uppercase tracking-widest text-xs">
                  <div className="w-6 h-6 rounded-full bg-brand-orange flex items-center justify-center">
                    <CheckCircle2 size={14} />
                  </div>
                  {item}
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.open('https://wa.me/27698102992', '_blank')}
              className="bg-brand-orange text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-brand-orange transition-all shadow-2xl"
            >
              Enroll Today
            </button>
          </div>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-brand-orange/20 rounded-3xl blur-2xl group-hover:bg-brand-orange/30 transition-colors" />
            <img 
              src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1773318630/Capture_1_ro2a9w.png" 
              alt="Security Academy Drills" 
              className="relative rounded-3xl shadow-2xl border-4 border-white/10 w-full object-cover aspect-video lg:aspect-auto transition-all duration-500 group-hover:border-brand-orange/50"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-brand-navy/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <p className="text-white font-bold uppercase tracking-widest text-xs">Elite Security Personnel</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const AboutPage = () => {
  return (
    <div className="pt-32 pb-24 px-4 md:px-8 space-y-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm">Executive Overview</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-navy leading-tight">
            Safeguarding People, Property, and Critical Assets.
          </h3>
          <p className="text-slate-600 text-lg leading-relaxed">
            BLTnP Group Security is a fully registered and PSIRA-accredited security services provider delivering integrated, professional, and reliable security solutions across South Africa. 
          </p>
          <p className="text-slate-600 leading-relaxed">
            With an operational footprint spanning corporate, government, and residential environments, we combine skilled personnel, robust operational systems, and technology-driven oversight to ensure unmatched safety.
          </p>
          <div className="grid grid-cols-2 gap-8 pt-4">
            <div className="space-y-2">
              <span className="text-4xl font-black text-brand-orange">68+</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Trained Officers</p>
            </div>
            <div className="space-y-2">
              <span className="text-4xl font-black text-brand-orange">24/7</span>
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Monitoring</p>
            </div>
          </div>
        </div>
        <div className="bg-brand-navy p-12 rounded-3xl text-white space-y-12 rounded-accent">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center">
                <Shield size={24} />
              </div>
              <h4 className="text-2xl font-bold">Our Vision</h4>
            </div>
            <p className="text-slate-300 leading-relaxed">
              To be a trusted, nationally recognised security services provider known for professionalism, reliability, and operational excellence.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-brand-orange flex items-center justify-center">
                <Users size={24} />
              </div>
              <h4 className="text-2xl font-bold">Our Mission</h4>
            </div>
            <p className="text-slate-300 leading-relaxed">
              To deliver disciplined, compliant, and technology-enabled security solutions that protect lives, assets, and infrastructure while building long-term value for our clients.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto bg-slate-50 p-12 rounded-3xl border border-slate-200">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-3xl font-black text-brand-navy">Operational Capacity</h3>
          <p className="text-slate-500">Equipped to handle large-scale security requirements.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Elite Personnel', desc: '300+ trained security officers ready for deployment.', icon: <Users /> },
            { title: 'Control Room', desc: '24/7 monitoring and dispatch for immediate response.', icon: <Monitor /> },
            { title: 'Response Fleet', desc: 'Rapid response vehicles and operations management.', icon: <Car /> },
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center space-y-4">
              <div className="w-12 h-12 bg-brand-orange/10 text-brand-orange rounded-xl flex items-center justify-center mx-auto">
                {item.icon}
              </div>
              <h4 className="font-bold text-brand-navy">{item.title}</h4>
              <p className="text-sm text-slate-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SolutionsPage = () => {
  const solutions = [
    {
      title: 'Physical Guarding',
      icon: <ShieldCheck size={40} />,
      items: [
        { name: 'Corporate Guarding', desc: 'Professional security for office parks and corporate headquarters.' },
        { name: 'Government Facility Security', desc: 'Strict compliance and high-level protection for public assets.' },
        { name: 'Estate Security', desc: 'Residential community safety and perimeter management.' },
        { name: 'Access Control', desc: 'Advanced visitor management and biometric systems.' },
        { name: 'Event Security', desc: 'Crowd control and safety for large-scale public and private events.' }
      ]
    },
    {
      title: 'Tactical & Response',
      icon: <Zap size={40} />,
      items: [
        { name: 'Armed Response', desc: 'Rapid deployment of tactical units for emergency situations.' },
        { name: 'Mobile Patrols', desc: 'Visible deterrent patrols for commercial and residential areas.' },
        { name: 'VIP Protection', desc: 'Close protection services for high-profile individuals.' },
        { name: 'Escort Services', desc: 'Secure transit for high-value assets and personnel.' }
      ]
    },
    {
      title: 'Electronic Security',
      icon: <Cctv size={40} />,
      items: [
        { name: 'CCTV Installation', desc: 'High-definition surveillance with remote viewing capabilities.' },
        { name: 'Alarm Monitoring', desc: '24/7 monitoring with immediate tactical dispatch.' },
        { name: 'Electric Fencing', desc: 'Perimeter protection with intelligent intrusion detection.' },
        { name: 'Motorized Gates', desc: 'Secure automated entry systems for all property types.' },
        { name: 'Turnstile Access Control', desc: 'High-volume pedestrian entry management.' }
      ]
    },
    {
      title: 'Risk Management',
      icon: <FileText size={40} />,
      items: [
        { name: 'Risk Assessments', desc: 'In-depth analysis of site vulnerabilities and threats.' },
        { name: 'Site Inspections', desc: 'Regular audits to ensure security protocols are maintained.' },
        { name: 'Incident Reporting', desc: 'Detailed digital logging and analysis of all security events.' },
        { name: 'Access Management', desc: 'Strategic planning of personnel and vehicle flow.' }
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest text-sm">Our Solutions</h2>
          <h3 className="text-4xl md:text-5xl font-black text-brand-navy">Comprehensive Security Services</h3>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We provide a full spectrum of security services designed to meet the rigorous demands of corporate and government sectors.
          </p>
        </div>

        <div className="space-y-16">
          {solutions.map((section, i) => (
            <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
              <div className="bg-brand-navy p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-brand-orange rounded-2xl flex items-center justify-center shrink-0">
                  {section.icon}
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-3xl font-black mb-2">{section.title}</h4>
                  <p className="text-slate-400">Specialized security protocols and elite personnel.</p>
                </div>
              </div>
              <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {section.items.map((item, j) => (
                  <div key={j} className="space-y-3 group">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-orange" />
                      <h5 className="font-bold text-brand-navy uppercase tracking-wider text-sm">{item.name}</h5>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed pl-5">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AcademyPage = () => {
  const courses = [
    { name: 'Grades E, D, C', duration: '3 Weeks', fee: 'R2 300' },
    { name: 'Grades B', duration: '1 Week', fee: 'R1 200' },
    { name: 'Grades A', duration: '1 Week', fee: 'R1 500' },
  ];

  const benefits = [
    'Accredited Training',
    'Experienced Instructors',
    'Hands-On Practical Skills',
    'Career Guidance',
    'Same-Day PSIRA Services',
    'Flexible Learning Options',
    'Affordable Packages',
    'Networking Opportunities',
    'Trusted Reputation'
  ];

  return (
    <div className="pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        {/* Academy Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-brand-orange/10 border border-brand-orange/20 px-4 py-2 rounded-full text-brand-orange font-bold text-xs uppercase tracking-widest">
              PSIRA Reg: 2955956
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-brand-navy leading-tight">
              BLTnP Security <span className="text-brand-orange">Academy</span>
            </h2>
            <p className="text-2xl font-bold text-slate-600">Train. Register. Secure Your Future.</p>
            <p className="text-slate-500 leading-relaxed">
              Trusted by hundreds of trained professionals across South Africa. Our accredited partners and qualified instructors ensure safe, professional, and hands-on learning.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.open('https://wa.me/27698102992', '_blank')}
                className="bg-brand-orange text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-brand-navy transition-all shadow-xl"
              >
                Enroll Today
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute top-0 right-0 w-full h-full bg-brand-navy rounded-accent -z-10 translate-x-4 translate-y-4" />
            <img 
              src="https://res.cloudinary.com/dm7sxhaeb/image/upload/v1773318630/Capture_1_ro2a9w.png" 
              alt="Security Academy Training" 
              className="rounded-3xl shadow-2xl w-full object-cover aspect-video lg:aspect-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Courses Table */}
        <div className="bg-brand-navy rounded-3xl p-8 md:p-16 text-white space-y-12">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-black">Accredited Courses</h3>
            <p className="text-slate-400">Professional training at affordable rates.</p>
          </div>
          
          <div className="overflow-x-auto -mx-4 md:mx-0">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-white/10 text-brand-orange uppercase tracking-widest text-[10px] md:text-xs font-black">
                  <th className="py-4 md:py-6 px-4">Course Name</th>
                  <th className="py-4 md:py-6 px-4">Duration</th>
                  <th className="py-4 md:py-6 px-4">Fee</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="py-4 md:py-6 px-4 font-bold text-base md:text-lg">{course.name}</td>
                    <td className="py-4 md:py-6 px-4 text-slate-300 text-sm md:text-base">{course.duration}</td>
                    <td className="py-4 md:py-6 px-4 font-black text-brand-orange text-lg md:text-xl">{course.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-brand-orange/20 border border-brand-orange/30 p-6 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-brand-orange flex items-center justify-center">
                <ShieldCheck size={24} />
              </div>
              <div>
                <span className="block text-xs uppercase tracking-widest font-bold text-brand-orange">Registration Fee</span>
                <span className="text-xl font-black">R500 (Once-off)</span>
              </div>
            </div>
            <p className="text-sm text-slate-300 italic">Valid for all courses enrolled at BLTnP Academy.</p>
          </div>
        </div>

        {/* Why Join */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-12">
            <h3 className="text-4xl font-black text-brand-navy">Why Join BLTnP Academy?</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-lg bg-brand-orange/10 text-brand-orange flex items-center justify-center group-hover:bg-brand-orange group-hover:text-white transition-all">
                    <CheckCircle2 size={18} />
                  </div>
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-slate-50 p-12 rounded-3xl border border-slate-200 space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-navy flex items-center justify-center text-white">
                <Phone size={32} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-brand-navy">Academy Support</h4>
                <p className="text-slate-500">Direct line for enrollment queries.</p>
              </div>
            </div>
            <div className="space-y-4">
              <a href="https://wa.me/27698102992" className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-orange transition-colors group">
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-green-500" />
                  <span className="font-bold text-brand-navy">WhatsApp Support</span>
                </div>
                <span className="text-slate-400 group-hover:text-brand-orange">069 810 2992</span>
              </a>
              <a href="mailto:info@bltnpacademy.co.za" className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200 hover:border-brand-orange transition-colors group">
                <div className="flex items-center gap-3">
                  <Mail className="text-brand-orange" />
                  <span className="font-bold text-brand-navy">Email Us</span>
                </div>
                <span className="text-slate-400 group-hover:text-brand-orange">info@bltnpacademy.co.za</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompliancePage = () => {
  const complianceItems = [
    'PSIRA Registered',
    'CIPC Registered',
    'SARS Tax Compliant',
    'UIF Compliant',
    'COIDA Registered',
    'Firearm Compliance'
  ];

  return (
    <div className="pt-32 pb-24 px-4 md:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm">Legal & Standards</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-navy">Compliance & Accreditation</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            We operate with full transparency and adhere to the highest regulatory standards in the South African security industry.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-12 rounded-3xl shadow-xl border border-slate-100 space-y-12">
            <h4 className="text-2xl font-black text-brand-navy flex items-center gap-3">
              <ShieldCheck className="text-brand-orange" /> Regulatory Compliance
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {complianceItems.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="w-10 h-10 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="font-bold text-brand-navy uppercase tracking-widest text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-brand-navy p-12 rounded-3xl text-white space-y-8">
            <h4 className="text-2xl font-bold">Our Policies</h4>
            <ul className="space-y-6">
              {[
                { title: 'Health & Safety', desc: 'Strict adherence to OHS protocols on all sites.' },
                { title: 'Emergency Response', desc: 'Standardized protocols for rapid incident management.' },
                { title: 'Risk Assessments', desc: 'Mandatory site audits before deployment.' },
              ].map((policy, i) => (
                <li key={i} className="space-y-2">
                  <span className="text-brand-orange font-bold uppercase tracking-widest text-xs">{policy.title}</span>
                  <p className="text-sm text-slate-400 leading-relaxed">{policy.desc}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white p-12 rounded-3xl border-2 border-dashed border-slate-200 text-center space-y-6">
          <Award size={48} className="mx-auto text-brand-orange" />
          <h4 className="text-2xl font-black text-brand-navy">Committed to Excellence</h4>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Every officer deployed by BLTnP Group Security is vetted, PSIRA-registered, and undergoes continuous training to maintain our high standards of operational delivery.
          </p>
        </div>
      </div>
    </div>
  );
};

const ContactPage = () => {
  return (
    <div className="pt-32 pb-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto space-y-24">
        <div className="text-center space-y-4">
          <h2 className="text-brand-orange font-bold uppercase tracking-widest text-xs md:text-sm">Get In Touch</h2>
          <h3 className="text-3xl md:text-5xl font-black text-brand-navy">Contact Our Operations Team</h3>
          <p className="text-slate-600 max-w-2xl mx-auto text-sm md:text-base">
            Ready to secure your assets? Contact us for a comprehensive risk assessment and quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="space-y-12">
            <div className="space-y-8">
              <h4 className="text-xl font-black text-brand-navy uppercase tracking-widest">Contact Details</h4>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <MapPin className="text-brand-orange" />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-navy">Head Office</span>
                    <p className="text-sm text-slate-500">Unit 14, 6490 Tshotlhe Crescent, Mmabatho, 2735</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Phone className="text-brand-orange" />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-navy">Office Line</span>
                    <p className="text-sm text-slate-500">010 085 0893</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <MessageCircle className="text-brand-orange" />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-navy">WhatsApp Support</span>
                    <p className="text-sm text-slate-500">Security: 079 608 5181</p>
                    <p className="text-sm text-slate-500">Academy: 069 810 2992</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Mail className="text-brand-orange" />
                  </div>
                  <div>
                    <span className="block font-bold text-brand-navy">Email Addresses</span>
                    <p className="text-sm text-slate-500">operations@bltnpgroupsecurity.co.za</p>
                    <p className="text-sm text-slate-500">info@bltnpacademy.co.za</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-brand-navy p-8 rounded-3xl text-white space-y-4">
              <h5 className="font-bold uppercase tracking-widest text-brand-orange text-xs">Operational Status</h5>
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xl font-bold">24/7 Control Room Active</span>
              </div>
              <p className="text-sm text-slate-400">Our response teams are on standby across all sectors.</p>
            </div>
          </div>

          <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-100">
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Full Name</label>
                <input type="text" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-brand-orange outline-none transition-colors" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Email Address</label>
                <input type="email" className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-brand-orange outline-none transition-colors" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Service Required</label>
                <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-brand-orange outline-none transition-colors appearance-none">
                  <option>Physical Guarding</option>
                  <option>Tactical & Response</option>
                  <option>Electronic Security</option>
                  <option>Risk Management</option>
                  <option>Academy Enrollment</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Industry Type</label>
                <select className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-brand-orange outline-none transition-colors appearance-none">
                  <option>Corporate</option>
                  <option>Government</option>
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-slate-500">Message / Requirements</label>
                <textarea rows={4} className="w-full p-4 bg-slate-50 rounded-xl border border-slate-200 focus:border-brand-orange outline-none transition-colors" placeholder="Tell us about your security needs..."></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full bg-brand-orange text-white py-5 rounded-xl font-black uppercase tracking-widest hover:bg-brand-navy transition-all shadow-xl">
                  Send Request
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-64 md:h-96 bg-slate-200 rounded-3xl overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center space-y-4 p-4">
              <MapPin size={32} className="md:w-12 md:h-12 mx-auto text-brand-orange" />
              <p className="font-bold text-brand-navy text-sm md:text-base">Mmabatho, South Africa</p>
              <p className="text-[10px] md:text-sm text-slate-500">6490 Tshotlhe Crescent, Unit 14</p>
            </div>
          </div>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.868774883394!2d25.615!3d-25.845!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDUwJzQyLjAiUyAyNcKwMzYnNTQuMCJF!5e0!3m2!1sen!2sza!4v1710240000000!5m2!1sen!2sza" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'grayscale(1) contrast(1.2) opacity(0.8)' }} 
            allowFullScreen 
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
            {currentPage === 'about' && <AboutPage />}
            {currentPage === 'solutions' && <SolutionsPage />}
            {currentPage === 'academy' && <AcademyPage />}
            {currentPage === 'compliance' && <CompliancePage />}
            {currentPage === 'contact' && <ContactPage />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/27796085181" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-green-500 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
      >
        <MessageCircle size={32} />
      </a>
    </div>
  );
}
