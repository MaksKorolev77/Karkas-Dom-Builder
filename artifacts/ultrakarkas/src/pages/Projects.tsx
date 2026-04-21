import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { projects } from "@/lib/projects";
import { ArrowRight, Bed, Bath, Maximize, ChevronRight } from "lucide-react";

export default function ProjectsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Каталог проектов каркасных домов — УльтраКаркас";
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-28 md:pt-32">
        {/* Page header */}
        <section className="container mx-auto px-4 md:px-6 pb-12">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Проекты</span>
          </nav>
          <div className="max-w-3xl">
            <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
              Каталог проектов
            </span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-6">
              Все готовые проекты
            </h1>
            <p className="text-lg text-muted-foreground">
              Выберите готовый проект каркасного дома или закажите индивидуальную разработку.
              Каждый проект можно адаптировать под ваш участок и пожелания.
            </p>
          </div>
        </section>

        {/* Projects grid */}
        <section className="container mx-auto px-4 md:px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
              >
                <Link href={`/project/${project.slug}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted cursor-pointer">
                    <img
                      src={project.cover}
                      alt={`Проект дома ${project.name}`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-background/95 backdrop-blur px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-foreground">
                      {project.style} · {project.floors}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-bold">
                      {project.priceFrom}
                    </div>
                  </div>
                </Link>

                <div className="p-6 flex flex-col flex-grow">
                  <Link href={`/project/${project.slug}`}>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4 cursor-pointer hover:text-primary transition-colors">
                      Проект «{project.name}»
                    </h2>
                  </Link>

                  <div className="grid grid-cols-3 gap-2 mb-6 py-4 border-y border-border text-sm">
                    <div className="flex flex-col items-center text-center gap-1">
                      <Maximize className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Площадь</span>
                      <span className="font-semibold text-foreground">{project.area} м²</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 border-l border-border">
                      <Bed className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Спален</span>
                      <span className="font-semibold text-foreground">{project.bedrooms}</span>
                    </div>
                    <div className="flex flex-col items-center text-center gap-1 border-l border-border">
                      <Bath className="w-4 h-4 text-primary" />
                      <span className="text-muted-foreground">Санузлов</span>
                      <span className="font-semibold text-foreground">{project.bathrooms}</span>
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col gap-2">
                    <Link href={`/project/${project.slug}`}>
                      <Button variant="outline" className="w-full h-11">
                        Подробнее о проекте
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full h-11">Рассчитать этот проект</Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[600px] w-[95vw]">
                        <DialogHeader>
                          <DialogTitle className="font-serif text-2xl">Расчёт проекта «{project.name}»</DialogTitle>
                          <DialogDescription>
                            Оставьте контакты — мы свяжемся для детального расчёта.
                          </DialogDescription>
                        </DialogHeader>
                        <LeadForm defaultComment={`Интересует проект «${project.name}» (${project.area} м²).`} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* CTA at bottom */}
          <div className="mt-16 bg-foreground text-background rounded-2xl p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4">
              Не нашли подходящий проект?
            </h2>
            <p className="text-base md:text-lg opacity-80 mb-8 max-w-2xl mx-auto">
              Мы спроектируем дом с нуля под ваш участок, бюджет и образ жизни.
              Адаптация типовых проектов — бесплатно при заключении договора.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="h-14 px-10 text-base">
                  Обсудить индивидуальный проект
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-[95vw]">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">Индивидуальный проект</DialogTitle>
                  <DialogDescription>
                    Опишите идею, мы свяжемся и обсудим детали.
                  </DialogDescription>
                </DialogHeader>
                <LeadForm defaultComment="Интересует индивидуальный проект." />
              </DialogContent>
            </Dialog>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
