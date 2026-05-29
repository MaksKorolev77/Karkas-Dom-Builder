import { motion } from "framer-motion";
import { BookOpen, Pencil, FileCheck, Sparkles, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";

const options = [
  {
    id: "catalog",
    icon: BookOpen,
    badge: "Быстрее всего",
    badgeColor: "bg-emerald-500/15 text-emerald-600 border-emerald-500/25",
    title: "По нашему проекту",
    subtitle: "Выбираете из каталога готовых решений",
    description:
      "40+ готовых проектов с точными сметами и проверенными решениями. Вы видите именно то, что получите — без сюрпризов. Можно выбрать площадь, этажность, планировку.",
    perks: ["Смета готова сразу", "Сроки фиксированы", "Уже строили такой", "Минимальный срок"],
    accentColor: "#10b981",
    bgGrad: "from-emerald-500/8 to-transparent",
    cta: "Смотреть каталог",
    href: "/projects",
  },
  {
    id: "adapt",
    icon: Pencil,
    badge: "Самый популярный",
    badgeColor: "bg-primary/15 text-primary border-primary/25",
    title: "Адаптируем наш",
    subtitle: "Берём готовый — меняем под вас",
    description:
      "Понравился проект, но хочется переместить дверь, добавить балкон или изменить планировку? Мы адаптируем любой наш проект под ваш участок и пожелания.",
    perks: ["Ваша планировка", "На основе проверенных узлов", "Экономия на проектировании", "2–4 недели на доработку"],
    accentColor: "#f57a00",
    bgGrad: "from-primary/8 to-transparent",
    cta: "Обсудить адаптацию",
    href: null,
  },
  {
    id: "yours",
    icon: FileCheck,
    badge: "Ваши решения",
    badgeColor: "bg-blue-500/15 text-blue-600 border-blue-500/25",
    title: "По вашему проекту",
    subtitle: "Приносите свой проект — мы строим",
    description:
      "Есть готовый архитектурный проект от другого архитектора или из интернета? Мы изучим его, дадим честную оценку и построим по вашим чертежам.",
    perks: ["Строим по любым чертежам", "Честная экспертиза проекта", "Прозрачная смета", "Контроль каждого этапа"],
    accentColor: "#3b82f6",
    bgGrad: "from-blue-500/8 to-transparent",
    cta: "Загрузить проект",
    href: null,
  },
  {
    id: "custom",
    icon: Sparkles,
    badge: "Только для вас",
    badgeColor: "bg-violet-500/15 text-violet-600 border-violet-500/25",
    title: "Индивидуальное проектирование",
    subtitle: "Разрабатываем с нуля под ваш участок",
    description:
      "Нестандартный участок, особые пожелания или уникальная архитектура? Мы разрабатываем проект с нуля — с учётом геологии, ориентации по сторонам света и вашего образа жизни.",
    perks: ["Проект под ваш участок", "Геологические изыскания", "Авторский надзор", "100% ваше решение"],
    accentColor: "#8b5cf6",
    bgGrad: "from-violet-500/8 to-transparent",
    cta: "Начать проектирование",
    href: null,
  },
];

export function ProjectOptions() {
  return (
    <section className="py-14 md:py-20 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Как работаем
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Строим по любому сценарию
          </h2>
          <p className="text-base md:text-lg text-muted-foreground">
            Выберите то, что удобно вам — готовый проект из каталога, адаптацию под ваши пожелания или индивидуальное проектирование с нуля.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {options.map((opt, i) => {
            const Icon = opt.icon;
            return (
              <motion.div
                key={opt.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: i * 0.1 }}
                className={`relative bg-card border border-border rounded-2xl p-5 md:p-6 flex flex-col shadow-sm hover:shadow-md transition-shadow group bg-gradient-to-b ${opt.bgGrad}`}
              >
                {/* Badge */}
                <div className={`inline-flex w-fit text-xs font-semibold px-2.5 py-1 rounded-full border mb-4 ${opt.badgeColor}`}>
                  {opt.badge}
                </div>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 shrink-0"
                  style={{ background: `${opt.accentColor}18` }}
                >
                  <Icon className="w-5 h-5" style={{ color: opt.accentColor }}/>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-foreground mb-1 leading-tight">{opt.title}</h3>
                <p className="text-xs text-muted-foreground mb-3 font-medium">{opt.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{opt.description}</p>

                {/* Perks */}
                <ul className="space-y-1.5 mb-5">
                  {opt.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-foreground/80">
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: opt.accentColor }}/>
                      {p}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {opt.href ? (
                  <a
                    href={opt.href}
                    className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                    style={{ color: opt.accentColor }}
                  >
                    {opt.cta}
                    <ArrowRight className="w-4 h-4"/>
                  </a>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="inline-flex items-center gap-1.5 text-sm font-semibold group-hover:gap-2.5 transition-all"
                        style={{ color: opt.accentColor }}
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

                {/* Hover accent line at bottom */}
                <div
                  className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ background: opt.accentColor }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
