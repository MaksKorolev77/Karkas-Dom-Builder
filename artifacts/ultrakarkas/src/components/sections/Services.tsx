import { motion } from "framer-motion";
import { PenTool, Hammer, PaintRoller, Check } from "lucide-react";

const services = [
  {
    icon: PenTool,
    title: "Индивидуальное проектирование",
    items: [
      "Создание проекта с нуля под ваш образ жизни",
      "Адаптация и доработка типовых проектов",
      "Архитектурный раздел (АР)",
      "Реалистичная 3D-визуализация будущего дома",
    ],
  },
  {
    icon: Hammer,
    title: "Строительство под ключ",
    items: [
      "Монтаж надёжного фундамента",
      "Сборка прочного силового каркаса",
      "Устройство кровельной системы",
      "Многослойное утепление и пароизоляция",
      "Установка окон и дверей",
      "Разводка инженерных систем",
    ],
  },
  {
    icon: PaintRoller,
    title: "Отделочные работы",
    items: [
      "Внутренняя черновая и чистовая отделка",
      "Монтаж напольных покрытий (ламинат, плитка)",
      "Поклейка обоев и покраска стен",
      "Внешняя отделка фасада (сайдинг, планкен)",
      "Устройство натяжных и подвесных потолков",
      "Установка дверей, плинтусов",
    ],
  },
];

export function Services() {
  return (
    <section className="py-14 md:py-20 bg-muted/40">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Что мы делаем
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4 md:mb-6">
            Наши услуги
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Берём на себя все этапы: от первого наброска на бумаге до финальной уборки перед новосельем.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-background border border-border rounded-2xl p-6 md:p-8 hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-primary text-primary-foreground rounded-xl flex items-center justify-center mb-5 md:mb-6">
                  <Icon className="w-7 h-7 md:w-8 md:h-8" />
                </div>
                <h3 className="text-xl md:text-2xl font-serif font-bold mb-5 md:mb-6 text-foreground">
                  {service.title}
                </h3>
                <ul className="space-y-3">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="text-foreground/80 leading-snug text-sm md:text-base">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
