import { motion } from "framer-motion";
import { LeadForm } from "@/components/LeadForm";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.533 5.858L0 24l6.335-1.612A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 0 1-5.006-1.366l-.36-.214-3.735.981.998-3.645-.235-.374A9.818 9.818 0 1 1 12 21.818z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.833.941z"/>
  </svg>
);

type ContactItem = {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  href?: string;
};

const contacts: ContactItem[] = [
  {
    label: "Телефон",
    value: "+7 (499) 390-97-89",
    sub: "Звонок бесплатный",
    icon: <Phone className="w-5 h-5" />,
    href: "tel:+74993909789",
  },
  {
    label: "Email",
    value: "info@ultrakarkas.ru",
    sub: "Написать письмо",
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:info@ultrakarkas.ru",
  },
  {
    label: "WhatsApp",
    value: "+7 (926) 993-58-18",
    sub: "Написать в WhatsApp",
    icon: <WhatsAppIcon />,
    href: "https://wa.me/79269935818",
  },
  {
    label: "Telegram",
    value: "+7 (926) 993-58-18",
    sub: "Написать в Telegram",
    icon: <TelegramIcon />,
    href: "https://t.me/+79269935818",
  },
  {
    label: "Офис продаж",
    value: "г. Одинцово, р.п. Заречье",
    sub: "ул. Торговая, 2С · Построить маршрут →",
    icon: <MapPin className="w-5 h-5" />,
    href: "https://yandex.ru/maps/-/CPCOQC3w",
  },
  {
    label: "Режим работы",
    value: "Ежедневно: 10:00 – 18:00",
    sub: "Без выходных",
    icon: <Clock className="w-5 h-5" />,
  },
];

function ContactRow({ item, index }: { item: ContactItem; index: number }) {
  const inner = (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`flex items-start gap-4 py-4 border-b border-border last:border-0 group ${item.href ? "cursor-pointer" : ""}`}
    >
      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-200">
        {item.icon}
      </div>
      <div className="min-w-0">
        <div className="text-[11px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">
          {item.label}
        </div>
        <div className="font-semibold text-foreground text-[0.95rem] leading-snug">
          {item.value}
        </div>
        <div className={`text-sm mt-0.5 ${item.href ? "text-primary group-hover:underline" : "text-muted-foreground"}`}>
          {item.sub}
        </div>
      </div>
    </motion.div>
  );

  if (item.href) {
    const isExternal = item.href.startsWith("http");
    return (
      <a
        href={item.href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="block"
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export function Contact() {
  return (
    <section id="contacts" className="py-16 md:py-24 bg-muted/50">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-6 h-[2px] bg-primary rounded-full"/>
            <span className="text-xs font-bold tracking-widest uppercase text-primary">Контакты</span>
          </div>
          <h2 className="font-serif font-bold text-3xl md:text-4xl text-foreground mb-2">
            Свяжитесь с нами
          </h2>
          <p className="text-muted-foreground text-base max-w-md">
            Ответим быстро любым удобным способом.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left — contact list */}
          <div className="divide-y divide-border rounded-2xl bg-background border border-border overflow-hidden px-6 py-2">
            {contacts.map((item, i) => (
              <ContactRow key={item.label} item={item} index={i} />
            ))}
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="rounded-2xl bg-background border border-border p-6 md:p-8"
          >
            <h3 className="font-serif font-bold text-xl md:text-2xl mb-1">
              Получить расчёт стоимости
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              Бесплатно и без обязательств — инженер свяжется с вами.
            </p>
            <LeadForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
