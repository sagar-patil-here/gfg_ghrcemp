import React from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
  {
    label: 'Instagram',
    handle: '@gfg_ghrcem',
    url: 'https://www.instagram.com/gfg_ghrcem/',
    color: '#E1306C'
  },
  {
    label: 'LinkedIn',
    handle: 'GFG GHRCEM Chapter',
    url: 'https://www.linkedin.com/company/geeksforgeeksghrcem/posts/?feedView=all',
    color: '#0A66C2'
  },
  {
    label: 'WhatsApp',
    handle: 'GFG GHRCEM Community',
    url: 'https://chat.whatsapp.com/JGXPdhWVxjZ1m45NufACUp',
    color: '#25D366'
  }
];

const iconMap: Record<string, React.ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="w-6 h-6">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="18" cy="6" r="1.2" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.11 1 2.48 1 4.98 2.12 4.98 3.5zM.5 8h4V24h-4V8zm7.498 0h3.833v2.169h.054c.534-1.012 1.84-2.169 3.787-2.169C21.092 8 24 10.42 24 15.186V24h-4v-7.608c0-1.814-.034-4.149-2.524-4.149-2.53 0-2.919 1.978-2.919 4.021V24h-4V8z" />
    </svg>
  ),
  WhatsApp: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
      <path d="M12.003 2.004c-5.511 0-9.997 4.486-9.997 9.997 0 1.764.463 3.48 1.345 4.999L2 22l5.152-1.335a10.002 10.002 0 0 0 4.851 1.236h.001c5.511 0 9.997-4.486 9.997-9.997s-4.486-9.9-9.998-9.9zm0 18.18a8.16 8.16 0 0 1-4.157-1.15l-.298-.177-3.059.793.817-2.985-.194-.306a8.154 8.154 0 0 1-1.225-4.362c0-4.508 3.668-8.176 8.176-8.176s8.175 3.668 8.175 8.176-3.667 8.187-8.176 8.187zm4.506-6.149c-.245-.122-1.45-.716-1.674-.795-.224-.082-.387-.122-.55.122-.164.245-.632.795-.775.959-.142.164-.286.184-.53.061-.245-.122-1.032-.38-1.965-1.21-.726-.647-1.215-1.447-1.357-1.692-.142-.245-.015-.377.107-.499.11-.11.245-.286.367-.429.122-.143.163-.245.245-.408.082-.164.041-.306-.02-.428-.061-.122-.55-1.328-.754-1.82-.198-.478-.4-.413-.55-.421l-.469-.008c-.163 0-.428.061-.653.306-.224.245-.856.836-.856 2.037 0 1.2.877 2.362 1 2.525.123.163 1.726 2.635 4.184 3.694.585.252 1.04.403 1.395.515.586.186 1.12.16 1.542.097.47-.07 1.45-.593 1.654-1.166.204-.57.204-1.06.143-1.166-.061-.108-.224-.175-.469-.297z" />
    </svg>
  )
};

const SocialHandles: React.FC = () => {
  return (
    <section className="px-4 md:px-12 py-24 bg-[#0f0f0f] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Stay connected</p>
            <h3 className="text-4xl md:text-5xl font-medium leading-tight">
              Social handles that<br />keep the campus pulse alive.
            </h3>
          </div>
          <p className="text-gray-400 max-w-md text-sm md:text-base">
            We share event recaps, mentorship stories, and last-minute announcements across our social channels.
            Join the conversation to make sure you never miss a drop.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="group relative rounded-3xl border border-white/10 p-6 bg-white/5 backdrop-blur-sm overflow-hidden"
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at top, ${social.color}22, transparent 60%)` }} />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white" style={{ color: social.color }}>
                    {iconMap[social.label]}
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-gray-500">{social.label}</p>
                    <p className="text-xl font-medium">{social.handle}</p>
                  </div>
                </div>
                <span className="text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">↗</span>
              </div>
              <div className="mt-6 text-xs text-gray-500 uppercase tracking-[0.3em] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: social.color }} />
                always on
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialHandles;

