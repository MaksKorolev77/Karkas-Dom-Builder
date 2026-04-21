import { motion } from "framer-motion";

const stats = [
  {
    number: "18",
    suffix: "лет",
    label: "опыта в строительстве",
  },
  {
    number: "147+",
    suffix: "",
    label: "домов успешно сдано",
  },
  {
    number: "10",
    suffix: "лет",
    label: "официальной гарантии",
  },
  {
    number: "4",
    suffix: "сезона",
    label: "строим круглый год",
  },
];

export function TrustStats() {
  return (
    <section className="py-16 md:py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 opacity-10 pointer-events-none">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="399" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
          <circle cx="400" cy="400" r="299" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
          <circle cx="400" cy="400" r="199" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"/>
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-primary-foreground/10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`flex flex-col ${index !== 0 ? 'pl-8 md:pl-12' : ''}`}
            >
              <div className="flex items-baseline gap-1 mb-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-secondary">
                  {stat.number}
                </span>
                {stat.suffix && (
                  <span className="text-xl md:text-2xl font-medium text-primary-foreground/90">
                    {stat.suffix}
                  </span>
                )}
              </div>
              <span className="text-sm md:text-base text-primary-foreground/80 leading-snug">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
