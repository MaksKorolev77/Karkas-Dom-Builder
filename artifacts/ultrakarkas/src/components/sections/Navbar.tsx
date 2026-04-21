import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "Проекты", id: "projects" },
    { name: "Комплектации", id: "packages" },
    { name: "О нас", id: "about" },
    { name: "Контакты", id: "contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-border shadow-sm py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-xl rounded-sm">
                УК
              </div>
              <span className="font-serif font-bold text-xl tracking-tight hidden sm:block">
                УльтраКаркас
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollTo(link.id)}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Contact & CTA */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="tel:+74993909789"
                className="flex items-center gap-2 font-medium hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-secondary" />
                +7 (499) 390-97-89
              </a>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>Получить расчёт</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Оставить заявку на расчёт</DialogTitle>
                    <DialogDescription>
                      Заполните форму ниже, и мы подготовим для вас предварительный расчёт стоимости.
                    </DialogDescription>
                  </DialogHeader>
                  <LeadForm />
                </DialogContent>
              </Dialog>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 pb-6 flex flex-col lg:hidden animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-6 text-center text-lg">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollTo(link.id)}
                className="font-medium text-foreground hover:text-primary transition-colors py-2"
              >
                {link.name}
              </button>
            ))}
          </nav>
          
          <div className="mt-auto space-y-6 pt-6 border-t">
            <a
              href="tel:+74993909789"
              className="flex items-center justify-center gap-2 font-medium text-xl hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 text-secondary" />
              +7 (499) 390-97-89
            </a>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full text-lg h-14">Получить расчёт</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] w-[95vw]">
                <DialogHeader>
                  <DialogTitle className="font-serif text-2xl">Оставить заявку</DialogTitle>
                  <DialogDescription>
                    Заполните форму, и мы свяжемся с вами.
                  </DialogDescription>
                </DialogHeader>
                <LeadForm />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      )}

      {/* Floating Mobile CTA */}
      <div className="md:hidden fixed bottom-6 right-6 z-40">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg h-14 px-6 text-base font-semibold border-2 border-background">
              Получить расчёт
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] w-[95vw]">
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">Оставить заявку</DialogTitle>
              <DialogDescription>
                Заполните форму, и мы свяжемся с вами.
              </DialogDescription>
            </DialogHeader>
            <LeadForm />
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
