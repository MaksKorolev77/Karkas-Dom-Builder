import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer id="contact" className="bg-background pt-20 pb-10 border-t border-border">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-primary text-primary-foreground flex items-center justify-center font-serif font-bold text-xl rounded-sm">
                УК
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-foreground">
                УльтраКаркас
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Строительство надежных и энергоэффективных каркасных домов в Москве и Московской области.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-foreground mb-6 text-lg">Навигация</h4>
            <ul className="space-y-4">
              <li><Link href="/projects" className="text-muted-foreground hover:text-primary transition-colors">Проекты домов</Link></li>
              <li><a href="/#packages" className="text-muted-foreground hover:text-primary transition-colors">Комплектации и цены</a></li>
              <li><a href="/#calculator" className="text-muted-foreground hover:text-primary transition-colors">Калькулятор стоимости</a></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Политика конфиденциальности</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2">
            <h4 className="font-bold text-foreground mb-6 text-lg">Контакты</h4>
            <div className="grid sm:grid-cols-2 gap-6">
              <a href="tel:+74993909789" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 shrink-0">
                  <Phone className="w-5 h-5 text-foreground group-hover:text-primary" />
                </div>
                <div>
                  <div className="font-medium text-foreground text-lg mb-1">+7 (499) 390-97-89</div>
                  <div className="text-sm">Звонок бесплатный</div>
                </div>
              </a>
              
              <a href="mailto:info@ultrakarkas.ru" className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 shrink-0">
                  <Mail className="w-5 h-5 text-foreground group-hover:text-primary" />
                </div>
                <div className="pt-2">
                  <div className="font-medium text-foreground text-base">info@ultrakarkas.ru</div>
                </div>
              </a>

              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-foreground" />
                </div>
                <div className="pt-1">
                  <div className="text-foreground font-medium mb-1">Офис продаж:</div>
                  <div className="text-sm leading-relaxed">Московская обл., г. Одинцово,<br/>р.п. Заречье, ул. Торговая, 2С</div>
                </div>
              </div>

              <div className="flex items-start gap-3 text-muted-foreground">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-foreground" />
                </div>
                <div className="pt-1">
                  <div className="text-foreground font-medium mb-1">Режим работы:</div>
                  <div className="text-sm">Ежедневно: 10:00 – 18:00</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-sm text-center md:text-left">
            © {new Date().getFullYear()} ООО «УльтраКаркас». Все права защищены. <br className="md:hidden"/>Не является публичной офертой.
          </div>
          <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary underline underline-offset-4">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
