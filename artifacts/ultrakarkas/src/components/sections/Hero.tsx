import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[100svh] flex items-center pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero.png"
          alt="Каркасный дом в лесу"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent h-1/3 bottom-0 top-auto"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary border border-primary/20 font-semibold text-xs md:text-sm mb-6 tracking-wide uppercase">
              Надёжно. Тепло. На века.
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-[1.1] mb-5 md:mb-6"
          >
            Строительство каркасных домов <span className="text-primary italic">под ключ</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-2xl text-foreground/80 mb-8 md:mb-10 max-w-2xl leading-relaxed"
          >
            Готовые проекты, любые комплектации от базовой до чистовой. Строим в Москве и Московской области.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="h-14 px-8 text-lg w-full sm:w-auto">
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
              className="h-14 px-8 text-lg w-full sm:w-auto bg-background/50 backdrop-blur-sm border-border hover:bg-background/80"
              onClick={scrollToProjects}
            >
              Смотреть проекты
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
