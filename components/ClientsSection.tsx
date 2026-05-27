'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const clients = [
  { name: 'Amazon', logo: null },
  { name: 'PayPal', logo: null },
  { name: 'Grupo Urrea', logo: '/images/client-urrea.png' },
  { name: 'Urrea Online', logo: '/images/client-urreaonline.png' },
  { name: 'Fortius', logo: '/images/client-fortius.png' },
  { name: 'Tuul', logo: '/images/client-tuul.png' },
  { name: 'DEV Consultores', logo: '/images/client-devconsultores.png' },
];

export default function ClientsSection() {
  return (
    <section className="relative bg-transparent dark:bg-transparent py-16 md:py-20 z-10">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-gray-400 dark:text-white/30 font-mono text-xs uppercase tracking-[0.2em] mb-10 md:mb-14">
            Trusted by companies I&apos;ve worked with
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16 max-w-4xl mx-auto">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              >
                {client.logo ? (
                  <div className="relative w-24 h-12 md:w-28 md:h-14">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      fill
                      className="object-contain"
                      sizes="120px"
                    />
                  </div>
                ) : (
                  <span className="text-lg md:text-xl font-display font-bold text-gray-400 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-colors duration-300">
                    {client.name}
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
