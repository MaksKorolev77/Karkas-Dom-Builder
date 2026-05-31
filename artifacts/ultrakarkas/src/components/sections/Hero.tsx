import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { MapPin, ArrowRight } from "lucide-react";

const stats = [
  { value: "18", suffix: "лет", label: "опыта в строительстве" },
  { value: "147+", suffix: "", label: "домов сдано" },
  { value: "45", suffix: "дн", label: "от свай до ключей" },
  { value: "10", suffix: "лет", label: "официальной гарантии" },
];

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* ── Background ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Каркасный дом"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark overlay — left strong, right lighter */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.65) 45%, rgba(0,0,0,0.20) 100%)"
        }}/>
        {/* Bottom fade to white (page bg) */}
        <div className="absolute bottom-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)" }}/>
        {/* Subtle warm glow */}
        <div className="absolute left-0 bottom-1/3 w-[500px] h-[500px] pointer-events-none opacity-40"
          style={{ background: "radial-gradient(circle, rgba(245,122,0,0.12) 0%, transparent 65%)" }}/>
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl">

            {/* Brand line */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="block w-8 h-[2px] bg-primary rounded-full"/>
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/55">
                УльтраКаркас
              </span>
              <span className="text-white/20 text-xs">·</span>
              <span className="flex items-center gap-1 text-[11px] text-white/40 tracking-wide">
                <MapPin className="w-3 h-3 text-primary/60 shrink-0"/>
                Москва и МО · с 2015 года
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif font-bold leading-[1.04] mb-6 text-white"
              style={{ fontSize: "clamp(2.6rem, 5.5vw, 5rem)" }}
            >
              Каркасные дома<br/>
              <em className="text-primary not-italic">под ключ</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-white/60 leading-relaxed mb-10 max-w-xl"
              style={{ fontSize: "clamp(1rem, 1.5vw, 1.15rem)" }}
            >
              Строим по скандинавской технологии — от фундамента до
              чистовой отделки. Готовые проекты или проект под ваш участок.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="h-13 px-8 text-base sm:text-lg w-full sm:w-auto shadow-2xl shadow-primary/30 hover:shadow-primary/45 transition-all"
                  >
                    Получить расчёт
                    <ArrowRight className="w-4 h-4 ml-2"/>
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
                variant="ghost"
                className="h-13 px-8 text-base sm:text-lg w-full sm:w-auto text-white/80 hover:text-white hover:bg-white/10 border border-white/15 hover:border-white/30 transition-all"
                onClick={scrollToProjects}
              >
                Смотреть проекты
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Bottom stats bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="relative z-10 mt-auto"
      >
        <div className="container mx-auto px-4 md:px-6 pb-0">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 rounded-t-2xl overflow-hidden"
            style={{ background: "rgba(6,6,15,0.82)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.07)", borderBottom: "none" }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={`flex flex-col items-center justify-center py-5 px-4 text-center relative
                  ${i < stats.length - 1 ? "" : ""}
                `}
              >
                {i > 0 && (
                  <div className="absolute left-0 top-4 bottom-4 w-px bg-white/8"/>
                )}
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-2xl md:text-3xl font-serif font-bold text-primary leading-none">{s.value}</span>
                  {s.suffix && (
                    <span className="text-xs md:text-sm font-semibold text-white/40 leading-none">{s.suffix}</span>
                  )}
                </div>
                <span className="text-[11px] md:text-xs text-white/40 leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
