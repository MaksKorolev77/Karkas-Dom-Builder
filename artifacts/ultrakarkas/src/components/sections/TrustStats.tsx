import { motion } from "framer-motion";
import { Award, Home, ShieldCheck, Snowflake } from "lucide-react";

const stats = [
  {
    icon: Award,
    number: "18",
    suffix: "лет",
    label: "опыта в строительстве",
    sub: "Работаем с 2015 года",
    color: "#f57a00",
    colorBg: "bg-primary/10",
    colorText: "text-primary",
  },
  {
    icon: Home,
    number: "147",
    suffix: "+",
    label: "домов успешно сдано",
    sub: "По всей Московской области",
    color: "#10b981",
    colorBg: "bg-emerald-500/10",
    colorText: "text-emerald-600",
  },
  {
    icon: ShieldCheck,
    number: "10",
    suffix: "лет",
    label: "официальной гарантии",
    sub: "На конструктив и все узлы",
    color: "#3b82f6",
    colorBg: "bg-blue-500/10",
    colorText: "text-blue-600",
  },
  {
    icon: Snowflake,
    number: "4",
    suffix: "сезона",
    label: "строим круглый год",
    sub: "Без остановок и простоев",
    color: "#8b5cf6",
    colorBg: "bg-violet-500/10",
    colorText: "text-violet-600",
  },
];

export function TrustStats() {
  return (
    <section className="py-10 md:py-14 bg-muted/40 border-y border-border overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Grid of stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative bg-card border border-border rounded-2xl p-5 md:p-7 hover:shadow-lg hover:-translate-y-1 transition-all overflow-hidden group"
              >
                {/* Subtle background accent */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `radial-gradient(ellipse at top left, ${stat.color}08 0%, transparent 60%)` }}
                />

                {/* Icon */}
                <div className={`w-10 h-10 md:w-11 md:h-11 rounded-xl ${stat.colorBg} flex items-center justify-center mb-4 md:mb-5`}>
                  <Icon className={`w-5 h-5 md:w-5 md:h-5 ${stat.colorText}`}/>
                </div>

                {/* Number */}
                <div className="flex items-baseline gap-1 mb-1">
                  <span
                    className="text-4xl md:text-5xl lg:text-[3.25rem] font-serif font-bold leading-none"
                    style={{ color: stat.color }}
                  >
                    {stat.number}
                  </span>
                  <span className="text-lg md:text-xl font-bold text-foreground/40 leading-none ml-0.5">
                    {stat.suffix}
                  </span>
                </div>

                {/* Label */}
                <div className="text-sm md:text-base font-semibold text-foreground leading-snug mb-1">
                  {stat.label}
                </div>

                {/* Sub */}
                <div className="text-xs text-muted-foreground leading-snug">
                  {stat.sub}
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: stat.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
