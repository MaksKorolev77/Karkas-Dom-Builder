import { motion } from "framer-motion";
import { Award, Home, ShieldCheck, Snowflake } from "lucide-react";

const stats = [
  {
    icon: Award,
    number: "18",
    suffix: "лет",
    label: "опыта в строительстве",
  },
  {
    icon: Home,
    number: "147+",
    suffix: "",
    label: "домов успешно сдано",
  },
  {
    icon: ShieldCheck,
    number: "10",
    suffix: "лет",
    label: "официальной гарантии",
  },
  {
    icon: Snowflake,
    number: "4",
    suffix: "сезона",
    label: "строим круглый год",
  },
];

export function TrustStats() {
  return (
    <section className="py-12 md:py-16 bg-muted/40 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-5 md:p-8 hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 md:mb-5">
                  <Icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex items-baseline gap-1.5 mb-1.5 md:mb-2">
                  <span className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-primary">
                    {stat.number}
                  </span>
                  {stat.suffix && (
                    <span className="text-base md:text-xl font-medium text-foreground/70">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span className="text-sm md:text-base text-muted-foreground leading-snug block">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
