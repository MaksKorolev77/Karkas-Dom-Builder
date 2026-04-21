import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, Menu, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog";
import { LeadForm } from "@/components/LeadForm";

type NavLink = { name: string; href: string; sectionId?: string };

const navLinks: NavLink[] = [
  { name: "Проекты", href: "/projects" },
  { name: "Комплектации", href: "/#packages", sectionId: "packages" },
  { name: "О нас", href: "/#about", sectionId: "about" },
  { name: "Контакты", href: "/#contact", sectionId: "contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location, setLocation] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSectionClick = (e: React.MouseEvent, link: NavLink) => {
    if (!link.sectionId) return;
    setIsMobileMenuOpen(false);
    if (location === "/") {
      e.preventDefault();
      const el = document.getElementById(link.sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      e.preventDefault();
      setLocation("/");
      setTimeout(() => {
        const el = document.getElementById(link.sectionId!);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          isScrolled || location !== "/"
            ? "bg-background/95 backdrop-blur-md border-border shadow-sm py-3"
            : "bg-background/80 backdrop-blur-sm border-transparent py-5"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-2 cursor-pointer">
                <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-xl rounded-sm">
                  УК
                </div>
                <span className="font-serif font-bold text-xl tracking-tight hidden sm:block text-foreground">
                  УльтраКаркас
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) =>
                link.sectionId ? (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSectionClick(e, link)}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            <div className="hidden md:flex items-center gap-6">
              <a
                href="tel:+74993909789"
                className="flex items-center gap-2 font-medium text-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-4 h-4 text-primary" />
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

            <div className="lg:hidden flex items-center gap-1">
              <a
                href="tel:+74993909789"
                aria-label="Позвонить"
                className="p-2.5 rounded-full bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 transition-colors"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                className="p-2 text-foreground"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Меню"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background pt-24 px-6 pb-6 flex flex-col lg:hidden animate-in slide-in-from-top-4">
          <nav className="flex flex-col gap-6 text-center text-lg">
            {navLinks.map((link) =>
              link.sectionId ? (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSectionClick(e, link)}
                  className="font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-medium text-foreground hover:text-primary transition-colors py-2"
                >
                  {link.name}
                </Link>
              )
            )}
          </nav>

          <div className="mt-auto space-y-6 pt-6 border-t border-border">
            <a
              href="tel:+74993909789"
              className="flex items-center justify-center gap-2 font-medium text-xl text-foreground hover:text-primary transition-colors"
            >
              <Phone className="w-5 h-5 text-primary" />
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

    </>
  );
}
