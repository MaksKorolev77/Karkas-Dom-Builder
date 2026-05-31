import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

const nodes = [
  {
    id: "foundation",
    anchor: "#tech-foundation",
    label: "Фундамент",
    emoji: "🏗",
    accentColor: "#f57a00",
    accentBg: "bg-primary/10",
    accentBorder: "border-primary/20",
    tagline: "Основа под любые условия участка",
    options: [
      { name: "Ж/б забивные сваи", desc: "Быстро, не зависит от грунта, стоим круглый год" },
      { name: "Свайно-ростверковый", desc: "Для плотных грунтов с хорошей несущей способностью" },
      { name: "Монолитная плита", desc: "Максимальная надёжность на сложных и пучинистых грунтах" },
    ],
  },
  {
    id: "walls",
    anchor: "#tech-walls",
    label: "Стены",
    emoji: "🧱",
    accentColor: "#3b82f6",
    accentBg: "bg-blue-500/10",
    accentBorder: "border-blue-500/20",
    tagline: "Пирог стены под ваш климат и бюджет",
    options: [
      { name: "150 мм утеплителя", desc: "R = 3.75 — базовый тёплый контур, Эконом" },
      { name: "200 мм утеплителя", desc: "R = 5.0 — перекрёстный каркас, Оптимум" },
      { name: "250 мм утеплителя", desc: "R = 6.25 — усиленный каркас 190 мм, Максимум" },
    ],
  },
  {
    id: "roof",
    anchor: "#tech-roof",
    label: "Кровля",
    emoji: "🏠",
    accentColor: "#10b981",
    accentBg: "bg-emerald-500/10",
    accentBorder: "border-emerald-500/20",
    tagline: "Кровельный пирог без утечек тепла",
    options: [
      { name: "Утепление 200 мм", desc: "Каменная вата в стропилах, R = 5.0 — Эконом / Оптимум" },
      { name: "Утепление 250 мм", desc: "Стропила 190 мм + перекрёстный слой, R = 6.25 — Максимум" },
      { name: "Вентилируемый зазор", desc: "Во всех вариантах — исключает конденсат под металлочерепицей" },
    ],
  },
];

export function TechIntro() {
  return (
    <section className="py-10 md:py-14 bg-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="text-center max-w-2xl mx-auto mb-10 md:mb-12"
        >
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Конструктив
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-background mb-4 leading-tight">
            Три узла, которые<br className="hidden md:block"/> определяют дом
          </h2>
          <p className="text-base text-background/60 leading-relaxed">
            Фундамент, стены и кровля — в каждом узле есть несколько технических решений.
            Мы подберём нужное под ваш грунт, климат и комплектацию.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
          {nodes.map((node, i) => (
            <motion.a
              key={node.id}
              href={node.anchor}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-2xl border bg-background/5 ${node.accentBorder} p-6 flex flex-col gap-4 hover:bg-background/10 transition-colors cursor-pointer no-underline`}
            >
              {/* Icon + Label */}
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl ${node.accentBg} border ${node.accentBorder} flex items-center justify-center text-2xl shrink-0`}>
                  {node.emoji}
                </div>
                <div>
                  <div className="text-xl font-bold text-background leading-tight">{node.label}</div>
                  <div className="text-xs text-background/50 leading-snug mt-0.5">{node.tagline}</div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-background/10"/>

              {/* Options */}
              <ul className="space-y-3 flex-1">
                {node.options.map((opt, j) => (
                  <motion.li
                    key={j}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + j * 0.07 + 0.2 }}
                    className="flex items-start gap-2.5"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: node.accentColor }}
                    />
                    <div>
                      <div className="text-sm font-semibold text-background leading-snug">{opt.name}</div>
                      <div className="text-xs text-background/45 leading-snug mt-0.5">{opt.desc}</div>
                    </div>
                  </motion.li>
                ))}
              </ul>

              {/* CTA */}
              <div className="flex items-center gap-1.5 mt-1" style={{ color: node.accentColor }}>
                <span className="text-sm font-semibold">Смотреть детали</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5"/>
              </div>
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  );
}
