import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProject, packageSpecs, projects } from "@/lib/projects";
import {
  ArrowRight,
  Bed,
  Bath,
  Maximize,
  ChevronRight,
  Shield,
  Hammer,
  ThermometerSun,
  CheckCircle2,
  X,
  Phone,
  Gift,
} from "lucide-react";
import NotFound from "@/pages/not-found";

export default function ProjectDetailPage() {
  const [, params] = useRoute("/project/:slug");
  const slug = params?.slug;
  const project = slug ? getProject(slug) : undefined;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [activePkg, setActivePkg] = useState<"econom" | "optimum" | "maximum">("optimum");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `Проект «${project.name}» — ${project.area} м² — УльтраКаркас`;
    }
  }, [project]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setLightboxIdx(null);
      if (lightboxIdx !== null && project) {
        if (e.key === "ArrowRight") {
          setLightboxIdx((i) => (i! + 1) % project.gallery.length);
        }
        if (e.key === "ArrowLeft") {
          setLightboxIdx((i) => (i! - 1 + project.gallery.length) % project.gallery.length);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, project]);

  if (!project) return <NotFound />;

  const otherProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);
  const floorGroups = project.rooms.reduce<Record<string, typeof project.rooms>>((acc, r) => {
    const f = r.floor ?? "";
    (acc[f] ||= []).push(r);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-28 md:pt-32">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 md:px-6">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Главная</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/projects" className="hover:text-primary transition-colors">Проекты</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Проект «{project.name}»</span>
          </nav>
        </div>

        {/* Header + main image */}
        <section className="container mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div>
              <button
                onClick={() => setLightboxIdx(0)}
                className="block w-full aspect-[4/3] rounded-2xl overflow-hidden bg-muted relative group"
              >
                <img
                  src={project.gallery[0]}
                  alt={`Проект «${project.name}» — фото 1`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-background/95 backdrop-blur px-3 py-1.5 rounded-md text-xs font-semibold uppercase tracking-wider text-foreground">
                  {project.style} · {project.floors}
                </div>
                <div className="absolute bottom-4 right-4 bg-background/95 backdrop-blur px-3 py-1.5 rounded-md text-xs font-medium text-foreground">
                  Открыть фото
                </div>
              </button>

              <div className="grid grid-cols-5 gap-2 mt-3">
                {project.gallery.slice(0, 5).map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setLightboxIdx(i)}
                    className="aspect-square rounded-md overflow-hidden bg-muted relative group"
                  >
                    <img
                      src={src}
                      alt={`фото ${i + 1}`}
                      className="w-full h-full object-cover group-hover:opacity-80 transition-opacity"
                      loading="lazy"
                    />
                    {i === 4 && project.gallery.length > 5 && (
                      <div className="absolute inset-0 bg-foreground/70 text-background flex items-center justify-center font-semibold text-sm">
                        +{project.gallery.length - 5}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-4">
                {project.priceFrom}
              </div>
              <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
                Проект «{project.name}»
              </h1>

              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="bg-muted rounded-lg p-4 flex flex-col items-center text-center gap-1">
                  <Maximize className="w-5 h-5 text-primary mb-1" />
                  <span className="text-2xl font-bold text-foreground">{project.area}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">м²</span>
                </div>
                <div className="bg-muted rounded-lg p-4 flex flex-col items-center text-center gap-1">
                  <Bed className="w-5 h-5 text-primary mb-1" />
                  <span className="text-2xl font-bold text-foreground">{project.bedrooms}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">спальни</span>
                </div>
                <div className="bg-muted rounded-lg p-4 flex flex-col items-center text-center gap-1">
                  <Bath className="w-5 h-5 text-primary mb-1" />
                  <span className="text-2xl font-bold text-foreground">{project.bathrooms}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">санузел</span>
                </div>
              </div>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                {project.description}
              </p>

              <ul className="space-y-2 mb-8">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-foreground">{f}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="h-14 px-8 text-base flex-1">
                      Получить расчёт проекта
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] w-[95vw]">
                    <DialogHeader>
                      <DialogTitle className="font-serif text-2xl">Расчёт проекта «{project.name}»</DialogTitle>
                      <DialogDescription>
                        Оставьте контакты — менеджер свяжется в течение рабочего дня.
                      </DialogDescription>
                    </DialogHeader>
                    <LeadForm defaultComment={`Интересует проект «${project.name}» (${project.area} м²).`} />
                  </DialogContent>
                </Dialog>
                <a href="tel:+74993909789">
                  <Button size="lg" variant="outline" className="h-14 px-6 w-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Позвонить
                  </Button>
                </a>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-lg bg-accent border border-primary/20">
                <Gift className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-foreground">При заключении договора — проект в подарок!</div>
                  <div className="text-sm text-muted-foreground">
                    Заключите договор на основные работы и получите проект бесплатно.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-12 border-t border-border">
            {[
              { icon: Hammer, label: "Прочный несущий каркас" },
              { icon: Shield, label: "10 лет гарантии" },
              { icon: ThermometerSun, label: "Энергосберегающий дом" },
              { icon: CheckCircle2, label: "Контроль качества на каждом этапе" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Packages */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="inline-block text-primary font-semibold uppercase tracking-wider text-sm mb-4">
                Комплектации
              </span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Выберите комплектацию
              </h2>
              <p className="text-muted-foreground">
                Нажмите на нужную комплектацию — ниже откроется подробный состав.
              </p>
            </div>

            <Tabs value={activePkg} onValueChange={(v) => setActivePkg(v as typeof activePkg)} className="max-w-5xl mx-auto">
              <TabsList className="grid grid-cols-3 h-auto p-1 bg-background rounded-xl border border-border">
                {project.packages.map((p) => (
                  <TabsTrigger
                    key={p.key}
                    value={p.key}
                    className="flex flex-col gap-1 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-lg"
                  >
                    <span className="font-bold text-base">{p.name}</span>
                    <span className="text-xs opacity-90">{p.price}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              {project.packages.map((p) => (
                <TabsContent key={p.key} value={p.key} className="mt-6">
                  <div className="bg-background rounded-xl border border-border p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-border">
                      <div>
                        <div className="text-2xl md:text-3xl font-serif font-bold text-foreground">{p.name}</div>
                        <div className="text-muted-foreground">{p.tagline}</div>
                      </div>
                      <div className="text-2xl md:text-3xl font-bold text-primary">{p.price}</div>
                    </div>

                    <Accordion type="single" collapsible defaultValue="full">
                      <AccordionItem value="full" className="border-none">
                        <AccordionTrigger className="text-base font-semibold text-foreground hover:no-underline py-2">
                          Полный состав комплектации
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-4 mt-4">
                            {packageSpecs.map((row, i) => {
                              if ("section" in row) {
                                return (
                                  <div key={i} className="text-xs uppercase tracking-wider font-bold text-primary pt-3">
                                    {row.section}
                                  </div>
                                );
                              }
                              const value = (row as Record<string, string>)[p.key];
                              return (
                                <div key={i} className="grid grid-cols-12 gap-3 text-sm py-2 border-b border-border/50 last:border-0">
                                  <div className="col-span-12 md:col-span-5 text-muted-foreground">{row.label}</div>
                                  <div className="col-span-12 md:col-span-7 text-foreground">{value}</div>
                                </div>
                              );
                            })}
                          </div>
                          <div className="mt-6 text-xs text-muted-foreground italic">
                            Разводка электрики, водоснабжения, отопления и канализации рассчитывается индивидуально.
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="mt-6 flex flex-col sm:flex-row gap-3">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="lg" className="flex-1">
                            Заказать «{project.name}» в комплектации {p.name}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px] w-[95vw]">
                          <DialogHeader>
                            <DialogTitle className="font-serif text-2xl">Заявка на проект «{project.name}»</DialogTitle>
                            <DialogDescription>
                              Комплектация {p.name}, {p.price}.
                            </DialogDescription>
                          </DialogHeader>
                          <LeadForm
                            defaultPackage={p.key === "econom" ? "эконом" : p.key === "optimum" ? "оптимум" : "максимум"}
                            defaultComment={`Проект «${project.name}» (${project.area} м²), комплектация ${p.name}.`}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </section>

        {/* Characteristics + Rooms */}
        <section className="container mx-auto px-4 md:px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">
                Характеристики
              </h2>
              <dl className="space-y-4">
                {project.characteristics.map((c) => (
                  <div key={c.label} className="grid grid-cols-12 gap-4 pb-4 border-b border-border">
                    <dt className="col-span-12 md:col-span-5 text-muted-foreground">{c.label}</dt>
                    <dd className="col-span-12 md:col-span-7 font-medium text-foreground">{c.value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-8">
                Состав помещений
              </h2>
              <div className="space-y-8">
                {Object.entries(floorGroups).map(([floor, rooms]) => (
                  <div key={floor || "_"}>
                    {floor && (
                      <div className="text-sm uppercase tracking-wider font-bold text-primary mb-4">
                        {floor}
                      </div>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {rooms.map((r, i) => (
                        <div key={i} className="bg-muted rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">{r.name}</div>
                          <div className="font-bold text-foreground">{r.area}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Other projects */}
        <section className="bg-muted py-20">
          <div className="container mx-auto px-4 md:px-6">
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-foreground mb-10 text-center">
              Другие дома
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProjects.map((p) => (
                <Link key={p.slug} href={`/project/${p.slug}`}>
                  <article className="group bg-background rounded-xl overflow-hidden border border-border hover:shadow-xl transition-all cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden bg-muted">
                      <img src={p.cover} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                    </div>
                    <div className="p-5">
                      <div className="text-primary font-bold mb-2">{p.priceFrom}</div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-3">Проект «{p.name}»</h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{p.area} м²</span>
                        <span>{p.bedrooms} спал.</span>
                        <span>{p.bathrooms} санузл.</span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/projects">
                <Button size="lg" variant="outline" className="h-12 px-8">
                  Все проекты
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setLightboxIdx(null)}
        >
          <button
            className="absolute top-6 right-6 text-white/90 hover:text-white p-2"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx(null); }}
            aria-label="Закрыть"
          >
            <X className="w-8 h-8" />
          </button>
          <button
            className="absolute left-6 text-white/90 hover:text-white p-2 text-4xl select-none"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i! - 1 + project.gallery.length) % project.gallery.length); }}
            aria-label="Предыдущее"
          >
            ‹
          </button>
          <img
            src={project.gallery[lightboxIdx]}
            alt={`Проект «${project.name}» — фото ${lightboxIdx + 1}`}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute right-6 text-white/90 hover:text-white p-2 text-4xl select-none"
            onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i! + 1) % project.gallery.length); }}
            aria-label="Следующее"
          >
            ›
          </button>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/80 text-sm bg-black/50 px-3 py-1 rounded-full">
            {lightboxIdx + 1} / {project.gallery.length}
          </div>
        </div>
      )}
    </div>
  );
}
