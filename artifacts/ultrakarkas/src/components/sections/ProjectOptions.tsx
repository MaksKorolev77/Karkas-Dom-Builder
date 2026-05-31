import { motion } from "framer-motion";
import { BookOpen, Pencil, FileCheck, Sparkles, ArrowRight, Check } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { useRef } from "react";
import { useInView } from "framer-motion";

const options = [
  {
    id: "catalog",
    num: "01",
    icon: BookOpen,
    badge: "Быстрее всего",
    badgeColor: "text-emerald-600",
    badgeBg: "bg-emerald-500/10 border-emerald-500/20",
    title: "По нашему проекту",
    subtitle: "Выбираете из каталога готовых решений",
    description:
      "40+ готовых проектов с точными сметами и проверенными решениями. Вы видите именно то, что получите — без сюрпризов. Можно выбрать площадь, этажность, планировку.",
    perks: ["Смета готова сразу", "Сроки фиксированы", "Уже строили такой", "Минимальный срок"],
    accent: "#10b981",
    accentBg: "from-emerald-500/10 via-emerald-500/4 to-transparent",
    accentBorder: "hover:border-emerald-500/40",
    accentGlow: "rgba(16,185,129,0.12)",
    cta: "Смотреть каталог",
    href: "/projects",
  },
  {
    id: "adapt",
    num: "02",
    icon: Pencil,
    badge: "Самый популярный",
    badgeColor: "text-primary",
    badgeBg: "bg-primary/10 border-primary/20",
    title: "Адаптируем наш",
    subtitle: "Берём готовый — меняем под вас",
    description:
      "Понравился проект, но хочется переместить дверь, добавить балкон или изменить планировку? Мы адаптируем любой наш проект под ваш участок и пожелания.",
    perks: ["Ваша планировка", "На основе проверенных узлов", "Экономия на проектировании", "2–4 недели на доработку"],
    accent: "#f57a00",
    accentBg: "from-primary/10 via-primary/4 to-transparent",
    accentBorder: "hover:border-primary/40",
    accentGlow: "rgba(245,122,0,0.12)",
    cta: "Обсудить адаптацию",
    href: null,
  },
  {
    id: "yours",
    num: "03",
    icon: FileCheck,
    badge: "Ваши решения",
    badgeColor: "text-blue-600",
    badgeBg: "bg-blue-500/10 border-blue-500/20",
    title: "По вашему проекту",
    subtitle: "Приносите свой проект — мы строим",
    description:
      "Есть готовый архитектурный проект от другого архитектора или из интернета? Мы изучим его, дадим честную оценку и построим по вашим чертежам.",
    perks: ["Строим по любым чертежам", "Честная экспертиза проекта", "Прозрачная смета", "Контроль каждого этапа"],
    accent: "#3b82f6",
    accentBg: "from-blue-500/10 via-blue-500/4 to-transparent",
    accentBorder: "hover:border-blue-500/40",
    accentGlow: "rgba(59,130,246,0.12)",
    cta: "Загрузить проект",
    href: null,
  },
  {
    id: "custom",
    num: "04",
    icon: Sparkles,
    badge: "Только для вас",
    badgeColor: "text-violet-600",
    badgeBg: "bg-violet-500/10 border-violet-500/20",
    title: "Индивидуальное проектирование",
    subtitle: "Разрабатываем с нуля под ваш участок",
    description:
      "Нестандартный участок, особые пожелания или уникальная архитектура? Мы разрабатываем проект с нуля — с учётом геологии, ориентации по сторонам света и вашего образа жизни.",
    perks: ["Проект под ваш участок", "Геологические изыскания", "Авторский надзор", "100% ваше решение"],
    accent: "#8b5cf6",
    accentBg: "from-violet-500/10 via-violet-500/4 to-transparent",
    accentBorder: "hover:border-violet-500/40",
    accentGlow: "rgba(139,92,246,0.12)",
    cta: "Начать проектирование",
    href: null,
  },
];

function OptionCard({ opt, index }: { opt: typeof options[0]; index: number }) {
  const Icon = opt.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: index * 0.09 }}
      className={`group relative bg-card border border-border rounded-2xl flex flex-col overflow-hidden transition-all duration-300 ${opt.accentBorder} hover:shadow-xl`}
      style={{ "--glow": opt.accentGlow } as React.CSSProperties}
    >
      {/* Top gradient stripe */}
      <div className={`absolute inset-x-0 top-0 h-[3px] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
        style={{ background: opt.accent }}
      />

      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${opt.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`}/>

      <div className="relative p-6 md:p-7 flex flex-col h-full">
        {/* Header row */}
        <div className="flex items-start justify-between mb-5">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ background: `${opt.accent}18` }}
          >
            <Icon className="w-6 h-6" style={{ color: opt.accent }}/>
          </div>
          <span className="text-5xl font-black leading-none select-none"
            style={{ color: `${opt.accent}18` }}>
            {opt.num}
          </span>
        </div>

        {/* Badge */}
        <span className={`inline-flex w-fit text-[11px] font-bold px-2.5 py-1 rounded-full border mb-3 tracking-wide ${opt.badgeColor} ${opt.badgeBg}`}>
          {opt.badge}
        </span>

        {/* Title & subtitle */}
        <h3 className="text-xl font-bold text-foreground mb-1 leading-tight">{opt.title}</h3>
        <p className="text-xs text-muted-foreground font-medium mb-3">{opt.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">{opt.description}</p>

        {/* Perks */}
        <ul className="space-y-2 mb-6">
          {opt.perks.map((p) => (
            <li key={p} className="flex items-center gap-2.5 text-sm text-foreground/80">
              <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ background: `${opt.accent}20` }}>
                <Check className="w-3 h-3" style={{ color: opt.accent }}/>
              </div>
              {p}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-auto">
          <div className="h-px bg-border/60 mb-5"/>
          {opt.href ? (
            <a
              href={opt.href}
              className="inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3"
              style={{ color: opt.accent }}
            >
              {opt.cta}
              <ArrowRight className="w-4 h-4"/>
            </a>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3"
                  style={{ color: opt.accent }}
                >
                  {opt.cta}
                  <ArrowRight className="w-4 h-4"/>
                </button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-[95vw]">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">{opt.title}</DialogTitle>
                  <DialogDescription>{opt.description}</DialogDescription>
                </DialogHeader>
                <LeadForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectOptions() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-10 md:py-14 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div ref={ref} className="max-w-3xl mx-auto mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              Как работаем
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground leading-tight">
                Строим по любому<br className="hidden md:block"/> сценарию
              </h2>
              <p className="text-base text-muted-foreground max-w-sm md:text-right leading-relaxed">
                Выберите то, что удобно вам — проект из каталога, адаптация или строительство с нуля
              </p>
            </div>
          </motion.div>

          {/* Horizontal accent line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="h-px bg-gradient-to-r from-primary/40 via-primary/20 to-transparent mt-6 origin-left"
          />
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {options.map((opt, i) => (
            <OptionCard key={opt.id} opt={opt} index={i}/>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          Не уверены, какой сценарий подходит? —{" "}
          <Dialog>
            <DialogTrigger asChild>
              <button className="text-primary font-semibold hover:underline underline-offset-2">
                напишите нам
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95vw]">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Помогаем выбрать сценарий</DialogTitle>
                <DialogDescription>Расскажите о своём участке и задаче — подберём оптимальный путь.</DialogDescription>
              </DialogHeader>
              <LeadForm />
            </DialogContent>
          </Dialog>
          , подберём оптимальный путь.
        </motion.p>
      </div>
    </section>
  );
}
