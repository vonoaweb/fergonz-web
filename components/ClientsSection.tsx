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

function ClientItem({ client }: { client: (typeof clients)[number] }) {
  return (
    <div className="flex items-center justify-center shrink-0 px-8 md:px-12 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
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
        <span className="text-xl md:text-2xl font-display font-bold text-gray-500 dark:text-white/50 whitespace-nowrap">
          {client.name}
        </span>
      )}
    </div>
  );
}

export default function ClientsSection() {
  return (
    <section className="relative bg-transparent dark:bg-transparent py-16 md:py-20 z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-center text-gray-400 dark:text-white/30 font-mono text-xs uppercase tracking-[0.2em] mb-10 md:mb-14 px-6">
          Trusted by companies I&apos;ve worked with
        </p>

        <div className="marquee-mask relative w-full">
          <div className="marquee-track flex w-max items-center">
            {[...clients, ...clients].map((client, index) => (
              <ClientItem key={`${client.name}-${index}`} client={client} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
