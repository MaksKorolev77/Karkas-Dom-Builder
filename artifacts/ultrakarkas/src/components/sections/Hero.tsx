import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { Thermometer, Clock, Home, ShieldCheck, MapPin, Star, ChevronDown, Award, Ruler } from "lucide-react";

const floatingCards = [
  {
    icon: Clock,
    value: "45 дней",
    label: "от свай до ключей",
    sub: "Строго по утверждённому графику",
    delay: 0.6,
    iconColor: "text-primary",
    iconBg: "bg-primary/15",
    accent: "border-primary/20",
  },
  {
    icon: Thermometer,
    value: "−40°C",
    label: "снаружи — тепло внутри",
    sub: "250 мм каменной ваты в стене",
    delay: 0.75,
    iconColor: "text-blue-400",
    iconBg: "bg-blue-500/15",
    accent: "border-blue-500/20",
  },
  {
    icon: Home,
    value: "40+ домов",
    label: "сдано в Подмосковье",
    sub: "С 2015 года · Гарантия 5 лет",
    delay: 0.9,
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/15",
    accent: "border-emerald-500/20",
  },
  {
    icon: Ruler,
    value: "от 40 000 ₽",
    label: "за м² — базовая комплектация",
    sub: "Фиксируется в договоре",
    delay: 1.05,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/15",
    accent: "border-amber-500/20",
  },
  {
    icon: ShieldCheck,
    value: "НГ фасад",
    label: "негорючий сайдинг в стандарте",
    sub: "Фиброцемент в пакете Максимум",
    delay: 1.2,
    iconColor: "text-slate-300",
    iconBg: "bg-white/10",
    accent: "border-white/10",
  },
];

const trustItems = [
  { icon: Award, text: "Договор + смета", sub: "до подписания" },
  { icon: ShieldCheck, text: "Гарантия 5 лет", sub: "на конструктив" },
  { icon: MapPin, text: "Москва и МО", sub: "выезд бесплатно" },
  { icon: Star, text: "Без доп. платежей", sub: "цена фиксирована" },
];

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollDown = () => {
    window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center pt-20 pb-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Каркасный дом в лесу"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/97 via-background/70 to-background/20"/>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70"/>
      </div>

      {/* Animated decorative rings */}
      <div className="absolute right-[-60px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none hidden xl:block">
        {[1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/8"
            style={{ transform: `scale(${0.35 + i * 0.2})` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 45 + i * 12, repeat: Infinity, ease: "linear" }}
          />
        ))}
        <motion.div
          className="absolute inset-0 m-auto w-3 h-3 rounded-full bg-primary/40"
          style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
          animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 flex-1 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center w-full">

          {/* LEFT: Main text */}
          <div className="max-w-2xl">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary border border-primary/25 font-semibold text-xs md:text-sm tracking-wide uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"/>
                Надёжно. Тепло. На века.
              </span>
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-foreground/50 font-medium">
                <MapPin className="w-3 h-3 text-primary/60"/>
                Москва и МО
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-[4.8rem] font-serif font-bold text-foreground leading-[1.06] mb-2"
            >
              Строительство каркасных домов{" "}
              <span className="text-primary italic">под ключ</span>
            </motion.h1>

            {/* Brand tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="text-base sm:text-lg text-foreground/50 font-medium mb-5 tracking-wide"
            >
              от{" "}
              <span className="text-primary font-bold tracking-tight">УльтраКаркас</span>
              <span className="mx-2 text-foreground/25">·</span>
              <span className="text-foreground/40 text-sm">с 2015 года</span>
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-foreground/70 mb-7 md:mb-8 max-w-xl leading-relaxed"
            >
              Строим каркасные дома по скандинавской технологии. Готовые проекты или
              индивидуальный проект — от фундамента до чистовой отделки.
              <span className="block mt-1.5 text-foreground/50 text-sm md:text-base">
                Тёплый контур за 45 дней. Стоимость — от 40 000 ₽/м².
              </span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-3 mb-5"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-13 px-8 text-base md:text-lg w-full sm:w-auto shadow-xl shadow-primary/25 hover:shadow-primary/40 transition-shadow">
                    Получить расчёт
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] w-[95vw]">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Оставить заявку на расчёт</DialogTitle>
                    <DialogDescription>
                      Заполните форму ниже, и мы подготовим для вас предварительный расчёт стоимости.
                    </DialogDescription>
                  </DialogHeader>
                  <LeadForm />
                </DialogContent>
              </Dialog>

              <Button
                size="lg"
                variant="outline"
                className="h-13 px-8 text-base md:text-lg w-full sm:w-auto bg-background/30 backdrop-blur-sm border-border/50 hover:bg-background/60"
                onClick={scrollToProjects}
              >
                Смотреть проекты
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {trustItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.text} className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "rgba(10,10,22,0.75)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <Icon className="w-4 h-4 text-primary shrink-0"/>
                    <div>
                      <div className="text-xs font-semibold text-white/90 leading-tight">{item.text}</div>
                      <div className="text-[10px] text-white/45 leading-tight">{item.sub}</div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT: Floating cards */}
          <div className="hidden lg:flex flex-col gap-2.5 items-end">
            {floatingCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 60, y: 15 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.65, delay: card.delay, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, x: -6, transition: { duration: 0.2 } }}
                  className={`w-[300px] border ${card.accent} rounded-2xl p-4 shadow-2xl cursor-default`}
                  style={{ background: "rgba(10,10,22,0.96)" }}
                >
                  <div className="flex items-start gap-3.5">
                    <div className={`p-2.5 rounded-xl ${card.iconBg} shrink-0`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`}/>
                    </div>
                    <div className="min-w-0">
                      <div className="text-xl font-bold text-white leading-tight">{card.value}</div>
                      <div className="text-sm text-white/75 font-medium mt-0.5 leading-snug">{card.label}</div>
                      <div className="text-xs text-white/40 mt-1 leading-snug">{card.sub}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={scrollDown}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-foreground/30 hover:text-foreground/60 transition-colors group"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Листать</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5"/>
        </motion.div>
      </motion.button>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none"/>
    </section>
  );
}
