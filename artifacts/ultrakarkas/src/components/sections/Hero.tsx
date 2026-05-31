import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { MapPin, ArrowRight } from "lucide-react";

const stats = [
  { value: "18", suffix: "лет", label: "опыта" },
  { value: "147+", suffix: "", label: "домов сдано" },
  { value: "45", suffix: "дн", label: "от свай до ключей" },
  { value: "10", suffix: "лет", label: "гарантии" },
];

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* ── Background ───────────────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.png"
          alt="Каркасный дом"
          className="w-full h-full object-cover object-center"
          style={{ filter: "brightness(0.9) saturate(0.85)" }}
        />

        {/* Warm-tinted base veil — softens the whole photo uniformly */}
        <div className="absolute inset-0" style={{ background: "rgba(18,10,3,0.48)" }}/>

        {/* Directional: warm dark left → almost clear right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(108deg, rgba(16,9,2,0.78) 0%, rgba(14,8,2,0.58) 35%, rgba(8,4,0,0.22) 65%, rgba(0,0,0,0.05) 100%)",
          }}
        />

        {/* Top vignette — keeps navbar area dark */}
        <div
          className="absolute top-0 left-0 right-0 h-40"
          style={{ background: "linear-gradient(to bottom, rgba(14,8,2,0.60) 0%, transparent 100%)" }}
        />

        {/* Bottom fade to page background */}
        <div
          className="absolute bottom-0 left-0 right-0 h-56"
          style={{ background: "linear-gradient(to top, hsl(var(--background)) 0%, transparent 100%)" }}
        />

        {/* Very subtle warm glow around text zone */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 28% 55%, rgba(245,122,0,0.055) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-0">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-[540px]">

            {/* Brand line */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="flex items-center gap-3 mb-7"
            >
              <span className="block w-7 h-[2px] rounded-full bg-primary"/>
              <span className="text-[11px] font-bold tracking-[0.22em] uppercase text-white/50">
                УльтраКаркас
              </span>
              <span className="text-white/20">·</span>
              <span className="flex items-center gap-1 text-[11px] text-white/38 tracking-wide">
                <MapPin className="w-3 h-3 text-primary/55 shrink-0"/>
                Москва и МО · с 2015 года
              </span>
            </motion.div>

            {/* H1 */}
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="font-serif font-bold text-white leading-[1.05] mb-5"
              style={{ fontSize: "clamp(2.6rem, 4.8vw, 4.6rem)" }}
            >
              Каркасные дома<br/>
              <em className="text-primary not-italic">под ключ</em>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-white/52 leading-relaxed mb-10"
              style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.1rem)" }}
            >
              Строим по скандинавской технологии — от фундамента до
              чистовой отделки. Готовые проекты или проект под ваш участок.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="h-13 px-8 text-base w-full sm:w-auto"
                    style={{ boxShadow: "0 8px 32px rgba(245,122,0,0.30)" }}
                  >
                    Получить расчёт
                    <ArrowRight className="w-4 h-4 ml-2 shrink-0"/>
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
                onClick={scrollToProjects}
                className="h-13 px-8 text-base w-full sm:w-auto text-white/72 hover:text-white hover:bg-white/8 border border-white/14 hover:border-white/28"
              >
                Смотреть проекты
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Stats bar ───────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.45 }}
        className="relative z-10 mt-auto"
      >
        <div className="container mx-auto px-4 md:px-6">
          <div
            className="grid grid-cols-2 sm:grid-cols-4 rounded-t-xl overflow-hidden"
            style={{
              background: "rgba(16,9,2,0.72)",
              backdropFilter: "blur(18px)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "none",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center justify-center py-5 px-4 text-center"
              >
                {i > 0 && (
                  <div className="absolute left-0 top-4 bottom-4 w-px bg-white/7"/>
                )}
                <div className="flex items-baseline gap-1 mb-0.5">
                  <span className="text-2xl md:text-[1.75rem] font-serif font-bold text-primary leading-none">
                    {s.value}
                  </span>
                  {s.suffix && (
                    <span className="text-xs font-semibold text-white/38 leading-none">{s.suffix}</span>
                  )}
                </div>
                <span className="text-[11px] text-white/38 leading-snug">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
