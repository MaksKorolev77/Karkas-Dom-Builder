import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { Thermometer, Clock, Home, ShieldCheck } from "lucide-react";

const floatingCards = [
  {
    icon: Thermometer,
    value: "−40°C",
    label: "снаружи — тепло внутри",
    sub: "250 мм каменной ваты",
    delay: 0.65,
    color: "from-blue-500/20 to-primary/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Clock,
    value: "45 дней",
    label: "от свай до ключей",
    sub: "Работаем строго по графику",
    delay: 0.80,
    color: "from-primary/20 to-orange-400/20",
    iconColor: "text-primary",
  },
  {
    icon: Home,
    value: "40+ домов",
    label: "сдано в Подмосковье",
    sub: "С 2015 года, гарантия 5 лет",
    delay: 0.95,
    color: "from-emerald-500/20 to-primary/20",
    iconColor: "text-emerald-400",
  },
  {
    icon: ShieldCheck,
    value: "НГ сайдинг",
    label: "негорючий фасад",
    sub: "Фиброцемент в Максимум",
    delay: 1.10,
    color: "from-slate-500/20 to-slate-300/10",
    iconColor: "text-slate-300",
  },
];

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Каркасный дом в лесу"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/75 to-background/20"/>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60"/>
      </div>

      {/* Decorative animated rings */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden xl:block">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-full border border-primary/10"
            style={{ transform: `scale(${0.5 + i * 0.2})` }}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 40 + i * 15, repeat: Infinity, ease: "linear" }}
          />
        ))}
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: main text */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-xs md:text-sm mb-6 tracking-wide uppercase">
                Надёжно. Тепло. На века.
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.08] mb-5 md:mb-6"
            >
              Строительство каркасных домов{" "}
              <span className="text-primary italic">под ключ</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-foreground/75 mb-8 md:mb-10 max-w-xl leading-relaxed"
            >
              Готовые проекты, любые комплектации от базовой до чистовой. Строим в Москве и Московской области.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="h-14 px-8 text-base md:text-lg w-full sm:w-auto shadow-lg shadow-primary/30">
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
                className="h-14 px-8 text-base md:text-lg w-full sm:w-auto bg-background/40 backdrop-blur-sm border-border/60 hover:bg-background/70"
                onClick={scrollToProjects}
              >
                Смотреть проекты
              </Button>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4 mt-8 md:mt-10"
            >
              {["✓ Договор и смета", "✓ Гарантия 5 лет", "✓ Без скрытых платежей"].map((item) => (
                <span key={item} className="text-xs md:text-sm text-foreground/60 font-medium">{item}</span>
              ))}
            </motion.div>
          </div>

          {/* Right: floating info cards */}
          <div className="hidden lg:flex flex-col gap-3 items-end">
            {floatingCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 60, y: 20 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ duration: 0.6, delay: card.delay, ease: "easeOut" }}
                  whileHover={{ scale: 1.03, x: -4 }}
                  className={`w-72 backdrop-blur-md border border-white/15 rounded-2xl p-4 shadow-2xl`}
                  style={{ background: "rgba(10,10,20,0.62)" }}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-xl bg-white/10 shrink-0`}>
                      <Icon className={`w-5 h-5 ${card.iconColor}`}/>
                    </div>
                    <div>
                      <div className="text-xl font-bold text-white leading-tight">{card.value}</div>
                      <div className="text-sm text-white/80 font-medium">{card.label}</div>
                      <div className="text-xs text-white/50 mt-0.5">{card.sub}</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none"/>
    </section>
  );
}
