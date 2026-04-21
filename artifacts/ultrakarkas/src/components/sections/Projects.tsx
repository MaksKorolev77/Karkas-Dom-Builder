import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LeadForm } from "@/components/LeadForm";
import { Maximize2 } from "lucide-react";

const projects = [
  {
    id: "ujut",
    name: "Уют",
    price: "от 4 808 000 ₽",
    area: "120.2",
    bedrooms: 3,
    bathrooms: 1,
    image: "/images/project-1.png"
  },
  {
    id: "comfort",
    name: "Комфорт",
    price: "от 4 520 000 ₽",
    area: "113",
    bedrooms: 4,
    bathrooms: 2,
    image: "/images/project-2.png"
  },
  {
    id: "family",
    name: "Семейный",
    price: "от 4 328 000 ₽",
    area: "108.2",
    bedrooms: 3,
    bathrooms: 1,
    image: "/images/project-3.png"
  },
  {
    id: "spacious",
    name: "Просторный",
    price: "от 7 756 000 ₽",
    area: "193.9",
    bedrooms: 5,
    bathrooms: 2,
    image: "/images/project-4.png"
  },
  {
    id: "country",
    name: "Загородный",
    price: "от 8 800 000 ₽",
    area: "220",
    bedrooms: 3,
    bathrooms: 2,
    image: "/images/project-5.png"
  },
  {
    id: "forest",
    name: "Лесной",
    price: "от 3 168 000 ₽",
    area: "79.2",
    bedrooms: 2,
    bathrooms: 1,
    image: "/images/project-6.png"
  }
];

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
            Популярные проекты
          </h2>
          <p className="text-lg text-muted-foreground">
            От уютных дачных домиков до просторных семейных резиденций. 
            Любой проект можно адаптировать под ваши пожелания.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                <img 
                  src={project.image} 
                  alt={`Проект дома ${project.name}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl font-bold text-foreground">
                    {project.name}
                  </h3>
                  <span className="text-lg font-semibold text-primary">
                    {project.price}
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-8 py-4 border-y border-border">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground mb-1">Площадь</div>
                    <div className="font-medium">{project.area} м²</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-sm text-muted-foreground mb-1">Спален</div>
                    <div className="font-medium">{project.bedrooms}</div>
                  </div>
                  <div className="text-center border-l border-border">
                    <div className="text-sm text-muted-foreground mb-1">Санузлов</div>
                    <div className="font-medium">{project.bathrooms}</div>
                  </div>
                </div>
                
                <div className="mt-auto">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full h-12 text-base" variant="default">
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
                      <LeadForm defaultComment={`Интересует проект «${project.name}».`} />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Не нашли подходящий? Закажите индивидуальный проект
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
