import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';

const JoinPage: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#0f0f0f] text-white pt-32 pb-20 px-6 flex flex-col items-center justify-center">
      <Helmet>
        <title>Join | GFG GHRCEMP Student Chapter</title>
        <meta name="description" content="Join the GFG GHRCEMP Student Chapter. Check for current core team openings and recruitment status." />
      </Helmet>
      
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-[#00df9a] font-mono text-sm tracking-[0.25em] uppercase mb-6">
            Recruitment Status
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8">
            No Active Openings
          </h1>
          
          <div className="mb-8">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#00df9a] text-black text-xs font-bold uppercase tracking-widest">
              Volunteers Welcome
            </span>
          </div>

          <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Thank you for your interest in joining the Core Team of GFG GHRCEMP. 
            We are not currently accepting applications for leadership positions.
          </p>
          
          <div className="p-8 border border-white/10 bg-white/5 rounded-2xl backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-2">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-6">
              We recruit new core team members as our seniors graduate. All future openings will be posted right here, so stay tuned! Follow our social channels for real-time updates.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a 
                href="https://www.instagram.com/gfg_ghrcem/" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-2 rounded-full border border-white/20 hover:border-[#00df9a] hover:text-[#00df9a] transition-colors text-sm font-medium"
              >
                Instagram
              </a>
              <a 
                href="https://www.linkedin.com/company/geeksforgeeksghrcem/" 
                target="_blank" 
                rel="noreferrer"
                className="px-6 py-2 rounded-full border border-white/20 hover:border-[#00df9a] hover:text-[#00df9a] transition-colors text-sm font-medium"
              >
                LinkedIn
              </a>
            </div>
          </div>

          <div className="mt-8">
            <p className="text-gray-500 text-sm">
              For specific inquiries regarding the selection process, please contact the <a href="/team" className="text-[#00df9a] hover:underline decoration-[#00df9a]/50">Club Coordinators</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinPage;
