import { motion } from "framer-motion";
import { PenTool, Hammer, PaintRoller } from "lucide-react";

const services = [
  {
    icon: <PenTool className="w-8 h-8 text-secondary" />,
    title: "Индивидуальное проектирование",
    items: [
      "Создание проекта с нуля под ваш образ жизни",
      "Адаптация и доработка типовых проектов",
      "Архитектурный раздел (АР)",
      "Реалистичная 3D-визуализация будущего дома"
    ]
  },
  {
    icon: <Hammer className="w-8 h-8 text-secondary" />,
    title: "Строительство под ключ",
    items: [
      "Монтаж надёжного фундамента",
      "Сборка прочного силового каркаса",
      "Устройство кровельной системы",
      "Многослойное утепление и пароизоляция",
      "Установка окон и дверей",
      "Разводка инженерных систем"
    ]
  },
  {
    icon: <PaintRoller className="w-8 h-8 text-secondary" />,
    title: "Отделочные работы",
    items: [
      "Внутренняя черновая и чистовая отделка",
      "Монтаж напольных покрытий (ламинат, плитка)",
      "Поклейка обоев и покраска стен",
      "Внешняя отделка фасада (сайдинг, планкен)",
      "Устройство натяжных и подвесных потолков",
      "Установка дверей, плинтусов"
    ]
  }
];

export function Services() {
  return (
    <section className="py-24 bg-primary text-primary-foreground relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6 text-white">
            Наши услуги
          </h2>
          <p className="text-lg text-primary-foreground/80">
            Мы берем на себя все этапы: от первого наброска на бумаге до финальной уборки перед новосельем.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
            >
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mb-6">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-6 text-white">{service.title}</h3>
              <ul className="space-y-3">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary shrink-0 mt-2" />
                    <span className="text-primary-foreground/90 leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
