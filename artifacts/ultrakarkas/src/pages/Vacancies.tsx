import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { motion } from "framer-motion";
import { MapPin, Clock, Briefcase, ChevronRight, Mail, Phone } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";

const vacancies = [
  {
    id: "architect",
    title: "Архитектор / Проектировщик",
    type: "Полная занятость",
    location: "Москва / Удалённо",
    salary: "от 90 000 ₽",
    accentColor: "#f57a00",
    badge: "Открытая вакансия",
    summary: "Ищем опытного архитектора для разработки проектов каркасных домов и индивидуального проектирования под запросы клиентов.",
    duties: [
      "Разработка архитектурных и конструктивных проектов каркасных домов",
      "Адаптация готовых проектов под пожелания заказчиков и специфику участков",
      "Создание планировок, фасадов, 3D-визуализаций",
      "Подготовка рабочей документации для строительных бригад",
      "Взаимодействие с клиентами на этапе проектирования",
      "Участие в выезде на объекты и авторский надзор",
    ],
    requirements: [
      "Высшее архитектурное или строительное образование",
      "Опыт от 2 лет в проектировании малоэтажного жилья",
      "Уверенное владение AutoCAD, ArchiCAD или Revit",
      "Понимание каркасных технологий строительства будет преимуществом",
      "Умение работать в команде и в сжатые сроки",
    ],
    perks: [
      "Официальное трудоустройство, белая зарплата",
      "Гибкий график и возможность удалённой работы",
      "Разнообразные интересные проекты",
      "Дружный профессиональный коллектив",
      "Карьерный рост и обучение за счёт компании",
    ],
  },
  {
    id: "foreman",
    title: "Бригадир строительной бригады",
    type: "Полная занятость",
    location: "Москва и Московская область",
    salary: "от 120 000 ₽",
    accentColor: "#3b82f6",
    badge: "Срочный набор",
    summary: "Ищем опытного бригадира для руководства строительством каркасных домов под ключ в Москве и Подмосковье.",
    duties: [
      "Руководство строительной бригадой (3–8 человек) на объекте",
      "Организация и контроль всех этапов строительства каркасного дома",
      "Обеспечение качества и соответствия технологическим картам",
      "Работа с документацией на объекте (журналы, акты скрытых работ)",
      "Взаимодействие с прорабом и заказчиком на строительной площадке",
      "Контроль расхода материалов и их приёмка на объекте",
    ],
    requirements: [
      "Опыт бригадира строительства от 3 лет",
      "Знание каркасной технологии строительства (ЛСТК или деревянный каркас)",
      "Умение читать строительные чертежи и проекты",
      "Ответственность, организаторские способности, умение работать с людьми",
      "Наличие собственного транспорта приветствуется",
    ],
    perks: [
      "Официальное трудоустройство",
      "Стабильная высокая зарплата + премии за объекты",
      "Объекты в Москве и Подмосковье без длительных командировок",
      "Чёткие технологические стандарты и поддержка главного инженера",
      "Возможность обучения и карьерного роста до главного прораба",
    ],
  },
];

export default function Vacancies() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              Карьера
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
              Вакансии
            </h1>
            <p className="text-lg text-muted-foreground">
              Мы строим качественные дома и ищем специалистов, которые разделяют наши ценности — точность, ответственность и уважение к своему делу.
            </p>
          </motion.div>

          {/* Vacancy cards */}
          <div className="max-w-4xl mx-auto space-y-8">
            {vacancies.map((v, i) => (
              <motion.div
                key={v.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Top accent */}
                <div className="h-1.5" style={{ background: v.accentColor }}/>

                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                    <div>
                      <span
                        className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3"
                        style={{ background: `${v.accentColor}18`, color: v.accentColor }}
                      >
                        {v.badge}
                      </span>
                      <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-2">
                        {v.title}
                      </h2>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4"/>
                          {v.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4"/>
                          {v.type}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Briefcase className="w-4 h-4"/>
                          <span className="font-semibold" style={{ color: v.accentColor }}>{v.salary}</span>
                        </span>
                      </div>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <button
                          className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
                          style={{ background: v.accentColor }}
                        >
                          Откликнуться
                          <ChevronRight className="w-4 h-4"/>
                        </button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] w-[95vw]">
                        <DialogHeader>
                          <DialogTitle className="font-serif text-2xl">{v.title}</DialogTitle>
                          <DialogDescription>Оставьте заявку и мы свяжемся с вами для собеседования.</DialogDescription>
                        </DialogHeader>
                        <LeadForm />
                      </DialogContent>
                    </Dialog>
                  </div>

                  <p className="text-muted-foreground mb-6 leading-relaxed">{v.summary}</p>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Duties */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Обязанности</h3>
                      <ul className="space-y-2">
                        {v.duties.map((d) => (
                          <li key={d} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: v.accentColor }}/>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Требования</h3>
                      <ul className="space-y-2">
                        {v.requirements.map((r) => (
                          <li key={r} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: v.accentColor }}/>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Perks */}
                    <div>
                      <h3 className="font-semibold text-foreground mb-3 text-sm uppercase tracking-wide">Мы предлагаем</h3>
                      <ul className="space-y-2">
                        {v.perks.map((p) => (
                          <li key={p} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: v.accentColor }}/>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Contact block */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-6 md:p-8 text-center"
          >
            <h3 className="text-xl font-bold font-serif text-foreground mb-2">Не нашли подходящую вакансию?</h3>
            <p className="text-muted-foreground mb-6">
              Если вы специалист в строительстве и хотите работать с нами — отправьте резюме напрямую.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="mailto:info@ultrakarkas.ru"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4"/>
                Отправить резюме
              </a>
              <a
                href="tel:+74993909789"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:border-primary/40 transition-colors"
              >
                <Phone className="w-4 h-4"/>
                +7 (499) 390-97-89
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
