import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { Thermometer, Clock, Home, ShieldCheck, MapPin, Ruler } from "lucide-react";

const floatingCards = [
  {
    icon: Clock,
    value: "45 дней",
    label: "от свай до ключей",
    sub: "Строго по утверждённому графику",
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    accent: "border-primary/25",
  },
  {
    icon: Thermometer,
    value: "−40°C",
    label: "снаружи — тепло внутри",
    sub: "250 мм каменной ваты в стене",
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    accent: "border-blue-500/25",
  },
  {
    icon: Ruler,
    value: "от 40 000 ₽",
    label: "за м² — под ключ",
    sub: "Смета фиксируется в договоре",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/15",
    accent: "border-amber-500/25",
  },
  {
    icon: ShieldCheck,
    value: "10 лет",
    label: "официальная гарантия",
    sub: "На конструктив и все узлы дома",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    accent: "border-emerald-500/25",
  },
];

const mobileStats = [
  { value: "18", suffix: "лет", label: "опыта" },
  { value: "147+", suffix: "", label: "домов сдано" },
  { value: "45", suffix: "дн", label: "от свай до ключей" },
];

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-20 pb-0 overflow-hidden">

      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Каркасный дом в лесу"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/94 via-background/60 to-background/10"/>
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-background/30"/>
        <div className="absolute left-0 top-1/3 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(245,122,0,0.07) 0%, transparent 70%)" }}/>
      </div>

      {/* Subtle decorative rings */}
      <div className="absolute right-[14%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none hidden xl:block opacity-40">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/10"
            style={{ transform: `scale(${0.35 + i * 0.22})` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 55 + i * 15, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      {/* ─── Main content ─── */}
      <div className="container relative z-10 mx-auto px-4 md:px-6 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 xl:gap-20 items-center w-full">

          {/* LEFT: Copy */}
          <div className="max-w-2xl py-8 lg:py-0">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex flex-wrap items-center gap-3 mb-5"
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-primary/10 text-primary border border-primary/25 font-semibold text-xs tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
                Надёжно. Тепло. На века.
              </span>
              <span className="flex items-center gap-1 text-xs text-foreground/45 font-medium">
                <MapPin className="w-3 h-3 text-primary/50"/>
                Москва и МО · с 2015 года
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
              className="text-[2.6rem] sm:text-5xl md:text-6xl lg:text-[4rem] xl:text-[4.5rem] font-serif font-bold text-foreground leading-[1.05] mb-4"
            >
              Каркасные дома<br className="hidden sm:block"/>
              <span className="text-primary italic"> под ключ</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
              className="text-base sm:text-lg text-foreground/65 mb-7 max-w-lg leading-relaxed"
            >
              Строим по скандинавской технологии — от фундамента до чистовой отделки.
              Готовые проекты или индивидуальный проект под ваш участок.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-12 sm:h-13 px-7 text-base sm:text-lg w-full sm:w-auto shadow-xl shadow-primary/20 hover:shadow-primary/35 transition-shadow">
                    Получить расчёт
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] w-[95vw]">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Оставить заявку на расчёт</DialogTitle>
                    <DialogDescription>
                      Заполните форму — подготовим предварительный расчёт стоимости.
                    </DialogDescription>
                  </DialogHeader>
                  <LeadForm />
                </DialogContent>
              </Dialog>

              <Button
                size="lg"
                variant="outline"
                className="h-12 sm:h-13 px-7 text-base sm:text-lg w-full sm:w-auto bg-background/25 backdrop-blur-sm border-border/40 hover:bg-background/50"
                onClick={scrollToProjects}
              >
                Смотреть проекты
              </Button>
            </motion.div>

            {/* Mobile mini-stats — compact row, distinct from TrustStats below */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.4 }}
              className="flex items-stretch gap-0 lg:hidden"
            >
              {mobileStats.map((s, i) => (
                <div
                  key={i}
                  className={`flex-1 flex flex-col items-center justify-center py-3 px-2
                    ${i === 0 ? "rounded-l-xl" : ""}
                    ${i === mobileStats.length - 1 ? "rounded-r-xl" : ""}
                    ${i < mobileStats.length - 1 ? "border-r border-white/10" : ""}
                  `}
                  style={{ background: "rgba(10,10,22,0.72)", backdropFilter: "blur(12px)", border: i < mobileStats.length - 1 ? undefined : "1px solid rgba(255,255,255,0.07)" }}
                >
                  <div className="flex items-baseline gap-0.5">
                    <span className="text-2xl font-serif font-bold text-primary leading-none">{s.value}</span>
                    {s.suffix && <span className="text-xs font-semibold text-foreground/50 ml-0.5">{s.suffix}</span>}
                  </div>
                  <span className="text-[10px] text-foreground/40 mt-0.5 leading-tight text-center">{s.label}</span>
                </div>
              ))}
              <div
                className="flex-1 flex flex-col items-center justify-center py-3 px-2 rounded-r-xl"
                style={{ background: "rgba(245,122,0,0.15)", border: "1px solid rgba(245,122,0,0.25)", marginLeft: -1 }}
              >
                <span className="text-[11px] font-bold text-primary leading-tight text-center">Бесплатный выезд</span>
                <span className="text-[9px] text-primary/60 mt-0.5 leading-tight text-center">Москва и МО</span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Floating cards — desktop only */}
          <div className="hidden lg:flex flex-col gap-3">
            {floatingCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 50, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                  whileHover={{ scale: 1.025, x: -5, transition: { duration: 0.18 } }}
                  className={`w-[280px] border ${card.accent} rounded-2xl p-4 shadow-2xl cursor-default`}
                  style={{ background: "rgba(10,10,22,0.96)" }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl ${card.iconBg} shrink-0`}>
                      <Icon className={`w-4.5 h-4.5 ${card.iconColor}`} style={{ width: 18, height: 18 }}/>
                    </div>
                    <div className="min-w-0">
                      <div className="text-lg font-bold text-white leading-tight">{card.value}</div>
                      <div className="text-[13px] text-white/70 font-medium mt-0.5 leading-snug">{card.label}</div>
                      <div className="text-[11px] text-white/35 mt-1 leading-snug">{card.sub}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Seamless transition into TrustStats */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none z-10"/>
    </section>
  );
}
