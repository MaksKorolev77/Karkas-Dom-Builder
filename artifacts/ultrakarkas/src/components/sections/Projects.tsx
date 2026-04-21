import { motion } from "framer-motion";
import { Link } from "wouter";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { ArrowRight, Bed, Bath, Maximize } from "lucide-react";
import { projects } from "@/lib/projects";

export function Projects() {
  const featured = projects.slice(0, 6);

  return (
    <section id="projects" className="py-14 md:py-20 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
            Каталог
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Готовые проекты домов
          </h2>
          <p className="text-lg text-muted-foreground">
            От уютных дачных домиков до просторных семейных резиденций.
            Любой проект можно адаптировать под ваши пожелания.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featured.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
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
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4 cursor-pointer hover:text-primary transition-colors">
                    Проект «{project.name}»
                  </h3>
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
                      <Button className="w-full h-11">
                        Рассчитать этот проект
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px] w-[95vw]">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">Расчёт проекта «{project.name}»</DialogTitle>
                        <DialogDescription>
                          Оставьте свои контакты, и мы свяжемся с вами для детального расчёта проекта «{project.name}» ({project.area} м²).
                        </DialogDescription>
                      </DialogHeader>
                      <LeadForm defaultComment={`Интересует проект «${project.name}» (${project.area} м²).`} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/projects">
            <Button size="lg" className="h-14 px-8 text-base">
              Все проекты
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base">
                Заказать индивидуальный проект
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px] w-[95vw]">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">Индивидуальное проектирование</DialogTitle>
                <DialogDescription>
                  Расскажите о доме вашей мечты, и мы разработаем проект специально для вас.
                </DialogDescription>
              </DialogHeader>
              <LeadForm defaultComment="Интересует индивидуальный проект." />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  );
}
